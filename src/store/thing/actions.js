export default {
  /**
   *
   * @param context
   * @param payload
   */
  async sendEditRequest(context, payload) {
    const purchaseDate = new Date(payload.purchaseDate);
    const warrantyEndDate = new Date(payload.warrantyEndDate);

    const data = JSON.stringify({
      title: payload.title,
      description: payload.description,
      purchase_date: `${ purchaseDate.getFullYear() }-${ purchaseDate.getMonth() + 1 }-${ purchaseDate.getDate() } 00:00:00`,
      warranty_end_date: `${ warrantyEndDate.getFullYear() }-${ warrantyEndDate.getMonth() + 1 }-${ warrantyEndDate.getDate() } 00:00:00`,
    });

    const formData = new FormData();
    formData.append('data', data);
    payload.attachments.forEach((attachment, index) => {
      if (!attachment.id) {
        formData.append(`file${index}`, attachment.data)
      }
    })
    formData.append('attachmentsToDelete', JSON.stringify(payload.attachmentsToDelete));

    await this.$axios.post(`thing/edit/${payload.id}`,
      formData,
      {
        'Content-Type': 'multipart/form-data',
        withCredentials: true,
      },
    )
      .then((response) => {
        context.commit('EDIT_THING_SUCCESS', { ...response.data.ressource })
        this.$router.push(`/thing/${response.data.ressource.id}`);
      })
      .catch(() => {
        context.commit('DISPLAY_ERROR_MESSAGE', { message: 'Une erreur s\'est produite.' }, { root: true })
      })
  },
};
