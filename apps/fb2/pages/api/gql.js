
import axios from 'axios'

const gqlServiceUrl = 'http://127.0.0.1:3500'

const conf = { headers: {'dapr-app-id': 'apollogql', 'Content-Type': 'application/json'}}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let query = req.body
    console.debug('Calling QGL service with query: ', query)
    let gqlData = await axios.post(gqlServiceUrl, {query: query}, conf).then(r => r.data).catch(e => {
      console.error('Calling QGL service failed.')
      console.error(e.toString())
    })
    res.status(200).json(gqlData)
  } else {
    res.status(500).json({ error: 'Method not supported'})
  }
}
