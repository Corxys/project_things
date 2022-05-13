export default {
  /**
   * when the user click on a thing, we hydrate this data in the thing reducer
   * @method
   * @name GET_THING_BY_ID
   * @param state
   * @param payload
   * @constructor
   */
  GET_THING_BY_ID(state, payload) {
    const editedAttachments = [...payload.attachments];

    editedAttachments.map((attachment, index) => {
      attachment.onActive = index === 0;

      return attachment;
    });

    state.id = payload.id;
    state.title = payload.title;
    state.description = payload.description;
    state.owner = payload.owner;
    state.attachments = editedAttachments;
    state.purchaseDate = payload.purchase_date;
    state.warrantyEndDate = payload.warranty_end_date;
  },
  /**
   * when the user click on a thing file, we change the onActive key
   * @methods
   * @name CHANGE_ACTIVE_FILE
   * @param state
   * @param payload
   * @constructor
   */
  CHANGE_ACTIVE_FILE(state, payload) {
    state.attachments.map((attachment) => {
      if (attachment.onActive === true) {
        attachment.onActive = false;
      }

      if (attachment.id === payload.id) {
        attachment.onActive = true;
      }

      return attachment;
    });
  },
  /**
   *
   * @name CREATE_THING_SUCCESS
   * @param state
   * @param payload
   * @constructor
   */
  CREATE_THING_SUCCESS(state, payload) {
    payload.attachments = payload.attachments.map((attachment, index) => {
      attachment.onActive = index === 0;
      return attachment;
    });

    state.id = payload.id;
    state.title = payload.title;
    state.description = payload.description;
    state.owner = payload.owner;
    state.attachments = payload.attachments;
    state.purchaseDate = payload.purchase_date;
    state.warrantyEndDate = payload.warranty_end_date;
  },
  HANDLE_DELETE_MODAL(state, payload) {
    state.onDelete = payload.active;
  },
  DELETE_THING_SUCCESS(state) {
    state.id = null;
    state.title = '';
    state.description = '';
    state.owner = [];
    state.attachments = [];
    state.purchaseDate = '';
    state.warrantyEndDate = '';
    state.onDelete = false;
  }
};
