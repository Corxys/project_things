<template>
  <div class="thing__wrapper">
    <div class="thing" v-bind:style="thing.onDelete ? { opacity: 0.5 } : { opacity: 1 }">
      <div class="thing__header">
        <h2 class="thing__title" @click="handleGetThing">
          {{ thing.title }}
        </h2>
        <button class="thing__delete" @click="HANDLE_DELETE_MODAL({ thingId: thing.id, active: true })">
          <img class="thing__delete-src" src="../assets/images/icon-delete-thing.svg" alt="Icône de suppression" />
        </button>
      </div>
      <hr class="thing__separator" />
      <div class="thing__infos">
        <div class="thing__info">
          <div class="thing__info-title">
            > Date d'achat {{ thing.onDelete }}
          </div>
          <div class="thing__info-value">
            {{ new Date(thing.purchase_date).toLocaleDateString() }}
          </div>
        </div>
        <div v-if="thing.warranty_end_date" class="thing__info">
          <div class="thing__info-title">
            > Fin de garantie
          </div>
          <div class="thing__info-value">
            {{ new Date(thing.warranty_end_date).toLocaleDateString() }}
          </div>
        </div>
      </div>
      <div class="thing__footer">
        <div class="thing__preview">
          <a :href="$config.apiURL + thing.attachments[0].url" target="_blank">
            <img class="thing__preview-src" src="../assets/images/icon-preview.svg" alt="Icône de prévisualisation" />
            Prévisualiser
          </a>
        </div>
        <button class="button" @click="handleGetThing">
          Détails
        </button>
      </div>
    </div>
    <div v-if="thing.onDelete" class="thing__delete-modal">
      <h2 class="thing__delete-modal-title">
        Souhaitez-vous vraiment supprimer votre Thing ?
      </h2>
      <div class="thing__delete-modal-buttons">
        <button class="thing__delete-modal-button button" @click="sendDeleteRequest({ thingId: thing.id })">
          Oui
        </button>
        <button class="thing__delete-modal-button button button--cancel" @click="HANDLE_DELETE_MODAL({ active: false })">
          Non
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapMutations, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'ThingComponent',
    props: {
      thing: Object,
    },
    methods: {
      ...mapMutations('thing', ['GET_THING_BY_ID']),
      ...mapMutations('user', ['HANDLE_DELETE_MODAL']),
      ...mapActions('thing', ['sendDeleteRequest']),

      /**
       * @name handleGetThing
       */
      handleGetThing() {
        this.GET_THING_BY_ID(this.thing);
        this.$router.push(`/thing/${this.thing.id}`)
      },
    },
  });
</script>

<style scoped lang="scss">
  .thing {
    background-color: $secondary;
    padding: 1.563rem 1.125rem;
    margin-bottom: 1.875rem;
    border-bottom: 0.25rem solid $black;

    &:last-child {
      margin-bottom: 0;
    }

    &__wrapper {
      position: relative;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__title {
      cursor: pointer;
    }

    &__delete {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $black;
      height: 1.563rem;
      width: 1.563rem;

      img {
        width: 50%;
      }
    }

    &__separator {
      border-top: 0.125rem dashed $primary;
      background-color: $secondary;
      height: 0.125rem;
      width: 100%;
      margin: 0.625rem 0;
    }

    &__infos {
      display: flex;
      flex-direction: column;
    }

    &__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.625rem;

      &:last-child {
        margin-bottom: 0;
      }

      &-title {
        font-weight: 700;
      }
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.25rem;
    }

    &__preview {
      display: flex;
      align-items: center;

      &-src {
        width: 1.063rem;
        margin-right: 0.625rem;
      }
    }

    &__delete-modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 80%;
      background-color: $secondary;
      padding: 1.875rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &-title {
        text-align: center;
      }

      &-buttons {
        margin-top: 0.938rem;
      }
    }
  }

  @media (min-width: 768px) {
    .thing {
      margin-bottom: 0;
    }
  }
</style>
