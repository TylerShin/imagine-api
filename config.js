module.exports.env = () => {
  require('dotenv').config();

  return {
    JWTKEY: process.env.JWTKEY,
    foo: "bar",
  };
};
