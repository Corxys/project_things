<template>
  <div class="step">
    <header class="step__header">
      <h1 class="step__title">
        Créer un nouveau compte.
      </h1>
      <p class="step__text">
        Veuillez renseigner votre adresse mail pour pouvoir vous identifier.
      </p>
    </header>
    <form id="form-step" class="step__content">
      <input-form-global id="email" name="email" type="text" label="Adresse mail" :value="email" />
      <p class="step__text">
        Veuillez indiquer une adresse mail active, celle-ci sera utile pour confirmer l'accès à votre espace.
      </p>
    </form>
  <footer class="step__footer">
    <input type="submit" class="button" form="form-step" value="Suivant" @click.prevent="checkInput({ value: null, type: 'email', action: 'next' })" />
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
    name: 'StepEmailComponent',
    computed: {
      ...mapState({
        email: state => state.auth.email,
        errorMessage: state => state.errorMessage,
      })
    },
    methods: {
      ...mapActions('auth', ['checkInput']),
    }
  });
</script>
