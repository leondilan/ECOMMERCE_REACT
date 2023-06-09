const express=require('express')
const router=express.Router()
const multer  = require('multer')
const connection=require('../connexion/database')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
})

const upload = multer({ 
    storage: storage
})


module.exports=router


router.post('/',upload.single('file'), (req, res) => {
  const {nomPro,catPro,descPro,prixPro}=req.body
  const {filename}=req.file
  
  connection.query('INSERT INTO produits(nomPro,descPro,prixPro,imagePro,idCat) VALUES(?,?,?,?,?)',[nomPro,descPro,prixPro,filename,catPro], function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(true);
  });
})

router.get('/', (req, res) => {
  connection.query("SELECT produits.idPro as 'idPro', produits.nomPro as 'nomPro',produits.prixPro as 'prixPro',categories.nomCat as 'nomCat' FROM produits INNER JOIN categories on produits.idCat=categories.idCat", function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
})

router.get('/:id{[0-9]+}', (req, res) => {

  connection.query('DELETE FROM produits WHERE idPro=?',[req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(true);
  });
})

router.get('/getall', (req, res) => {

  connection.query('SELECT * FROM produits', function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
  });
})

router.get('/getsingle/:id', (req, res) => {

  connection.query('SELECT * FROM produits WHERE idPro=?',[req.params.id], function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results[0]);
  });
})

router.get('/getprobycat/:id', (req, res) => {

  if (req.params.id==0) {
    connection.query('SELECT * FROM produits INNER JOIN categories on produits.idCat=categories.idCat', function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
    });
  } else {
    connection.query('SELECT * FROM produits INNER JOIN categories on produits.idCat=categories.idCat WHERE produits.idCat=?',[req.params.id], function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
    });
  }
})