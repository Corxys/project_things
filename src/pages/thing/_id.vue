<template>
  <!-- THING DETAIL -->
  <main class="thing-detail">
    <!-- HEADER // START -->
    <section class="thing-detail__header">
      <!-- TITLE -->
      <h1 class="thing-detail__title">
        {{ thing.title }}
      </h1>
      <div class="thing-detail__buttons">
        <!-- DELETE BUTTON -->
        <button class="thing-detail__delete" @click="HANDLE_DELETE_MODAL({ thingId: thing.id, active: !thing.onDelete })">
          <img class="thing-detail__delete-src" src="@/assets/images/icon-delete-thing.svg" alt="Suppression de la Thing" />
        </button>
        <!-- EDIT ICON -->
        <router-link :to="`/thing/modifier/${ thing.id }`" class="thing-detail__edit-thing">
          <img class="thing-detail__edit-thing-ico" src="../../assets/images/icon-edit-thing.svg" alt="Modification d'une Thing" />
        </router-link>
      </div>
    </section>
    <!-- HEADER // END -->

    <!-- CONTENT // START -->
    <section class="thing-detail__content">
      <!-- FILES // START -->
      <div class="thing-detail__files">
        <div class="thing-detail__files-wrapper">
          <div class="thing-detail__files-preview" />
          <div class="thing-detail__files-sources">
            <div v-for="attachment of thing.attachments" :key="attachment.id" :id="attachment.id" :class="attachment.onActive === false ? 'thing-detail__file' : 'thing-detail__file active'" @click="changeActiveFile" />
          </div>
        </div>
        <div class="thing-detail__files-infos">
          <!-- NAME ACTIVE FILE -->
          <h2 class="thing-detail__files-subtitle">
            <img class="thing-detail__files-preview-icon" src="../../assets/images/icon-preview.svg" alt="Prévisualisation" />
            Nom et format du fichier
          </h2>
          <div v-if="activeFile" class="thing-detail__file-name">
            {{ activeFile.originalFilename }}
          </div>
        </div>
      </div>
      <!-- FILES // END -->

      <!-- DATA // START -->
      <div class="thing-detail__data">
        <!-- DESCRIPTION -->
        <p class="thing-detail__description">
          {{ thing.description }}
        </p>
        <div class="thing-detail__dates">
          <!-- PURCHASE DATE -->
          <div class="thing-detail__date">
            <h2 class="thing-detail__date-subtitle">
              > Date d'achat
            </h2>
            <div class="thing-detail__date-value">
              {{ new Date(thing.purchaseDate).toLocaleDateString() }}
            </div>
          </div>
          <!-- WARRANTY END DATE -->
          <div v-if="thing.warrantyEndDate" class="thing-detail__date">
            <h2 class="thing-detail__date-subtitle">
              > Fin de garantie
            </h2>
            <div class="thing-detail__date-value">
              {{ new Date(thing.warrantyEndDate).toLocaleDateString() }}
            </div>
          </div>
        </div>
      </div>
      <!-- DATA // END -->
    </section>
    <!-- CONTENT // END -->
    <div v-if="thing.onDelete" class="thing-detail__delete-modal">
      <h2 class="thing-detail__delete-modal-title">
        Souhaitez-vous vraiment supprimer votre Thing ?
      </h2>
      <div class="thing-detail__delete-modal-buttons">
        <button class="thing__delete-modal-button button" @click="sendDeleteRequest({ thingId: thing.id })">
          Oui
        </button>
        <button class="thing-detail__delete-modal-button button button--cancel" @click="HANDLE_DELETE_MODAL({ active: false })">
          Non
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

  export default {
    name: 'ThingPage',
    data() {
      return {
        activeFile: null,
      };
    },
    computed: {
      ...mapState({
        thing: state => state.thing,
      }),
    },
    methods: {
      ...mapMutations('thing', ['CHANGE_ACTIVE_FILE']),
      ...mapMutations('thing', ['HANDLE_DELETE_MODAL']),
      ...mapActions('thing', ['sendDeleteRequest']),

      /**
       * when the user clicks on the thumbnail of a file, we change the active file
       * @method
       * @name changeActiveFile
       * @param {Object} event - the clicked DOM node
       */
      changeActiveFile(event) {
        const attachmentId = parseInt(event.target.id, 10);

        this.CHANGE_ACTIVE_FILE({ id: attachmentId });

        this.thing.attachments.forEach((attachment) => {
          if (attachment.onActive === true) {
            this.activeFile = attachment;
          }
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  .thing-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1.875rem;
    margin: 1.875rem 0;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      min-height: 45px;
    }

    &__buttons {
      display: flex;
      align-items: center;
    }

    &__delete {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $black;
      min-height: 45px;
      min-width: 45px;

      img {
        height: 20px;
      }
    }

    &__edit-thing {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 45px;
      min-width: 45px;
      background-color: $primary;
      margin-left: 1.875rem;
    }

    /**
      * CONTENT => files
     */
    &__content {
      width: 100%;
    }

    &__files {
      margin: 1.875rem 0;

      &-preview {
        display: none;
      }

      &-sources {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &-infos {
        margin-top: 0.938rem;
      }

      &-subtitle {
        margin-bottom: 0.313rem;
      }
    }

    &__file {
      cursor: pointer;
      overflow: hidden;
      height: 86px;
      width: 86px;
      min-height: 86px;
      min-width: 86px;
      border: 1px solid $black;

      &.active {
        border: 1px solid $primary;
      }
    }

    &__description {
      margin: 1.875rem 0;
      padding: 1.25rem 0;
      border: dashed $primary;
      border-width: 2px 0;
    }

    &__date {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.938rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__delete-modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 330px;
      height: 175px;
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
    .thing-detail {
      width: 100%;

      &__content {
        display: flex;
        flex-direction: row-reverse;
      }

      &__files, &__data {
        width: 50%;
        margin: 1.875rem 0;
      }

      &__files {
        margin-left: 0.938rem;
      }

      &__data {
        margin-right: 0.938rem;
      }

      &__description {
        margin-top: 0;
      }

      &__files-preview {
        display: block;
        border: 1px solid $black;
        width: 100%;
        height: 100%;
      }

      &__files-wrapper {
        display: flex;
        height: 450px;
      }

      &__files-sources {
        width: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        overflow: hidden;
        padding-left: 1.875rem;
        padding-right: 10px;
      }

      &__file {
        margin-right: 0;
        margin-bottom: 0.938rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  @media (min-width: 992px) {
    .thing-detail {
      padding: 0 6.25rem;
    }
  }

  @media (min-width: 1200px) {
    .thing-detail {
      max-width: 80%;
      margin: 1.875rem auto;
    }
  }
</style>

<router>
  {
    path: '/thing/:id?',
  }
</router>
