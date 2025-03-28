const router = require("express").Router();

router.use('/', require('./swagger'));

router.get("/", (req, res) => {
//#swagger.tags = ['Welcome to the Students API server']
  res.send("Welcome to the Students API server");
});

router.use("/students", require("./students"));
router.use("/courses", require("./courses"));

module.exports = router;
