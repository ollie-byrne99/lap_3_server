const jwt = require("jsonwebtoken");
require('dotenv').config();


const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log("token: ", bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    // jwt.verify(
    //   bearerToken,
    //   process.env.TOKEN_KEY,
    //   (err, decoded) => {
    //     if (err) return res.sendStatus(403);
    //     req.user = decoded.username;
        next()
    //   }
    // )
    //next();
  } else {
    res.sendStatus(403);
  }
}




module.exports = verifyToken;