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
  /**
   *
   * @name CREATE_THING_SUCCESS
   * @param state
   * @param payload
   * @constructor
   */
  CREATE_THING_SUCCESS(state, payload) {
    payload.onDelete = false;

    const newThings = state.things.map(thing => thing);
    newThings.push(payload);

    state.things = newThings;
  },
  /**
   * @name HANDLE_DELETE_MODAL
   * @param state
   * @param payload
   * @constructor
   */
  HANDLE_DELETE_MODAL(state, payload) {
    state.things.map((thing) => {
      if (thing.onDelete) {
        thing.onDelete = false;
      }

      if (thing.id === payload.thingId) {
        thing.onDelete = true;
      }
    });
  },

  /**
   *
   * @name SORTING_THINGS
   * @param state
   * @param payload
   */
  SORTING_THINGS(state, payload) {
    const newThings = state.things.map(thing => thing);

    switch(payload.selectedOption) {
      case 1:
        newThings.sort((thing1, thing2) => {
          if (thing1.purchase_date < thing2.purchase_date) { return -1 }
          if (thing1.purchase_date > thing2.purchase_date) { return 1 }
          return 0;
        });
        break;
      case 2:
        newThings.sort((thing1, thing2) => {
          if (thing1.warranty_end_date < thing2.warranty_end_date) { return -1 }
          if (thing1.warranty_end_date > thing2.warranty_end_date) { return 1 }
          return 0;
        });
        break;
      case 3:
        newThings.sort((thing1, thing2) => {
          if (thing1.title.toLowerCase() < thing2.title.toLowerCase()) { return -1 }
          if (thing1.title.toLowerCase() > thing2.title.toLowerCase()) { return 1 }
          return 0;
        });
        break;
      case 4:
        newThings.sort((thing1, thing2) => {
          if (thing1.title.toLowerCase() < thing2.title.toLowerCase()) { return 1 }
          if (thing1.title.toLowerCase() > thing2.title.toLowerCase()) { return -1 }
          return 0;
        });
        break;
    }

    state.things = newThings;
  },

  /**
   * when the request to delete a Thing has succeeded
   * @name DELETE_THING_SUCCESS
   * @param state
   */
  DELETE_THING_SUCCESS(state) {
    let indexOfDeletedThing;
    const newThings = state.things.map((thing, index) => {
      if (thing.onDelete === true) {
        indexOfDeletedThing = index;
      }
      return thing;
    });

    newThings.splice(indexOfDeletedThing, 1);
    state.things = newThings;
  },
};
