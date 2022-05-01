import axios from 'axios'

const gqlApiPath = 'api/gql'
const config = {
    headers: {
        'Content-Length': 0,
        'Content-Type': 'text/plain'
    }
}

export default async function getGqlData (gqlQery) {
    console.debug('-------gqlReq-------')
    console.debug(gqlQery)
    return axios.post(gqlApiPath, gqlQery, config).then(r => r.data && r.data.data).catch(e => console.error(e))
}
