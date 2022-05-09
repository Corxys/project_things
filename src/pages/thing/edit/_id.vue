<template>
  <!-- THING - EDIT -->
  <main class="thing-edit">
    <!-- HEADER // START -->
    <section class="thing-edit__header">
      <!-- TITLE -->
      <input id="title" class="thing-edit__title-input" name="title" type="text" v-model="data.title"/>
      <!-- CANCEL BUTTON -->
      <router-link :to="`/thing/${data.id}`" class="thing-edit__cancel-edit-thing">
        <img class="thing-edit__edit-thing-cancel-ico" src="@/assets/images/icon-cancel-edit-thing.svg" alt="Annulation de la modification" />
      </router-link>
      <!-- SAVE BUTTON -->
      <button class="thing-edit__save-edit-thing" @click="handleEditThing">
        <img class="thing-edit__edit-thing-cancel-ico" src="@/assets/images/icon-save-edit-thing.svg" alt="Annulation de la modification" />
      </button>
    </section>

    <!-- CONTENT // START -->
    <section class="thing-edit__content">
      <!-- FILES // START -->
      <div class="thing-edit__files">
        <div class="thing-edit__files-wrapper">
          <div class="thing-edit__files-preview">
            {{ activeFile }}
          </div>
          <div class="thing-edit__files-prout">
            <div class="thing-edit__add-thing-file-wrapper">
              <label class="thing-edit__add-thing-file-label">
            <span class="thing-edit__add-thing-file-browse">
              +
            </span>
                <input class="thing-edit__add-thing-file-button" type="file" @change="addThingFile" />
              </label>
            </div>
            <div class="thing-edit__files-sources">
              <div v-for="(attachment, index) of data.attachments" :key="attachment.id" class="thing-edit__file-wrapper">
                <div :id="`file-${index}`" :class="attachment.onActive === false ? 'thing-edit__file' : 'thing-edit__file active'"  @click="changeActiveFile">
                  {{ attachment }}
                </div>
                <div :id="`delete-${index}`" class="thing-edit__delete-thing" @click="deleteThingFile">
                  <img class="thing-edit__delete-thing-ico" src="../../../assets/images/icon-delete-thing.svg" alt="Icône pour supprimer la photo de profil utilisateur" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="thing-edit__files-infos">
          <!-- NAME ACTIVE FILE -->
          <h2 class="thing-edit__files-subtitle">
            <img class="thing-edit__files-preview-icon" src="../../../assets/images/icon-preview.svg" alt="Prévisualisation" />
            Nom et format du fichier
          </h2>
          <div v-if="activeFile" class="thing-edit__files-path">
            {{ activeFile.originalFilename }}
          </div>
        </div>
      </div>
      <!-- FILES // END -->

      <!-- DATA // START -->
      <div class="thing-edit__data">
        <!-- DESCRIPTION -->
        <p class="thing-edit__description">
          <textarea id="description" class="thing-edit__description-input" name="description" v-model="data.description"></textarea>
        </p>
        <div class="thing-edit__dates">
          <div class="thing-edit__date">
            <h2 class="thing-edit__date-subtitle">
              > Date d'achat
            </h2>
            <!-- PURCHASE DATE -->
            <div class="thing-edit__date-value">
              <input id="purchase-date" class="thing-edit__date-input" name="purchase-date" type="date" v-model="data.purchaseDate"/>
            </div>
          </div>
          <div v-if="data.warrantyEndDate" class="thing-edit__date">
            <h2 class="thing-edit__date-subtitle">
              > Fin de garantie (facultatif)
            </h2>
            <!-- WARRANTY END DATE -->
            <div class="thing-edit__date-value">
              <input id="warranty-end-date" class="thing-edit__date-input" name="warranty-end-date" type="date" v-model="data.warrantyEndDate"/>
            </div>
          </div>
        </div>
      </div>
      <!-- DATA // END -->

      <!-- ERROR MESSAGE -->
      <div class="thing-edit__error-message error-message">
        {{ errorMessage }}
      </div>
    </section>
    <!-- CONTENT // END -->

  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { cloneDeep } from 'lodash-es';

export default {
  name: 'ThingEditPage',
  data() {
    return {
      activeFile: null,
      data: {},
      errorMessage: '',
      filesToDelete: [],
    };
  },
  computed: {
    ...mapState({
      thing: state => state.thing,
    }),
  },
  created() {
    this.data = cloneDeep(this.thing);

    this.data.attachments.forEach((attachment) => {
      if (attachment.onActive === true) {
        this.activeFile = attachment;
      }
    })

    const splitPurchaseDate = new Date(this.thing.purchaseDate).toLocaleDateString().split('/');
    const splitWarrantyEndDate = new Date(this.thing.warrantyEndDate).toLocaleDateString().split('/');

    this.data.purchaseDate = splitPurchaseDate[2] + '-' + splitPurchaseDate[1] + '-' + splitPurchaseDate[0];
    this.data.warrantyEndDate = splitWarrantyEndDate[2] + '-' + splitWarrantyEndDate[1] + '-' + splitWarrantyEndDate[0];
  },
  methods: {
    ...mapActions('thing', ['sendEditRequest']),

    /**
     * when the user clicks on the + button, he can add a new file
     * @method
     * @name addThingFile
     * @param event
     */
    addThingFile(event) {
      const onActive = this.data.attachments.length === 0;

      this.data.attachments.push({ onActive, originalFilename: event.target.files[0].name, data: event.target.files[0] });

      this.data.attachments.forEach((attachment) => {
        if (attachment.onActive === true) {
          this.activeFile = attachment;
        }
      })

      event.target.value = '';
    },
    /**
     * when the user clicks on a file, we change the file in the preview
     * @method
     * @name changeActiveFile
     * @param event
     */
    changeActiveFile(event) {
      const attachmentId = parseInt(event.target.id[5], 10);

      this.data.attachments.forEach((attachment, index) => {
        if (attachment.onActive === true) {
          attachment.onActive = false;
        } else if (index === attachmentId) {
          attachment.onActive = true;
          this.activeFile = attachment;
        }
      });
    },
    /**
     * when the user click on the trash of a file
     * @method
     * @name deleteThingFile
     * @param event
     */
    deleteThingFile(event) {
      let thingFileIndex;

      if (event.target.classList.value === 'thing-edit__delete-thing-ico') {
        thingFileIndex = parseInt(event.target.closest('.thing-edit__delete-thing').id[7], 10);
      } else {
        thingFileIndex = parseInt(event.target.id[7], 10);
      }

      this.data.attachments.forEach((attachment, index) => {
        if (index === thingFileIndex) {
          if (attachment.id) {
            this.filesToDelete.push(attachment.id);
          }
        }
      })

      this.data.attachments.splice(thingFileIndex, 1);
    },
    /**
     * when the user clicks on the save button, we check if some inputs are empty
     * @method
     * @name handleEditThing
     */
    handleEditThing() {
      if (this.data.title === '') {
        this.errorMessage = 'Titre obligatoire'
      } else if (this.data.purchaseDate === '') {
        this.errorMessage = 'Date d\'achat obligatoire.'
      } else if (this.data.attachments.length === 0) {
        this.errorMessage = 'Une pièce jointe obligatoire.'
      }

      this.sendEditRequest({ ...this.data, attachmentsToDelete: this.filesToDelete })
    },
  },
};
</script>

<style lang="scss" scoped>
.thing-edit {
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

  &__title-input {
    font-size: 1.375rem;
    border-bottom: 0.188rem solid $black;
    outline: 0;
    color: $black;
    background: transparent;
    padding: 0.438rem 0.625rem;
    width: 100%;
    transition: border-color 0.2s, background-color 0.2s;

    &:focus {
      border-color: $primary;
      background-color: $secondary;
    }
  }

  &__cancel-edit-thing, &__save-edit-thing {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 45px;
    min-height: 45px;
    margin-left: 1.875rem;
    color: $white;
  }

  &__cancel-edit-thing {
    background-color: $black;
  }

  &__save-edit-thing {
    background-color: $primary;
  }

  &__content {
    width: 100%;
  }

  input[type=file] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  &__files {
    margin: 1.875rem 0;

    &-wrapper {
      display: flex;
      flex-direction: column-reverse;
    }

    &-preview {
      display: none;
    }

    &-prout {
      display: flex;
      flex-direction: column;
      margin-left: 0.938rem;
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

  &__add-thing-file-label {
    width: 100%;
    height: 56px;
    background-color: $secondary;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
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

    &-wrapper {
      position: relative;
    }
  }

  &__delete-thing {
    cursor: pointer;
    z-index: 1;
    position: absolute;
    top: -11px;
    right: -11px;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 25px;
    height: 25px;
    background-color: $black;

    &-ico {
      width: 55%;
    }
  }

  &__description {
    margin: 1.875rem 0;
    padding: 1.25rem 0;
    border: dashed $primary;
    border-width: 2px 0;

    &-input {
      width: 100%;
      border-bottom: 1px solid $black;
      background-color: transparent;
      transition: border-color 0.2s, background-color 0.2s;

      &:focus {
        border-bottom: 1px solid $primary;
        background-color: $secondary;
      }
    }
  }

  &__date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.938rem;

    &:last-child {
      margin-bottom: 0;
    }

    &-input {
      border-bottom: 1px solid $black;
      background-color: transparent;
      transition: border-color 0.2s, background-color 0.2s;

      &:focus {
        border-bottom: 1px solid $primary;
        background-color: $secondary;
      }
    }
  }
}

@media (min-width: 768px) {
  .thing-edit {
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
      display: flex;
      flex-direction: column;
      margin-left: 0.938rem;

      &-wrapper {
        display: flex;
        flex-direction: row;
      }

      &-preview {
        display: block;
        border: 1px solid $black;
        width: 100%;
        height: 100%;
      }

      &-sources {
        display: flex;
        flex-direction: column;
      }
    }

    &__data {
      margin-right: 0.938rem;
    }

    &__add-thing-file-label {
      margin-right: 0;
      margin-bottom: 1.25rem;
    }

    &__file-wrapper {
      margin-right: 0;
      margin-bottom: 1.25rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

@media (min-width: 992px) {
  .thing-edit {
    padding: 0 6.25rem;
  }
}

@media (min-width: 1200px) {
  .thing-edit {
    max-width: 80%;
    margin: 1.875rem auto;
  }
}
</style>

<router>
  {
    path: '/thing/modifier/:id?',
  }
</router>
