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
   * @method
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
};
