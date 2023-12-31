import { DescField, DescMessage, DescOneof, ScalarType } from "@bufbuild/protobuf"
import { formatMethodName, gatherImportMessages, getMessageImportPath, getMessageName, protoCamelCase, protoPathToCssPath } from "./helpers"
import { Schema } from "@bufbuild/protoplugin"
import { genMessage, genMessageJScomment } from "./protoc-gen-svelte-rpc"

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
    nf.print(genMessageJScomment)
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

    // print generated functions for arrays.
    for (let i in arrayFunctions) {
        nf.print(arrayFunctions[i])
    }

    // generate functions for binding oneofs.
    for (let o in message.oneofs) {
        // get any required oneof imports
        for (let i in message.oneofs[o].fields) {
            let curr = message.oneofs[o].fields[i]
            if (curr.message != undefined) {
                let oneofMessage = curr.message
                let messageImport = getMessageImportPath(oneofMessage)
                nf.print(messageImport)
            }
        }
        nf.print(generateOneofHandlers(message.oneofs[o]))
    }
    nf.print("</script>")
    nf.print(genMessage)
    

    // generate all fields for view.
    for (let i = 0; i < message.fields.length; i++) {
        let currentField = message.fields[i]
        let fieldName = `${varName}.${protoCamelCase(currentField.name)}` 

        let prefix = ""
        let suffix = ""
        if (currentField.oneof) {
            let rad = generateOneOfFieldRadio(currentField)
            nf.print(rad)

            fieldName = `message.${protoCamelCase(currentField.oneof.name)}.value`
            prefix = `{#if ${currentField.oneof.name}view == "${protoCamelCase(currentField.name)}"}`
            suffix = "{/if}"
        }
        nf.print(prefix)
        nf.print(inputFieldKind(currentField, fieldName))
        nf.print(suffix)
    }
}

function inputFieldKind(currentField: DescField, fieldName: string) {
    switch (currentField.fieldKind) {
        case "scalar":
            return `${inputScalarView(currentField, fieldName)}`
        case "enum":
            return `${inputEnumView(currentField, fieldName)}`
        case "message":
            if (currentField.repeated) {
                return `
                <br>
                <label for="${protoPathToCssPath(fieldName)}"> ${fieldName} </label> <br>\n
                {#each ${protoCamelCase(fieldName)} as item, key} 
                    ${inputMessageView(currentField.message, "item")}
                    <button on:click={() => remove${protoCamelCase(currentField.name)}Array(key)}> Remove from ${fieldName}</button><br>
                {/each}
                <button on:click={push${protoCamelCase(currentField.name)}Array}> Add new ${fieldName}</button><br>
                `
            }
            return `${inputMessageView(currentField.message, fieldName)}`
    }
    return ""
}

function inputScalarView(currentField: DescField, currentName: string) {
    let cssClass = protoPathToCssPath(currentName)
    if (currentField.repeated) { // todo have repeated be handled for all field kinds in one func.
        return `
        <br>
        <label for="${cssClass}"> ${currentName} </label> <br>\n
        {#each ${currentName} as item, key} 
            ${scalarSwitch(currentField, cssClass, "item")}
            <button on:click={() => remove${protoCamelCase(currentField.name)}Array(key)}> Remove from ${currentName}</button> <br>
        {/each}
        <button on:click={push${protoCamelCase(currentField.name)}Array}> Add new ${currentName}</button> <br>`
    }

    let res = `<label for="${cssClass}"> ${currentName} </label> <br>\n` + scalarSwitch(currentField, cssClass, currentName)
    return res
}

function scalarSwitch(currentField: DescField, cssClass: string, currentName: string,) {
    switch (currentField.scalar) {
        case ScalarType.STRING:
            return `<input class="${cssClass}" bind:value={${currentName}} >\n<br>`
        case ScalarType.BOOL:
            return `<input class="${cssClass}" type=checkbox  bind:checked={${currentName}} >\n<br>`;
        case ScalarType.INT32: case ScalarType.INT64: case ScalarType.UINT32: case ScalarType.UINT64:
            return `<input class="${cssClass}" type=number bind:value={${currentName}} min=0 step="1" >\n<br>`
        case ScalarType.FIXED32: case ScalarType.FIXED64: case ScalarType.SFIXED32: case ScalarType.SFIXED64: case ScalarType.DOUBLE: case ScalarType.FLOAT:
            return `<input class="${cssClass}" type=number bind:value={${currentName}} min=0 >\n <br>`
        default:
            return `<!-- ${currentField.scalar}  ${currentName} -->`
    }
}

// todo support repeated enums.
function inputEnumView(currentField: DescField, currentName: string) {
    let cssClass = protoPathToCssPath(currentName)
    let res = `<label for="${cssClass}-select"> ${currentName} </label> <br>\n`

    res += `<select class="${cssClass}-select" bind:value={${currentName}} >\n`
    for (let i = 0; i < currentField.enum!.values.length; i++) {
        res += `<option value="${currentField.enum!.values[i].name}">${currentField.enum!.values[i].name}</option>\n`
    }
    res += `</select><br>\n`
    return res
}

function inputMessageView(message: DescMessage, currentName: string) {
    return `<${message.name}Edit bind:message={${currentName}}  />\n`
}

// disgusting funcs that are used to add / remove from an array and make it reactivley render in UI.
function generateArrayFunctions(fieldName: string, messageName: string) {
    fieldName = protoCamelCase(fieldName)
    let a = `function push${fieldName}Array() {${messageName}.${fieldName} = ${messageName}.${fieldName}.concat(undefined)}\n`
    let b = `function remove${fieldName}Array(index) {${messageName}.${fieldName}.splice(index, 1); ${messageName}.${fieldName} = ${messageName}.${fieldName}}\n`
    return a + b
}

function gatherArrayFunctions(message: DescMessage) {
    let imports = []
    for (let i = 0; i < message.fields.length; i++) {
        let curr = message.fields[i]
        if (curr.repeated) {
            let a = generateArrayFunctions(curr.name, "message")
            imports.push(a)
        }
    }
    return imports
}

// generateOneofHandlers will generate a function for controls used by oneof options and a listener on the selected radio value used to control views. 
function generateOneofHandlers(desc: DescOneof) {
    let oneOfVarName = protoCamelCase(desc.name) // this is the format the generated class uses format snakeCase

    // TODO see if it is possible to use for loops withing templates as is the case in golang templates. 
    let res = `

    // any messages within oneof need to be initialized.
    function setup${desc.name}Oneof() {`


    let potentialAddition = `
    // message = new ${desc.parent.name}();
    switch (${desc.name}view) {
        `

    let nestedMessageCount = 0;
    for (let f in desc.fields) {
        let currField = desc.fields[f]
        let fieldName = protoCamelCase(currField.name)
        if (currField.message != undefined) {
            nestedMessageCount++
            potentialAddition += `case "${fieldName}":
            message.${oneOfVarName}.value = new ${getMessageName(currField.message)}();
            break;
        default:`
        }

    }

    if (nestedMessageCount > 0) {
        res += potentialAddition + "}"
    } else {
        res += `message.${oneOfVarName}.value = undefined`
    }

    res += `
    message.${oneOfVarName}.case = ${desc.name}view;          
    }
    let ${desc.name}view;
    $: ${desc.name}view, setup${desc.name}Oneof();
    `
    return res
}

function generateOneOfFieldRadio(fieldDesc: DescField) {
    let fieldName = protoCamelCase(fieldDesc.name)
    return `<label>

    use ${fieldName} for ${fieldDesc.parent.name} oneof ?
    <input type="radio" bind:group={${fieldDesc.oneof?.name}view} value={"${fieldName}"} /> <br>
    
    </label> `
}