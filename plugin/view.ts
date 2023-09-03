import { DescField, DescMessage, ScalarType } from "@bufbuild/protobuf"
import { formatMethodName, gatherImportMessages, getMessageImportPath, getMessageName, protoCamelCase, protoPathToCssPath } from "./helpers"
import { Schema } from "@bufbuild/protoplugin"
import { genMessage, genMessageJScomment } from "./protoc-gen-svelte-rpc"


export function generateView(schema: Schema, message: DescMessage) {
    let nf = schema.generateFile(`lib/${message.typeName.replace(".", "/")}View.svelte`)


    let imports = gatherImportMessages(message, "View")

    // generate a view for all nested messages.
    for (let m in message.nestedMessages) {
        generateView(schema, message.nestedMessages[m])
    }


    nf.print("<script> // @ts-nocheck")
    nf.print(genMessageJScomment)

    let messageImport = getMessageImportPath(message)
    nf.print(messageImport)

    // print imports
    for (let i in imports) {
        nf.print(imports[i])
    }

    let messageName = getMessageName(message)

    let varName = "message"
    nf.print(`export let ${varName};`) // todo have this be type asserted
    nf.print(`if (${varName} == null ) {
      ${varName} = new ${messageName} ()
  }`)


    nf.print("</script>")
    nf.print(genMessage)

    // todo support oneofs
    for (let i = 0; i < message.fields.length; i++) {
        let currentField = message.fields[i]
        let fieldName = `${varName}.${protoCamelCase(currentField.name)}` // todo convert to snakeCase

        let prefix = ""
        let suffix = ""

        if (currentField.oneof) {
            let oneOfMessage = formatMethodName(messageName)
            prefix = `{#if message.${protoCamelCase(currentField.oneof.name)}.case == "${protoCamelCase(currentField.name)}"}`
            fieldName = `message.${protoCamelCase(currentField.oneof.name)}.value`
            suffix = "{/if}"
        }

        // todo conver below to func that returns string.
        switch (currentField.fieldKind) {
            case "scalar":
                nf.print(prefix)
                nf.print(`${getScalarView(currentField, fieldName)}`)
                nf.print(suffix)
                break
            case "enum":
                nf.print(prefix)
                nf.print(`${getEnumView(currentField, fieldName)}`)
                nf.print(suffix)
                break;
            case "message":
                nf.print(prefix)
                nf.print(`${getMessageView(currentField.message, currentField, fieldName)}`)
                nf.print(suffix)
                break;
        }
    }
}

function getScalarView(currentField: DescField, currentName: string) {
    let cssClass = protoPathToCssPath(currentName)
    if (currentField.repeated) {
        return `
        {#each ${currentName} as item }
            ${scalarSwitch(currentField, cssClass, currentName, "item")}
        {/each}
        `
    }

    return scalarSwitch(currentField, cssClass, currentName, currentName)
}

function scalarSwitch(currentField: DescField, cssClass: string, label: string, currentName: string) {
    switch (currentField.scalar) {
        case ScalarType.STRING:
            return `<p class="${cssClass}"> ${label} : {${currentName}} </p>\n`
        case ScalarType.BOOL:
            return `<p class="${cssClass}"> ${label} : {${currentName}}  </p>\n`
        case ScalarType.INT32: case ScalarType.INT64: case ScalarType.UINT32: case ScalarType.UINT64: ScalarType.FIXED32;
        case ScalarType.FIXED64: case ScalarType.SFIXED32: case ScalarType.SFIXED64: case ScalarType.DOUBLE: case ScalarType.FLOAT:
            return `<p class="${cssClass}"> ${label} : {${currentName}} </p>\n`
        default:
            return ""
    }
}

function getEnumView(currentField: DescField, currentName: string) {
    return `<p class="${protoPathToCssPath(currentName)}"> ${currentName} : {${currentName}} </p>\n`
}

function getMessageView(message: DescMessage, currentField: DescField, currentName: string) {
    if (currentField.repeated) {
        return `{#each ${currentName} as item}
         <${message.name}View message={item} />
         {/each}`
    }
    return `<${message.name}View message={${currentName}} />\n`
}