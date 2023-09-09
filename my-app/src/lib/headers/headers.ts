
export function httpHeaders(requestHeaders: any) {
    const h = new Headers();
    for (let i in requestHeaders) {
        h.set(requestHeaders[i].key, requestHeaders[i].value);
    }
    return h
}