const jwt = require('jsonwebtoken');
function verifyToken(req, res, next){

  if(!req.headers.authorization){
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(' ')[1];
  if(token === 'null'){
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, 'todo-app-super-shared-secret');
  if(!payload){
    return res.status(401).send("Unauthorized request");
  }
  console.log(payload);
  req.userId = payload.userId;
  req.role = payload.role
  next();
}

module.exports = verifyToken;