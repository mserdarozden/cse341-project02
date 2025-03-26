const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Welcome to server");
});

router.use("/students", require("./students"));
router.use("/courses", require("./courses"));

module.exports = router;
