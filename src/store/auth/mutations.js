export default {
  /**
   * @name SET_EMAIL
   */
  SET_EMAIL(state, payload) {
    state.email = payload.value;
  },
  /**
   * @name SET_PASSWORD
   */
  SET_PASSWORD(state, payload) {
    state.password = payload.value;
  },
  /**
   * @name SET_CONFIRM_PASSWORD
   */
  SET_CONFIRM_PASSWORD(state, payload) {
    state.confirmPassword = payload.value;
  },
  /**
   * @name SET_FIRST_NAME
   */
  SET_FIRST_NAME(state, payload) {
    state.firstName = payload.value;
  },
  /**
   * @name SET_LAST_NAME
   */
  SET_LAST_NAME(state, payload) {
    state.lastName = payload.value;
  },
  /**
   * @name SET_PROFILE_PICTURE
   */
  SET_PROFILE_PICTURE(state, payload) {
    state.profilePicture = payload.value;
  },
  /**
   * when the user click on the block step or in the next button
   * @name CHANGE_STEP
   * @param state
   * @param payload
   * @constructor
   */
  CHANGE_STEP(state, payload) {
    state.currentStep = payload.stepId;
  },
  /**
   *
   * @param state
   * @param payload
   * @constructor
   */
  VALIDATE_STEP(state, payload) {
    if (payload.stepId === 4) {
      state.email = '';
      state.password = '';
      state.confirmPassword = '';
      state.firstName = '';
      state.lastName = '';
      state.profilePicture = null;
    } else {
      state.validatedStep = payload.stepId;
    }
  },
};
