const axios = require("axios");
const router = require("express").Router();
const User = require("../models/user");




module.exports = router;

// router.get("/", (req, res) => Products.find({}).then(dbProducts => res.json(dbProducts)));
// router.get("/:id", (req, res) => Products.find({_id: req.params.id}).then(dbProducts => res.json(dbProducts)));
// router.post("/", (req, res) => Products.create(req.body).then(dbProducts => res.json(dbProducts)));
// router.put("/:id", (req, res) => Products.updateOne({ _id: req.params._id }, req.body).then(dbProducts => res.json(dbProducts)));
// router.delete("/:id", (req, res) => Products.deleteOne({_id: req.params.id}).then(dbProducts=>res.json(dbProducts)));