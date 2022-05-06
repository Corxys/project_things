<template>
  <div class="step">
    <h1 class="step__title">
      Félicitations !
    </h1>
    <p class="step__text">
      Vous avez terminé votre inscription.
      <br /> <br />
      Vous avez reçu un mail de confirmation à votre adresse.
      <br /> <br />
      Une fois que vous aurez cliqué sur le lien d'activation, vous pourrez vous connecter à votre espace.
      <br /> <br />
      Pensez à vérifier dans vos spams.
    </p>
    <router-link to="/">
      <button class="button" @click="resetSteps">
        Connectez-vous
      </button>
    </router-link>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'StepFinalComponent',
    methods: {
      ...mapMutations('auth', ['CHANGE_STEP']),
      ...mapMutations('auth', ['VALIDATE_STEP']),

      resetSteps() {
        this.CHANGE_STEP({ stepId: 1 });
        this.VALIDATE_STEP({ stepId: 0 });
      }
    }
  };
</script>
