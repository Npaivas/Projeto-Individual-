var express = require("express");
var router = express.Router();
var partidaController = require("../controllers/partidaController");

router.post("/registrar", partidaController.registrar);
router.get("/ultima/:idUsuario", partidaController.ultima);
router.get("/media", partidaController.media);
router.get("/gabarito/:total", partidaController.gabarito);
router.get("/top3", partidaController.top3);
router.get("/ranking", partidaController.ranking);
router.get("/distribuicao", partidaController.distribuicao);

module.exports = router;