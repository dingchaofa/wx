import { getWechat } from '../wechat'

const client = getWechat()

export async function  getSignatureAsync(url) {
    const data = await client.fetchToken('token')
    const token = data.access_token
    const ticketData = await client.fetchToken()
    const ticket = ticketData.ticket

    let params = client.sign(ticket,url)

    params.appId = client.appID

    return params
}