
const jsonMime    = 'application/json'

const authorization = async (getAccessToken: () => Promise<string>) =>
    'Bearer ' + await getAccessToken()

const getHeaders = (mime: string) => ({
    'Accept': mime
})

const postHeaders = (mime: string) => ({
    'Accept'      : mime,
    'Content-Type': mime
})

const getAuthHeaders = async (
    getAccessToken: () => Promise<string>,
    mime          : string
) => ({
    'Authorization': await authorization(getAccessToken),
    'Accept'       : mime
})

const postAuthHeaders = async (
    getAccessToken: () => Promise<string>,
    mime          : string
) => ({
    'Authorization': await authorization(getAccessToken),
    'Accept'       : mime,
    'Content-Type' : mime
})

const getJsonHeaders  = (): HeadersInit => getHeaders (jsonMime)
const postJsonHeaders = (): HeadersInit => postHeaders(jsonMime)
const getAuthJsonHeaders  = async (getAccessToken: () => Promise<string>): Promise<HeadersInit> => getAuthHeaders (getAccessToken, jsonMime)
const postAuthJsonHeaders = async (getAccessToken: () => Promise<string>): Promise<HeadersInit> => postAuthHeaders(getAccessToken, jsonMime)

export const getJson = (
    input: RequestInfo
): Promise<unknown> =>
    fetch(input, {
        method : 'GET',
        headers: getJsonHeaders()
    })
    .then(res => res.json())

export const postJson = (
    input: RequestInfo,
    body : unknown
): Promise<unknown> =>
    fetch(input, {
        method : 'POST',
        headers: postJsonHeaders(),
        body   : JSON.stringify(body)
    })
    .then(res => res.json())

export const getAuthJson = async (
    input         : RequestInfo,
    getAccessToken: () => Promise<string>
): Promise<unknown> =>
    fetch(input, {
        method : 'GET',
        headers: await getAuthJsonHeaders(getAccessToken)
    })
    .then(res => res.json())

export const postAuthJson = async (
    input         : RequestInfo,
    getAccessToken: () => Promise<string>,
    body          : unknown
): Promise<unknown> =>
    fetch(input, {
        method : 'POST',
        headers: await postAuthJsonHeaders(getAccessToken),
        body   : JSON.stringify(body)
    })
    .then(res => res.json())
