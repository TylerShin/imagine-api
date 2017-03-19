import HandlerWrapper from "./handlerWrapper";
import writePost from "./posts/writePost";
import getPost from "./posts/getPost";
import signup from "./users/signup";
import signin from "./users/signin";
import getUser from "./users/getUser";

module.exports = {
  writePost: HandlerWrapper.safelyWrap(writePost),
  getPost: HandlerWrapper.safelyWrap(getPost),
  getUser: HandlerWrapper.safelyWrap(getUser),
  signup: HandlerWrapper.safelyWrap(signup),
  signin: HandlerWrapper.safelyWrap(signin),
};
