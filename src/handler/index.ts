import HandlerWrapper from "./handlerWrapper";
import writePost from "./posts/writePost";
import getPost from "./posts/getPost";

module.exports = {
  writePost: HandlerWrapper.safelyWrap(writePost),
  getPost: HandlerWrapper.safelyWrap(getPost),
};
