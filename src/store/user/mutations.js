export default {
  /**
   * when the request for the user login success
   * @name LOGIN_USER_SUCCESS
   * @param state
   * @param payload
   * @constructor
   */
  LOGIN_USER_SUCCESS(state, payload) {
    state.id = payload.id;
    state.firstName = payload.firstname;
    state.lastName = payload.lastname;
    state.email = payload.email;
    state.profilePicture = payload.picture;
    state.things = payload.things;
    state.isLogged = true;
  },
  /**
   * when the request for the user logout success
   * @name LOGOUT_USER_SUCCESS
   * @param state
   * @constructor
   */
  LOGOUT_USER_SUCCESS(state) {
    state.id = 0;
    state.firstName = '';
    state.lastName = '';
    state.email = '';
    state.profilePicture = '';
    state.things = [];
    state.isLogged = false;
  },
};
