// this file returns a configured params object
// uuid package generates a unique 36-char alphanumeric string. this string is used for the image file names
const { v4: uuidv4 } = require("uuid");
// configure params
const params = (fileName) => {
  const myFile = fileName.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  const imageParams = {
    Bucket: "user-images-7a6dcbb7-7c13-4c45-879a-593c89a5637f",
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    ACL: "public-read", // allows read access
  };
  return imageParams;
};

module.exports = params;
