import HandlerWrapper from "./handlerWrapper";
import writePost from "./posts/writePost";

module.exports = {
  writePost: HandlerWrapper.safelyWrap(writePost),
};
