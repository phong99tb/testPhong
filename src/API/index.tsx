import axios from "axios"

export const getTrending = async (bodyJson:any) => {
    try {
        const info = await axios.post(`https://www.youtube.com/feed/trending`,bodyJson,{
            headers: {
                'content-type': 'application/json'
            }
        })
        return info.data
    } catch (err) {
        throw err
    }
}