var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

router.post("/registrar", function (req, res) {
    console.log(1);
    partidaController.registrar(req, res);
});

router.get("/ultima/:idUsuario", function (req, res) {
    console.log(2);
    partidaController.ultima(req, res);
});

router.get("/media", function (req, res) {
    console.log(3);
    partidaController.media(req, res);
});

router.get("/gabarito", function (req, res) {
    console.log(4);
    partidaController.gabarito(req, res);
});

router.get("/top3", function (req, res) {
    console.log(5);
    partidaController.top3(req, res);
});

router.get("/ranking", function (req, res) {
    console.log(6);
    partidaController.ranking(req, res);
});

router.get("/distribuicao", function (req, res) {
    console.log(6);
    partidaController.distribuicao(req, res);
});

module.exports = router;