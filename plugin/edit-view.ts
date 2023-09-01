import { DescField, DescMessage, ScalarType } from "@bufbuild/protobuf"
import { gatherImportMessages, getMessageImportPath, protoCamelCase, protoPathToCssPath } from "./helpers"
import { Schema } from "@bufbuild/protoplugin"

export function editView(schema: Schema, message: DescMessage) {
    let nf = schema.generateFile(`lib/${message.typeName.replace(".", "/")}Edit.svelte`)


    // todo make this reusable.
    // gather imports
    let imports = gatherImportMessages(message, "Edit")

    // gather functions used for manipulating arrays.
    let arrayFunctions = gatherArrayFunctions(message)

    nf.print("<script> // @ts-nocheck")

    // print imports
    for (let i in imports) {
        nf.print(imports[i])
    }

    let messageImport = getMessageImportPath(message)
    nf.print(messageImport)

    let varName = "message"
    nf.print(`export let ${varName};`) // todo have this be type asserted
    nf.print(`if (${varName} == null ) {
    ${varName} = new ${message.name} ()
}`)

    // print imports
    for (let i in arrayFunctions) {
        nf.print(arrayFunctions[i])
    }

    nf.print("</script>")

    // generate all fields for view.
    for (let i = 0; i < message.fields.length; i++) {
        let currentField = message.fields[i]
        let fieldName = `${varName}.${protoCamelCase(currentField.name)}` // todo convert to snakeCase

        switch (currentField.fieldKind) {
            case "scalar":
                nf.print(`${editScalarView(currentField, fieldName)}`)
                break
            case "enum":
                nf.print(`${editEnumView(currentField, fieldName)}`)
                break;
            case "message":
                nf.print(`${editMessageView(currentField.message, fieldName)}`)
                break;
        }
    }
}

function editScalarView(currentField: DescField, currentName: string) {
    let cssClass = protoPathToCssPath(currentName)
    if (currentField.repeated) {
        return `
        <label for="${cssClass}"> ${currentName} </label>\n
        {#each ${currentName} as item, key} 
            ${scalarSwitch(currentField, cssClass, "item")}
            <button on:click={() => remove${currentField.name}Array(key)}> Remove from ${currentName}</button>
        {/each}
        <button on:click={push${currentField.name}Array}> Add to ${currentName}</button>
        `
    }

    return scalarSwitch(currentField, cssClass, currentName)
}

function scalarSwitch(currentField: DescField, cssClass: string, currentName: string) {
    switch (currentField.scalar) {
        case ScalarType.STRING:
            return `<input class="${cssClass}" bind:value={${currentName}} >\n`
        case ScalarType.BOOL:
            return `<input class="${cssClass}" type=checkbox  bind:checked={${currentName}}>\n`;
        case ScalarType.INT32: case ScalarType.INT64: case ScalarType.UINT32: case ScalarType.UINT64:
            return `<input class="${cssClass}" type=number bind:value={${currentName}} min=0 step="1" >\n`
        case ScalarType.FIXED32: case ScalarType.FIXED64: case ScalarType.SFIXED32: case ScalarType.SFIXED64: case ScalarType.DOUBLE: case ScalarType.FLOAT:
            return `<input class="${cssClass}" type=number bind:value={${currentName}} min=0 >\n`
        default:
            return `<!-- ${currentField.scalar}  ${currentName} -->`
    }
}

function editEnumView(currentField: DescField, currentName: string) {
    let res = `<select bind:value={${currentName}}>\n`
    for (let i = 0; i < currentField.enum!.values.length; i++) {
        res += `<option value="${currentField.enum!.values[i].name}">${currentField.enum!.values[i].name}</option>\n`
    }
    res += `</select><br>\n`
    return res
}

function editMessageView(message: DescMessage, currentName: string) {
    return `<${message.name}Edit bind:message={${currentName}} />\n`
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