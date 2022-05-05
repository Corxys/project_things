<template>
  <div class="step">
    <header class="step__header">
      <h1 class="step__title">
        Créer un nouveau compte.
      </h1>
      <p class="step__text">
        Veuillez renseigner votre prénom et votre nom.
      </p>
    </header>
    <form id="form-step" class="step__content">
      <input-form-global id="first-name" name="first-name" type="text" label="Prénom" :value="firstName" />
      <input-form-global id="last-name" name="last-name" type="text" label="Nom" :value="lastName" />
    </form>
    <footer class="step__footer">
      <input type="submit" class="button" form="form-step" value="Suivant" @click.prevent="checkInput({ value: null, type: 'name', action: 'next' })" />
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
    name: 'StepNameComponent',
    computed: {
      ...mapState({
        firstName: state => state.auth.firstName,
        lastName: state => state.auth.lastName,
        errorMessage: state => state.errorMessage,
      })
    },
    methods: {
      ...mapActions('auth', ['checkInput']),
    }
  });
</script>
