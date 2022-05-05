<template>
  <!-- REGISTRATION -->
  <main class="registration">
    <!-- TIMELINE // START -->
    <section class="registration__timeline">
      <!-- STEPS -->
      <div class="registration__steps">
        <div id="step-1" class="registration__step active">
          <button class="registration__step-number active" :style="cssVars" v-on="currentStep !== 5 ? { click: changeStep } : {}">
            1
          </button>
          <div class="registration__step-text">
            <div class="registration__step-title">
              Vos identifiants de connexion
            </div>
            <div class="registration__step-subtitle">
              Merci d'indiquer votre adresse mail
            </div>
          </div>
        </div>
        <span id="line-1" class="registration__step-line" />
        <div id="step-2" class="registration__step">
          <button class="registration__step-number" :style="cssVars" v-on="currentStep !== 5 && validatedStep >= 1 ? { click: changeStep } : {}">
            2
          </button>
          <div class="registration__step-text">
            <div class="registration__step-title">
              Vos identifiants de connexion
            </div>
            <div class="registration__step-subtitle">
              Choisissez un mot de passe sécurisé
            </div>
          </div>
        </div>
        <span id="line-2" class="registration__step-line" />
        <div id="step-3" class="registration__step">
          <button class="registration__step-number" :style="cssVars" v-on="currentStep !== 5 && validatedStep >= 2 ? { click: changeStep } : {}">
            3
          </button>
          <div class="registration__step-text">
            <div class="registration__step-title">
              Vos informations personnelles
            </div>
            <div class="registration__step-subtitle">
              Merci d'indiquer votre nom et prénom
            </div>
          </div>
        </div>
        <span id="line-3" class="registration__step-line" />
        <div id="step-4" class="registration__step">
          <button class="registration__step-number" :style="cssVars" v-on="currentStep !== 5 && validatedStep >= 3 ? { click: changeStep } : {}">
            4
          </button>
          <div class="registration__step-text">
            <div class="registration__step-title">
              Votre photo de profil
            </div>
            <div class="registration__step-subtitle">
              Sélectionnez une photo de profil (facultative)
            </div>
          </div>
        </div>
        <span id="line-4" class="registration__step-line" />
        <div id="step-5" class="registration__step">
          <button class="registration__step-number" :style="cssVars" @click="changeStep">
            5
          </button>
          <div class="registration__step-text">
            <div class="registration__step-title">
              Félicitations !
            </div>
            <div class="registration__step-subtitle">
              Vous avez terminé, bien joué
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- TIMELINE // END -->

    <!-- CONTENT // START -->
    <section class="registration__content">
      <step-email v-if="currentStep === 1" />
      <step-password v-if="currentStep === 2" />
      <step-name v-if="currentStep === 3" />
      <step-picture v-if="currentStep === 4" />
      <step-final v-if="currentStep === 5" />
    </section>
    <!-- CONTENT // END -->
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapMutations } from 'vuex';
  import { updateFilling } from '../../utils/updateFilling';

  export default Vue.extend({
    name: 'RegistrationPage',
    data() {
      return {
        lengthLineVertical: 0,
        lengthLineHorizontal: 0,
      }
    },
    computed: {
      ...mapState({
        currentStep: state => state.auth.currentStep,
        validatedStep: state => state.auth.validatedStep,
      }),
      cssVars() {
        return {
          '--length-line-vertical': this.lengthLineVertical,
          '--length-line-horizontal': this.lengthLineHorizontal,
        };
      },
    },
    mounted() {
      const steps = document.querySelectorAll('.registration__step');

      // length of the line between two steps (horizontal & vertical)
      this.lengthLineHorizontal = (Math.abs(steps[0].offsetLeft - steps[1].offsetLeft) - 36) + 'px';
      this.lengthLineVertical = (Math.abs(steps[0].offsetTop - steps[1].offsetTop) - 36) + 'px';
    },
    methods: {
      ...mapMutations(['DISPLAY_ERROR_MESSAGE']),
      ...mapMutations('auth', ['CHANGE_STEP', 'VALIDATE_STEP']),

      /**
       * when the user click on the block step
       * @name changeStep
       * @param step
       */
      changeStep(step) {
        if (step.target) {
          if (step.target.classList[0] === 'registration__step-number' || step.target.classList[1] === 'registration__step-number') {
            const stepNode = document.querySelector(`#step-${parseInt(step.target.innerHTML, 10)}`);
            step = parseInt(stepNode.id[5], 10);
          }
        }

        this.CHANGE_STEP({ stepId: step });

        updateFilling(step);
      },
    },
  });
</script>

<style lang="scss">
  // REGISTRATION
  .registration {
    display: flex;
    flex-direction: column;

    // TIMELINE
    &__timeline {
      position: relative;
      height: calc(2.25rem + 1.875rem);
      padding: 0 1.875rem;
      background-color: $primary;
    }

    // STEPS
    &__steps {
      display: flex;
      justify-content: space-between;
    }

    // STEP
    &__step {
      opacity: 0.5;
      display: flex;
      align-items: center;

      &.complete, &.active {
        opacity: 1;
      }

      &-number {
        z-index: 1;
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 2.25rem;
        min-width: 2.25rem;
        background-color: $white;
        color: $black;
        font-weight: 700;

        &.active {
          cursor: pointer;
          background-color: $black;
          color: $white;
        }

        &.complete {
          cursor: pointer;
        }
      }

      &-text {
        display: none;
        flex-direction: column;
        color: $white;
      }

      &-title {
        font-weight: 700;
        margin-bottom: 0.125rem;
      }

      &-subtitle {
        font-size: 0.813rem;
      }

      &-line {
        position: relative;
        opacity: 0.5;
        background-color: $white;
        margin-top: calc(2.063rem / 2);
        height: 0.125rem;
        width: 100%;

        &.active {
          opacity: 1;
        }
      }
    }

    &__content {
      padding: 0 1.875rem;
      margin: 1.875rem 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      height: 100%;
    }
  }

  @media (min-width: 992px) {
    .registration {
      flex-direction: row;
      align-items: center;

      &__timeline {
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        height: 100vh;
        display: flex;
        align-items: center;
        padding: 0 6.25rem;
      }

      &__steps {
        flex-direction: column;
        height: 65%;
      }

      &__step {
        &.complete, &.active {
        }

        &-number {
          margin-right: 1.875rem;

          &.active {
          }

          &.complete {
          }
        }

        &-text {
          display: flex;
          max-height: 2.25rem;
        }

        &-title {
        }

        &-subtitle {
        }

        &-line {
          margin-top: 0;
          margin-left: calc(2.063rem / 2);
          width: 0.125rem;
          height: 100%;

          &.active {
          }
        }
      }

      &__content {
        margin: 0 0 0 40%;
      }
    }
  }

  .step {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 80%;
    width: 100%;

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__text {
      text-align: center;
      margin-top: 1.875rem;
    }

    &__content {
      width: 100%;

      .input__group {
        margin-top: 1.875rem;
      }
    }

    &__form {
      width: 100%;
      display: flex;
      flex-direction: column;

      &-input {
        margin-top: 1.875rem;
      }
    }

    &__profile-picture {
      overflow: hidden;
      width: 115px;
      height: 115px;
      margin-top: 1.875rem;
      border: 2px solid $black;
      border-radius: 100px;

      img {
        object-fit: cover;
        object-position: center;
        height: 100%;
        width: 100%;
      }
    }

    &__file {
      margin-top: 30px;
    }

    &__user-name {
      margin-top: 30px;
      font-size: 23px;
      font-weight: 700;
      text-align: center;
    }

    &__error-message {
      position: absolute;
      bottom: -30px;
      font-weight: 700;
      text-align: center;
    }
  }
</style>

<router>
  {
    path: '/inscription'
  }
</router>
