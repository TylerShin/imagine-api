require('dotenv').config();

exports.env = {
  JWTKEY: process.env.JWTKEY,
  foo: "bar",
};
