const makeRequest = require('../utils/makeRequest');

const verifyJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const response = await makeRequest('http://localhost:4000/',{url:'user/verify',method:'get'}, {
      headers: {
        authorization: `${token}`,
      },
    });
    if(response.success)
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