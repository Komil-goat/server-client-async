// import axios, {AxiosResponse} from "axios"

declare const axios: any;

//wrapper for sending URL
function resolveUrl(resource: string): string {
    const baseUrl = "http://localhost:4001/"
    return `${baseUrl}${resource}`
}

// to send a GET request to the remote server
export async function remoteGet(resource: string): Promise<any[]> {
    const res = await axios.get(resolveUrl(resource))
    return res.data
}
// to send a POST request to the remote server
export async function remotePost(resource: string, data?: any): Promise<any> {
    const res = await axios.post(resolveUrl(resource), data)
    return res.data
}
// to send a DELETE request to the remote server
export async function remoteDelete(resource: string): Promise<any> {
    const res = await axios.delete(resolveUrl(resource))
    return res.data
}