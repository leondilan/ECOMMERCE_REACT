const express = require("express");
const db = require("../connexion/database");
const router = express.Router();

module.exports = router;

router.post("/addcommande", (req, res) => {
  const { nomCli, numCli, idPro, prixPro, qteCmd } = req.body;

  db.query(
    "INSERT INTO clients(nomCli,numCli) VALUES(?,?)",
    [nomCli, numCli],
    function (error, results, fields) {
      if (error) throw error;
      db.query(
        "SELECT * FROM clients ORDER BY idCli DESC",
        function (error, results, fields) {
          if (error) throw error;
          db.query(
            "INSERT INTO commandes(idPro,idCli,prixCmd,qteCmd) VALUES(?,?,?,?)",
            [idPro, results[0].idCli, prixPro, qteCmd],
            function (error, results, fields) {
              if (error) throw error;
              res.status(200).json(true);
            }
          );
        }
      );
    }
  );
});

router.get("/getcmd", (req, res) => {
  db.query(
  "SELECT commandes.livrer AS 'livre',commandes.create_cmd AS 'date',commandes.idCmd,produits.nomPro,produits.prixPro,commandes.qteCmd,clients.nomCli,clients.numCli,(commandes.qteCmd*commandes.prixCmd) AS 'Total' FROM commandes INNER JOIN clients on clients.idCli=commandes.idCli INNER JOIN produits ON commandes.idPro=produits.idPro ORDER BY commandes.idCmd DESC",
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
    }
  );
});

router.get("/delCmd/:id", (req, res) => {
  db.query(
    "DELETE FROM commandes WHERE idCmd=?",
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(true);
    }
  );
});

router.get("/nbreCmd", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS 'nbreCmd' FROM commandes",
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results[0].nbreCmd);
    }
  );
});

router.get("/somme", (req, res) => {
  db.query(
    "SELECT SUM((commandes.qteCmd*commandes.prixCmd)) AS 'somme' FROM commandes",
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results[0].somme);
    }
  );
});

router.post("/statelivre/:id", (req, res) => {
  const {val}=req.body
  db.query(
    "UPDATE commandes SET livrer=? WHERE idCmd=?",
    [val,req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(true);
    }
  );
});