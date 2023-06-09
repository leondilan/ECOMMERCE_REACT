const express=require('express')
const route=express.Router()
const connection=require('../connexion/database')


module.exports=route


route.post('/', (req, res) => {
    const {nomCat}=req.body

    connection.query('INSERT INTO categories(nomCat) VALUES(?)', [nomCat], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(true);
    });
})

route.get('/', (req, res) => {

    connection.query('SELECT * FROM categories', function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
    });
})

route.get('/:id', (req, res) => {

    connection.query('DELETE FROM categories WHERE idCat=?',[req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(true);
    });
})