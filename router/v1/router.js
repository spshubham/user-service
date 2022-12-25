var express = require("express");
var router = express.Router();
const userController = require("../../controllers/v1/user");

/* User API routes */
router.post("/user/signup", function(req, res, next){
  userController.signUp(req, res, next, req.body);
});



router.get("/user/login", function(req, res, next){
  userController.getDetails(req, res, next, req.query["email"], req.query["password"]);
});


module.exports = router;
