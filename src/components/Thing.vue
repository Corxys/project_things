<template>
  <div class="thing">
    <h2 class="thing__title">
      {{ thing.title }}
    </h2>
    <hr class="thing__separator" />
    <div class="thing__infos">
      <div class="thing__info">
        <div class="thing__info-title">
          > Date d'achat
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
      <router-link :to="`/thing/${thing.id}`">
        <button class="button" @click="handleGetThing">
          Détails
        </button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapMutations } from 'vuex';

  export default Vue.extend({
    name: 'ThingComponent',
    props: {
      thing: Object,
    },
    data() {
      return {
        selectIsOpen: false,
      };
    },
    methods: {
      ...mapMutations('thing', ['GET_THING_BY_ID']),

      /**
       * @name handleGetThing
       */
      handleGetThing() {
        this.GET_THING_BY_ID(this.thing);
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

    &__title {
      font-size: 1rem;
      font-weight: 700;
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
  }

  @media (min-width: 768px) {
    .thing {
      margin-bottom: 0;
    }
  }
</style>
