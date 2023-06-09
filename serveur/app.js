const express = require('express')
const routeCat=require('./routes/categorie')
const routePro=require('./routes/produit')
const routeCommande=require('./routes/comande')
const bodyParser = require('body-parser')
const cors=require('cors')
const app = express()
const port = 3000

app.use(express.static('public'))

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/cat',routeCat)
app.use('/api/produit',routePro)
app.use('/api/commande',routeCommande)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})