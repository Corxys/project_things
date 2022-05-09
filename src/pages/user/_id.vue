<template>
  <!-- USER PROFILE -->
  <div class="user-detail">
    <!-- TITLE -->
    <h1 class="user-detail__title">
      {{ user.firstName }} {{ user.lastName.toUpperCase() }}
    </h1>
    <!-- PROFILE PICTURE -->
    <div class="user-detail__profile-picture">
      <img class="user-detail__profile-picture-src profile-picture-src" :src="profilePicture" alt="Photo de profil choisie par l'utilisateur." />
    </div>
    <form id="user-detail" class="step__form">
      <!-- INPUT FILE -->
      <div class="step__input-field">
        <input id="profile-picture" class="step__file" name="profile-picture" type="file" @change="handleFileUpload" />
        <label class="input-file__label" for="profile-picture">
          <span class="input-file__browse">
            Parcourir
          </span>
          <span class="input-file__outer-file-name">
            <span class="input-file__inner-file-name">
             <span class="input-file__file-name"> <!-- the file name is insert here after upload --> </span>
            </span>
          </span>
        </label>
      </div>
      <!-- INPUT MAIL -->
      <div class="input__group">
        <input id="email" class="input__field" name="email" type="text" placeholder="Adresse mail" />
        <label class="input__label">
          Adresse mail
        </label>
      </div>
      <!-- INPUT PASSWORD -->
      <div class="input__group">
        <input id="password" class="input__field" name="password" type="password" placeholder="Mot de passe" />
        <label class="input__label">
          Mot de passe
        </label>
      </div>
      <!-- INPUT CONFIRM PASSWORD -->
      <div class="input__group">
        <input id="confirm-password" class="input__field" name="password" type="password" placeholder="Mot de passe" />
        <label class="input__label">
          Confirmation du mot de passe
        </label>
      </div>
      <!-- INPUT SUBMIT -->
      <input-submit form-name="user-detail" value="Enregistrer les modifications" />
    </form>
    <div class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'UserPage',
    data() {
      return {
        profilePicture: '',
      }
    },
    computed: {
      ...mapState({
        user: state => state.user,
        errorMessage: state => state.errorMessage,
      })
    },
    methods: {
      ...mapMutations(['DISPLAY_ERROR_MESSAGE']),

      handleFileUpload(event) {
        const file = event.target.files[0];

        let profilePictureTag;
        const profilePictureArea = document.querySelector('.user-detail__profile-picture');
        const fileName = document.querySelector('.input-file__file-name');

        fileName.innerHTML = event.target.files[0].name;

        const imageType = /image.*/;

        if (!file.type.match(imageType)) {
          this.DISPLAY_ERROR_MESSAGE({ message: 'Le document sélectionné n\'est pas une image.' });

          if (this.profilePicture) {
            profilePictureTag = document.querySelector('.profile-picture-src');
            profilePictureArea.removeChild(profilePictureTag);
          }
        } else {
          this.DISPLAY_ERROR_MESSAGE({ message: '' });
          this.profilePicture = file;

          const reader = new FileReader();

          reader.onload = () => {
            profilePictureArea.innerHTML = '';
            const image = new Image();
            image.classList.add('profile-picture-src');
            image.src = reader.result;
            image.alt = 'Photo de profil choisie par l\'utilisateur';

            profilePictureArea.appendChild(image);
          }

          reader.readAsDataURL(file);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .user-detail {
    display: flex;
    flex-direction: column;
    padding: 0px 30px;
    margin: 40px 0px;

    &__profile-picture {
      overflow: hidden;
      width: 115px;
      height: 115px;
      margin-top: 30px;
      border: 2px solid $black;
      border-radius: 100px;

      img {
        object-fit: cover;
        object-position: center;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>

<router>
  {
    path: '/profil',
  }
</router>
