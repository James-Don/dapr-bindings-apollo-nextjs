const axios = require('axios')

async function get1stUser() {
    const gqlServiceUrl = 'http://127.0.0.1:3500'
    const conf = { headers: {'dapr-app-id': 'apollogql', 'Content-Type': 'application/json'}}
    const query = `query {
        user(id: 1) {
          username
          }
        }`
    let gqlData = await axios.post(gqlServiceUrl, {query: query}, conf).then(r => r.data.data.user).catch(e => {
        console.error('Calling QGL service failed.')
        console.error(e.toString())
    })
    return gqlData
}

test("Returns first user from free JSON data source",async () => {
    let user = await get1stUser()
    expect(user).not.toBeNull()
    console.debug('user fetched: ')
    console.debug(user)
    expect(user.username).toBe('Bret')
})