<template>
  <div class="step">
    <header class="step__header">
      <h1 class="step__title">
        Créer un nouveau compte.
      </h1>
      <p class="step__text">
        Veuillez renseigner votre mot de passe pour sécuriser votre compte.
      </p>
    </header>
    <form id="form-step" class="step__content">
      <input-form-global id="password" name="password" type="password" label="Mot de passe" :value="password" />
      <input-form-global id="confirm-password" name="confirm-password" type="password" label="Confirmation du mot de passe" :value="confirmPassword" />
      <p class="step__text">
        Votre mot de passe doit contenir au minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
      </p>
    </form>
    <footer class="step__footer">
      <input type="submit" class="button" form="form-step" value="Suivant" @click.prevent="checkInput({ value: null, type: 'password', action: 'next' })" />
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  name: 'StepPasswordComponent',
  computed: {
    ...mapState({
      password: state => state.auth.password,
      confirmPassword: state => state.auth.confirmPassword,
      errorMessage: state => state.errorMessage,
    })
  },
  methods: {
    ...mapActions('auth', ['checkInput']),
  }
});
</script>
