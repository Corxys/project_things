<template>
  <!-- DASHBOARD -->
  <main class="dashboard">
    <!-- HEADER // START -->
    <section class="dashboard__header">
      <!-- TITLE -->
      <h1 class="dashboard__title">
        Pas mal, vous avez {{ things.length }} Things !
      </h1>
      <!-- SETTINGS -->
      <div class="dashboard__settings">
        <!-- select -->
        <div v-click-outside="clickOutsideSelect" class="dashboard__select-wrapper">
          <div class="dashboard__select" @click="selectIsOpen = !selectIsOpen">
            {{ nameSelect }}
          </div>
          <ul v-if="selectIsOpen" class="dashboard__options">
            <li v-for="option of options" :id="option.id" :key="option.id" class="dashboard__option" @click="handleSelect">
              {{ option.title }}
            </li>
          </ul>
        </div>
        <router-link to="/thing/creer" class="dashboard__add-thing">
          <img class="dashboard__add-thing-src" src="../../assets/images/icon-add-thing.svg" alt="Icône d'un plus pour ajouter une tâche" />
        </router-link>
      </div>
    </section>
    <!-- HEADER // END -->

    <!-- CONTENT // START -->
    <section class="dashboard__content">
      <!-- things of the user -->
      <router-link to="/thing/creer" class="dashboard__card-add-thing">
        <img src="../../assets/images/image-add-thing.png" alt="Image pour ajouter une Thing" />
        Ajouter un document
        <br />
        +
      </router-link>
      <thing v-for="thing of things" :key="thing.id" :thing="thing" />
    </section>
    <!-- CONTENT // END -->
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapMutations } from 'vuex';
  import vClickOutside from 'v-click-outside';

  export default Vue.extend({
    name: 'DashboardPage',
    data() {
      return {
        selectIsOpen: false,
        nameSelect: 'Date d\'achat',
        options: [
          {
            id: 1,
            title: 'Date d\'achat',
          },
          {
            id: 2,
            title: 'Fin de garantie',
          },
          {
            id: 3,
            title: 'Ordre alphabétique >',
          },
          {
            id: 4,
            title: 'Ordre alphabétique <',
          }
        ],
      };
    },
    directives: {
      clickOutside: vClickOutside.directive,
    },
    computed: {
      ...mapState({
        things: state => state.user.things,
      }),
    },
    methods: {
      ...mapMutations('user', ['SORTING_THINGS']),

      /**
       * @name clickOutsideSelect
       */
      clickOutsideSelect() {
        this.selectIsOpen = false;
      },

      /**
       * when the user clicks on the Things sorting drop-down menu
       * @name handleSelect
       * @param event
       */
      handleSelect(event) {
        const selectedOption = this.options.find(option => option.id === parseInt(event.target.id, 10));
        this.nameSelect = selectedOption.title;

        this.selectIsOpen = false;

        this.SORTING_THINGS({ selectedOption: selectedOption.id });
      },
    },
  });
</script>

<style scoped lang="scss">
  // DASHBOARD
  .dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1.875rem;
    margin: 1.875rem 0;

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    &__settings {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: 1.875rem 0;
    }

    &__select {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      width: 200px;
      height: 45px;
      background-color: $secondary;
      padding: 0 18px;

      &-wrapper {
        z-index: 5;
        position: relative;
      }
    }

    &__options {
      position: absolute;
      top: 40px;
      left: 0px;
      right: 0px;
      background-color: $secondary;
      border-bottom: 4px solid $black;
    }

    &__option {
      cursor: pointer;
      padding: 14px 18px;
      transition: background-color 0.2s;

      &:hover {
        background-color: $secondary-hover;
      }
    }

    &__add-thing {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $primary;
      height: 45px;
      width: 45px;

      img {
        width: 13px;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &__card-add-thing {
      display: none;
      border: 2px dashed $primary;
    }
  }

  @media (min-width: 768px) {
    .dashboard {
      &__header {
        flex-direction: row;
        justify-content: space-between;
      }

      &__settings {
        width: auto;
      }

      &__add-thing {
        display: none;
      }

      &__card-add-thing {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        color: $primary;
        font-size: 1.1em;
        font-weight: 700;
        text-align: center;
        padding-bottom: 10px;

        img {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, 0);
          height: 68%;
        }
      }

      &__content {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        column-gap: 30px;
        row-gap: 30px;
      }
    }
  }

  @media (min-width: 992px) {
    .dashboard {
      padding: 0 6.25rem;

      &__content {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      }
    }
  }
</style>

<router>
  {
   path: '/tableau-de-bord'
  }
</router>
