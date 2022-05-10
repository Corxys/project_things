<template>
  <!-- LOGIN -->
  <main class="login">

    <!-- HEADER // START-->
    <section class="login__header">
      <!-- IMAGE : MOBILE -->
      <img class="login__header-image" src="../assets/images/image-login.png" alt="Header de l'écran de connexion" />
      <!-- TITLE -->
      <h1 class="login__header-title">
        Hey, bienvenue sur Things !
      </h1>
      <!-- TEXT -->
      <p class="login__header-text">
        Pas encore de compte ?
        <!-- REGISTRATION LINK -->
        <router-link to="/inscription" class="login__header-text--strong">
          Inscrivez-vous !
        </router-link>
      </p>
    </section>
    <!-- HEADER // END -->

    <!-- CONTENT // START -->
    <section class="login__content">
      <!-- IMAGE : DESKTOP -->
      <img class="login__content-image" src="../assets/images/image-login.png" alt="Header de l'écran de connexion" />
      <!-- FORM // START -->
      <form id="form-login" class="login__form" @submit.prevent="handleLogin">
        <!-- INPUT // MAIL -->
        <input-form-local id="email" v-model.trim="email" class="login__form-input" name="email" type="text" label="Adresse mail" />
        <!-- INPUT // PASSWORD -->
        <input-form-local id="password" v-model="password" class="login__form-input" name="password" type="password" label="Mot de passe" />
        <!-- FORGOTTEN PASSWORD -->
        <router-link to="/mot-de-passe-oublie" class="login__form-text--forgotten-password">
          Mot de passe oublié ?
        </router-link>

        <!-- FOOTER // START -->
        <div class="login__form-footer">
          <!-- SUBMIT INPUT -->
          <input-submit class="login__form-submit" form-name="form-login" value="Connexion" />
          <!-- ERROR MESSAGE -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </div>
        <!-- FOOTER // END -->

      </form>
      <!-- FORM // END -->
    </section>
    <!-- CONTENT // END -->

  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapMutations, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    computed: {
      ...mapState({
        errorMessage: state => state.errorMessage,
      })
    },
    methods: {
      ...mapMutations(['DISPLAY_ERROR_MESSAGE']),
      ...mapActions('auth', ['sendLoginRequest']),

      /**
       * when the user click on the submit button
       * @name handleLogin
       */
      handleLogin() {
        if (this.email === '' || this.password === '') {
          this.DISPLAY_ERROR_MESSAGE({ message: 'Tous les champs sont obligatoires.' });
        } else {
          this.DISPLAY_ERROR_MESSAGE({ message: '' });

          this.sendLoginRequest({ email: this.email, password: this.password });
        }
      }
    }
  });
</script>

<style scoped lang="scss">
  // LOGIN
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 1.875rem;
    margin: 1.875rem 0;

    // HEADER // START
    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;

      // IMAGE
      &-image {
        margin-bottom: 1.875rem;
      }

      // TITLE
      &-title {
        margin: 1.875rem 0;
      }

      // TEXT
      &-text {
        // REGISTRATION LINK
        &--strong {
          font-weight: 700;
        }
      }
    }
    // HEADER // END

    // CONTENT
    &__content {
      width: 100%;

      &-image {
        display: none;
      }
    }

    // FORM // START
    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-input {
        margin-top: 1.875rem;
      }

      &-footer {
        margin-top: 1.875rem;
      }

      &-text {
        &--forgotten-password {
          align-self: flex-end;
          margin-top: 0.625rem;
          font-size: 0.875rem;
        }
      }

      // FOOTER
      &-footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: relative;
      }
    }
    // FORM // END
  }

  @media (min-width: 768px) {
    .login {
      padding: 0 6.25rem;
    }
  }

  @media (min-width: 992px) {
    .login {
      &__header {
        &-image {
          display: none;
        }

        &-title {
          margin-top: 0;
        }
      }

      &__content {
        display: flex;
        justify-content: center;
        margin-top: 1.875rem;

        &-image {
          display: block;
          margin-right: 2.5rem;
        }
      }

      &__form {
        margin-left: 2.5rem;
        min-width: 275px;

        &-input {
          &:first-child {
            margin-top: 0.625rem;
          }
        }
      }
    }
  }
</style>
