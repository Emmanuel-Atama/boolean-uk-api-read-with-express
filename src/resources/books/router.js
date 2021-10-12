const express = require("express");

const { createOne, getAll, getOneById, getByFiction, getByFictionTopic, getByNonFiction} = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById)

router.get("/:type", getByFiction)

router.get("/:bookType", getByFictionTopic)

router.get("/:type", getByNonFiction)

module.exports = router;
