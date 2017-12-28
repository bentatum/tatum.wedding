const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const path = require('path')

app.prepare()
.then(() => {
  const server = express()

  server.use('/static', express.static(path.join(__dirname, '/static')))

  server.get('/', (req, res) => res.redirect('/images'))
  server.get('*', (req, res) => handle(req, res))

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
