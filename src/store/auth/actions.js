import { updateFilling } from '../../utils/updateFilling';

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
        let thingsData = [];

        things.data.ressources.forEach(resource => thingsData.push(JSON.parse(resource)));

        thingsData = thingsData.sort((first, second) => {
          if (first.purchase_date < second.purchase_date) return 1;
          if (first.purchase_date > second.purchase_date) return -1;
        })

        context.commit('user/LOGIN_USER_SUCCESS', { ...user.data.user, things: thingsData }, { root: true });
        this.$router.push('/tableau-de-bord');
      });
  },
  /**
   * call to API for the logout
   * @name sendLogoutRequest
   * @param context
   */
  async sendLogoutRequest(context) {
    await this.$axios.get('/logout', { withCredentials: true })
      .then(() => {
        context.commit('user/LOGOUT_USER_SUCCESS', {}, { root: true });
        this.$router.push('/');
      });
  },
  async sendRegistrationRequest(context) {
    const data = JSON.stringify({
      email: context.state.email,
      password: context.state.password,
      firstName: context.state.firstName,
      lastName: context.state.lastName,
    })

    const profilePicture = context.state.profilePicture;

    const formData = new FormData();
    formData.append('data', data);
    formData.append('profilePicture', profilePicture);

    await this.$axios.post('/user/register',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        context.commit('DISPLAY_ERROR_MESSAGE', { message: '' }, { root: true });
        context.commit('CHANGE_STEP', { stepId: 5 });
        context.commit('VALIDATE_STEP', { stepId: 4 });
        this.$router.push('/');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          context.commit('DISPLAY_ERROR_MESSAGE', { message: 'Cet utilisateur existe déjà.' }, { root: true });
        } else {
          context.commit('DISPLAY_ERROR_MESSAGE', { message: 'Une erreur s\'est produite.' }, { root: true });
        }
      });
  },
  /**
   * @name checkInput
   * @param context
   * @param payload
   */
  checkInput(context, payload) {
    switch(payload.action) {
      case 'change':
        // fill state email
        if (payload.type === 'email') {
          context.commit('SET_EMAIL', { value: payload.value });
        }
        // fill state password
        else if (payload.type === 'password') {
          context.commit('SET_PASSWORD', { value: payload.value });
        }
        // fill state confirm password
        else if (payload.type === 'confirm-password') {
          context.commit('SET_CONFIRM_PASSWORD', { value: payload.value });
        }
        // fill first name
        else if (payload.type === 'first-name') {
          context.commit('SET_FIRST_NAME', { value: payload.value });
        }
        // fill state confirm password
        else if (payload.type === 'last-name') {
          context.commit('SET_LAST_NAME', { value: payload.value });
        }
        // fill state profile picture
        else if (payload.type === 'profile-picture') {
          const imageType = /image.*/;

          let profilePictureTag;
          const profilePictureArea = document.querySelector('.step__profile-picture');
          const fileName = document.querySelector('.input-file__file-name');

          fileName.innerHTML = payload.value.name;

          if (!payload.value.type.match(imageType)) {
            context.commit('DISPLAY_ERROR_MESSAGE', { message: 'Le document sélectionné n\'est pas une image.' }, { root: true });

            if (context.state.profilePicture) {
              profilePictureTag = document.querySelector('.step__profile-picture-src');
              profilePictureArea.removeChild(profilePictureTag);
            }
          } else {
            context.commit('DISPLAY_ERROR_MESSAGE', { message: '' }, { root: true });

            context.commit('SET_PROFILE_PICTURE', { value: payload.value });

            // et on fait un rendu du document dans le DOM
            const reader = new FileReader();

            reader.onload = () => {
              profilePictureArea.innerHTML = '';
              const image = new Image();
              image.classList.add('step__profile-picture-src');
              image.style.width = '100%';
              image.style.height = '100%';
              image.style.objectFit = 'cover';
              image.style.objectPosition = 'center';
              image.src = reader.result;
              image.alt = 'Photo de profil choisie par l\'utilisateur';

              profilePictureArea.appendChild(image);
            }

            reader.readAsDataURL(context.state.profilePicture);
          }
        }
        break;
      case 'next':
        // check email input
        if (payload.type === 'email') {
          const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

          // check if the  mail input are empty
          if (context.state.email === '') {
            context.commit('DISPLAY_ERROR_MESSAGE', { message: 'Tous les champs sont obligatoires.' }, { root: true });
          }
          // check if the mail address isn't correct
          else if (!mailRegex.test(context.state.email)) {
            context.commit('DISPLAY_ERROR_MESSAGE', { message: 'L\'adresse mail est invalide.' }, { root: true });
          }
          // if mail input are ok
          else {
            context.commit('DISPLAY_ERROR_MESSAGE', { message: '' }, { root: true });
            context.commit('CHANGE_STEP', { stepId: 2 });
            context.commit('VALIDATE_STEP', { stepId: 1 });
            updateFilling(context.state.currentStep);
          }
        }
        // check password input
        else if (payload.type === 'password') {
          const passwordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

          // check if the passwords input are empty
          if (context.state.password === '' || context.state.confirmPassword === '') {
            context.commit('DISPLAY_ERROR_MESSAGE', { message: 'Tous les champs sont obligatoires.' }, { root: true });
          }
          // check if the passwords input are different
          else if (context.state.password !== context.state.confirmPassword) {
            context.commit('DISPLAY_ERROR_MESSAGE', { message: 'Les mots de passe ne correspondent pas.' }, { root: true });
          }
          // check if the password is too weak
          else if (!passwordRegex.test(context.state.password)) {
            context.commit('DISPLAY_ERROR_MESSAGE', { message: 'Le mot de passe est trop faible.' }, { root: true });
          }
          // if password input are ok
          else {
            context.commit('DISPLAY_ERROR_MESSAGE', { message: '' }, { root: true });
            context.commit('CHANGE_STEP', { stepId: 3 });
            context.commit('VALIDATE_STEP', { stepId: 2 });
            updateFilling(context.state.currentStep);
          }
        }
        // check names inputs
        else if (payload.type === 'name') {
          // check if the names input are empty
          if (context.state.firstName === '' || context.state.lastName === '') {
            context.commit('DISPLAY_ERROR_MESSAGE', { message: 'Tous les champs sont obligatoires.' }, { root: true });
          }
          // if names input are ok
          else {
            context.commit('DISPLAY_ERROR_MESSAGE', { message: '' }, { root: true });
            context.commit('CHANGE_STEP', { stepId: 4 });
            context.commit('VALIDATE_STEP', { stepId: 3 });
            updateFilling(context.state.currentStep);
          }
        }
        break;
    }
  },
};
