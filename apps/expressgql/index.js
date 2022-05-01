const express = require('express');
const app = express();
const axios = require('axios')
const cors = require('cors')
app.use(cors())
const port = 3001; // for Dapr run
// const port = 3002; // for standalone run
const daprGqlBindingUrl = 'http://localhost:3500/v1.0/bindings/graphqlbinding'

app.get('/test',  function (req, res) {
  res.send('hello world')
});

app.post('/gql', express.json({ limit: '100mb' }), async (req, res) => {
  let reqData = req.body
  console.log('--------Gql Request-----')
  console.log(reqData)
  // Dapr GraphQL binding accept different request format, so is this converting.
  // For now we just care query.
  let daprGqlReq = {
    operation: 'query',
    metadata: reqData
  }
  console.log(daprGqlReq)
  let gqlBindingRes = await axios.post(daprGqlBindingUrl, daprGqlReq).catch(e => {
    console.error('Error  calling Dapr GQL binding', e.toString())
    res.status(500).send('Error calling Dapr GQL binding')
    return
  })
  let gqlData = gqlBindingRes && gqlBindingRes.data
  console.log(gqlData)
  res.send(gqlData)
});

app.listen(port, () => console.log(`GraphQL service listening on port ${port}!`))