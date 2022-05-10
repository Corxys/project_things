<template>
  <div class="error">
    <h1 class="error__title">
      Oups, on dirait que vous êtes au mauvais endroit !
    </h1>
    <p class="error__text">
      Pour votre bien, revenez en sécurité.
    </p>
    <router-link to="isLogged ? '/tableau-de-bord' : '/'" class="error__link">
      <button class="error__button button">
        Accueil
      </button>
    </router-link>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'ErrorPage',
    computed: {
      ...mapState({
        isLogged: state => state.user,
      }),
    },
  };
</script>

<style scoped lang="scss">
  .error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 1.875rem;
    margin: 1.875rem 0;

    &__text {
      margin: 1.875rem 0;
    }
  }

  @media (min-width: 768px) {
    .error {
      padding: 0 6.25rem;
    }
  }
</style>
