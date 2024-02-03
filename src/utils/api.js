import axios from "axios"

export const BASE_URL = "https://xyus-pdsw-div3.n7c.xano.io/api:r7LDbmE5"

export default async function getApps(page, per_page, offset, search) {
    try {
        const res = await axios.get(BASE_URL + `/apps?page=${page}&per_page=${per_page}&search_query=${search ? search : ''}`)
        return res.data

    } catch (e) {
        console.log(e)
    }

}