const makeRequest = require('../utils/makeRequest');
const axios = require('axios');

const verifyJwt = async (req, res, next) => {
  try {
    console.log("I m in middleware",req.headers.authorization);
    const token = req.headers.authorization;
    const response = await axios.get('http://localhost:8000/user/verify', {
      headers: {
        authorization: token,
        }
    });
    console.log("response",response);
    if(response.data.success)
        next();
    else
    return res.status(401).json({
            message: 'Auth failed',
        });
  } catch (err) {
    return res.status(401).json({
      message: 'Auth failed',
    });
  }
};

module.exports = verifyJwt;