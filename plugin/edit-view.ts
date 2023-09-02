import { DescField, DescMessage, DescOneof, ScalarType } from "@bufbuild/protobuf"
import { gatherImportMessages, getMessageImportPath, getMessageName, protoCamelCase, protoPathToCssPath } from "./helpers"
import { Schema } from "@bufbuild/protoplugin"

export function editView(schema: Schema, message: DescMessage) {
    let nf = schema.generateFile(`lib/${message.typeName.replace(".", "/")}Edit.svelte`)

    // gather imports
    let imports = gatherImportMessages(message, "Edit")

    // generate all nested messages
    for (let n in message.nestedMessages) {
        editView(schema, message.nestedMessages[n])
    }

    // gather functions used for manipulating arrays.
    let arrayFunctions = gatherArrayFunctions(message)

    nf.print("<script> // @ts-nocheck")
    let messageName = getMessageName(message)

    // print imports
    for (let i in imports) {
        nf.print(imports[i])
    }

    let messageImport = getMessageImportPath(message)
    nf.print(messageImport)

    let varName = "message"
    nf.print(`export let ${varName};`)
    nf.print(`if (${varName} == null ) {
    ${varName} = new ${messageName} ()
}`)

    // print imports
    for (let i in arrayFunctions) {
        nf.print(arrayFunctions[i])
    }

    // generate functions for binding oneofs.
    for (let o in message.oneofs) {
        nf.print(generateOneofHandlers(message.oneofs[o]))
    }

    nf.print("</script>")

    // generate all fields for view.
    for (let i = 0; i < message.fields.length; i++) {
        let currentField = message.fields[i]
        let fieldName = `${varName}.${protoCamelCase(currentField.name)}` // todo convert to snakeCase

        // additional html attributes to add into html. Currently used for oneof binding.
        let additionalAtrributes = ""
        if (currentField.oneof) {
            additionalAtrributes = ` on:input={() => handle${messageName}Oneof("${protoCamelCase(currentField.name)}")} `
        }

        switch (currentField.fieldKind) {
            case "scalar":
                nf.print(`${editScalarView(currentField, fieldName, additionalAtrributes)}`)
                break
            case "enum":
                nf.print(`${editEnumView(currentField, fieldName, additionalAtrributes)}`)
                break;
            case "message":
                nf.print(`${editMessageView(currentField.message, fieldName, additionalAtrributes)}`)
                break;
        }
    }
}

function editScalarView(currentField: DescField, currentName: string, additionalAtrributes: string) {
    let cssClass = protoPathToCssPath(currentName)
    if (currentField.repeated) {
        return `
        <label for="${cssClass}"> ${currentName} </label>\n
        {#each ${currentName} as item, key} 
            ${scalarSwitch(currentField, cssClass, "item", additionalAtrributes)}
            <button on:click={() => remove${currentField.name}Array(key)}> Remove from ${currentName}</button>
        {/each}
        <button on:click={push${currentField.name}Array}> Add to ${currentName}</button>
        `
    }

    return scalarSwitch(currentField, cssClass, currentName, additionalAtrributes)
}

function scalarSwitch(currentField: DescField, cssClass: string, currentName: string, additionalAttributes: string) {
    switch (currentField.scalar) {
        case ScalarType.STRING:
            return `<input class="${cssClass}" bind:value={${currentName}} ${additionalAttributes}>\n`
        case ScalarType.BOOL:
            return `<input class="${cssClass}" type=checkbox  bind:checked={${currentName}} ${additionalAttributes}>\n`;
        case ScalarType.INT32: case ScalarType.INT64: case ScalarType.UINT32: case ScalarType.UINT64:
            return `<input class="${cssClass}" type=number bind:value={${currentName}} min=0 step="1" >\n`
        case ScalarType.FIXED32: case ScalarType.FIXED64: case ScalarType.SFIXED32: case ScalarType.SFIXED64: case ScalarType.DOUBLE: case ScalarType.FLOAT:
            return `<input class="${cssClass}" type=number bind:value={${currentName}} min=0 >\n`
        default:
            return `<!-- ${currentField.scalar}  ${currentName} -->`
    }
}

function editEnumView(currentField: DescField, currentName: string, additionalAtrributes: string) {
    let res = `<select bind:value={${currentName}} ${additionalAtrributes}>\n`
    for (let i = 0; i < currentField.enum!.values.length; i++) {
        res += `<option value="${currentField.enum!.values[i].name}">${currentField.enum!.values[i].name}</option>\n`
    }
    res += `</select><br>\n`
    return res
}

function editMessageView(message: DescMessage, currentName: string, additionalAtrributes: string) {
    return `<${message.name}Edit bind:message={${currentName}} ${additionalAtrributes} />\n`
}

// disgusting funcs that are used to add / remove from an array and make it reactivley render in UI.
function generateArrayFunctions(fieldName: string, messageName: string, defaultType: string) {
    let a = `function push${fieldName}Array() {if (${messageName}.${fieldName} == undefined) {${messageName}.${fieldName} = []};${messageName}.${fieldName} = ${messageName}.${fieldName}.concat(${defaultType})}\n`
    let b = `function remove${fieldName}Array(index) {${messageName}.${fieldName}.splice(index, 1); ${messageName}.${fieldName} = ${messageName}.${fieldName}}\n`
    return a + b
}

function defaultRepeatedValue(currentField: DescField) {
    if (currentField.message != null) {
        return "{}"
    }

    switch (currentField.scalar) {
        case ScalarType.STRING:
            return `""`
        case ScalarType.BOOL:
            return "false"
        case ScalarType.INT32 || ScalarType.INT64 || ScalarType.UINT32 || ScalarType.UINT64:
            return "0"
    }
    return ""
}

function gatherArrayFunctions(message: DescMessage) {
    let imports = []
    for (let i = 0; i < message.fields.length; i++) {
        let curr = message.fields[i]
        if (curr.repeated) {
            let a = generateArrayFunctions(curr.name, "message", defaultRepeatedValue(curr))
            imports.push(a)
        }
    }
    return imports
}

function generateOneofHandlers(desc: DescOneof) {
    let handleFuncName = desc.parent.name // this is the value which the field implementing it gets. format CapitalizedSnakeCase: 
    let oneOfVarName = protoCamelCase(desc.name) // this is the format the generated class uses format snakeCase

    // TODO see if it is possible to use for loops withing templates as is the case in golang templates. 
    let res = `
    function handle${handleFuncName}Oneof(input) {
        message.${oneOfVarName}.case = input
        switch (input) {\n`

    for (let f in desc.fields) {
        let currField = desc.fields[f]
        let fieldName = protoCamelCase(currField.name)
        res += `case "${fieldName}":
        message.${oneOfVarName}.value = message.${fieldName};
        break;
        `
    }
    res += `    }
    }`
    return res
}