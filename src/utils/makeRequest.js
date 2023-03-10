const axios = require("axios");

const makeRequest = async (
    baseURL ,
  apiEndPoint = { url: "", method: "" },
  dynamicConfig = {}
) => {
  try {
    const requestDetails = {
      baseURL,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
    };
    const { data } = await axios(requestDetails);
    return data;
  } catch (e) {
    console.log(e);
  }
};

module.exports={
  makeRequest
} 