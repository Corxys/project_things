export default {
  /**
   * display an error message if the user do something bad or if a request server failed
   * @name DISPLAY_ERROR_MESSAGE
   * @param state
   * @param payload
   * @constructor
   */
  DISPLAY_ERROR_MESSAGE(state, payload) {
    state.errorMessage = payload.message;
  },
};
