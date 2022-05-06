<template>
  <div class="step">
    <header class="step__header">
      <h1 class="step__title">
        Créer un nouveau compte.
      </h1>
      <p class="text">
        Veuillez importer une photo de profil (facultatif).
      </p>
    </header>
    <div class="step__profile-picture">
      <img v-show="profilePicture !== null" class="step__profile-picture-src" :src="profilePicture" alt="Photo de profil choisie par l'utilisateur." />
    </div>
    <form id="form-step" class="step__form">
      <div class="step__input-field">
        <input id="profile-picture" class="step__file" name="profile-picture" type="file" @change="checkInput({ value: $event.target.files[0], type: 'profile-picture', action: 'change' })" />
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
      <div class="step__user-name">
        {{ firstName }} {{ lastName }}
      </div>
    </form>
    <div class="step__footer">
      <input class="step__button" form="form-step" type="submit" value="Suivant" @click.prevent="sendRegistrationRequest" />
      <div v-if="errorMessage !== ''" class="step__error-message error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'StepPictureComponent',
    computed: {
      ...mapState({
        profilePicture: state => state.auth.profilePicture,
        firstName: state => state.auth.firstName,
        lastName: state => state.auth.lastName,
        errorMessage: state => state.errorMessage,
      })
    },
    methods: {
      ...mapActions('auth', ['checkInput', 'sendRegistrationRequest']),
    }
  });
</script>

<style scoped>

</style>
