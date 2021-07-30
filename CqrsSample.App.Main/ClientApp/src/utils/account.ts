import axios, { AxiosInstance } from 'axios'

export const customAxios = async (
    getAccessToken: () => Promise<string>
): Promise<AxiosInstance> => axios.create({
    headers: { 'Authorization': 'Bearer ' + await getAccessToken() }
})
