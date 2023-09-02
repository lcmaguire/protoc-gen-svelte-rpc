import { DescMessage } from "@bufbuild/protobuf";


export function protoPathToCssPath(input: string) {
    return input.replace(".", "-")
}

export function protoCamelCase(snakeCase: string): string {
    let capNext = false;
    let a = ""
    for (let i = 0; i < snakeCase.length; i++) {
        let c = snakeCase.charAt(i);
        switch (c) {
            case "_":
                capNext = true;
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                a = a + c
                capNext = false;
                break;
            default:
                if (capNext) {
                    capNext = false;
                    c = c.toUpperCase();
                }
                a = a + c
                break;
        }
    }
    return a;
}

export function formatMethodName(input: string) {
    let firstChar = input.charAt(0).toLocaleLowerCase()
    let out = firstChar + input.substring(1)
    return out
}

export function getMessageImportPath(message: DescMessage) {
    if (message.parent == undefined) {
        return `import {${message.name}} from "$lib/gen/${message.file.name}_pb"`
    }
    return `import {${message.parent.name}_${message.name}} from "$lib/gen/${message.file.name}_pb"`
}

export function gatherImportMessages(message: DescMessage, viewSuffix :string) {
    let imports = []
    for (let i = 0; i < message.fields.length; i++) {
        let curr = message.fields[i]
        if (curr.message != undefined) {
            let a = `import ${curr.message.name}${viewSuffix} from '$lib/${curr.message.typeName.replace(".", "/")}${viewSuffix}.svelte'`
            imports.push(a)
        }
    }
    return imports
}

export function getMessageName(message: DescMessage){
    if (message.parent == undefined) {
       return message.name
    }
    return `${message.parent.name}_${message.name}`
}