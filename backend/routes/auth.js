const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middlewares/fetchuser');
var JWT_SECRET = "misbahfatima"

// ROUTE 1 : create user
router.post(
  '/createuser',
  [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password').isLength({ min: 5 })
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ errors: "Sorry a user with this email already exists." });
      }

      // hashing the password
      var salt = await bcrypt.genSaltSync(10);
      var secPass = await bcrypt.hashSync(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      res.json(user);
    }
    catch (error) {
      console.error(error.message)
      res.status(500).send("Some error occured")
    }

    // .then((user)=>res.json(user)).
    // catch((error => {res.send({"error": "Please do not enter duplicate email", "message": error.message})}))
  }
);

// ROUTE 2 : login
router.post(
  '/login',
  [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: "Please try to login with correct credentials." });
      }

      // hashing the password
      var passwordCompare = await bcrypt.compare(password, user.password)
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Please try to login with correct credentials." });
      }

      const data = { user: { id: user.id } }
      const authToken = jwt.sign(data, JWT_SECRET)
      res.json(authToken);
    }
    catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Error")
    }
  }
);

// ROUTE 3 : getuser
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    let user = await User.findById(userId).select('-password');
    res.send(user)
  }
  catch (error) {
    res.status(500).send("Internal Server Error")
  }
}
);

module.exports = router;