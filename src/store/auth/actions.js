export default {
  /**
   * call to API for login
   * @name sendLoginRequest
   * @param context
   * @param payload
   */
  async sendLoginRequest(context, payload) {
    const data = JSON.stringify({
      email: payload.email,
      password: payload.password,
    });

    Promise.all([
      await this.$axios.post('/login', data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
        .catch(() => {
          context.commit('DISPLAY_ERROR_MESSAGE', { message: 'Identifiants incorrects.' }, { root: true });
        }),
      await this.$axios.get('/thing/browse/1', { withCredentials: true })
        .catch(() => {
          context.commit('DISPLAY_ERROR_MESSAGE', { message: 'Identifiants incorrects.' }, { root: true });
        }),
    ])
      .then(([user, things]) => {
        console.log(user, things);
        let thingsData = [];

        things.data.ressources.forEach(resource => thingsData.push(JSON.parse(resource)));

        thingsData = thingsData.sort((first, second) => {
          if (first.purchase_date < second.purchase_date) return 1;
          if (first.purchase_date > second.purchase_date) return -1;
        })

        context.commit('user/LOGIN_USER_SUCCESS', { ...user.data.user, things: thingsData }, { root: true });
        this.$router.push('/tableau-de-bord');
      })
  },
};
