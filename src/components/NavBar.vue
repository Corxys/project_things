<template>
  <!-- NAVBAR // START -->
  <nav class="navbar">
    <!-- HOME LINK -->
    <router-link :to="isLogged ? '/tableau-de-bord' : '/'">
      <div class="navbar__logo">
        Things.
      </div>
    </router-link>
    <!-- LINKS : isLogged === false // START -->
    <div v-if="!isLogged" class="navbar__links">
      <router-link to="/" class="navbar__link">
        Connexion
      </router-link>
      <router-link to="/inscription" class="navbar__link">
        Inscription
      </router-link>
    </div>
    <!-- LINKS : isLogged === false // END -->

    <div v-else class="navbar__links">
      <!-- PROFILE PICTURE : isLogged === true -->
      <button class="navbar__user-profile" @click="modalIsOpen = !modalIsOpen">
        <img class="navbar__user-profile-src" :src="`${$config.apiURL + '/' + profilePicture}`" alt="Photo de profil de l'utilisateur" />
      </button>
      <!-- MODAL -->
      <div v-if="modalIsOpen" v-click-outside="clickOutsideMenu" class="navbar__modal">
        <!-- LINKS : modalIsOpen === true // START -->
        <div class="navbar__modal-link" @click="modalIsOpen = !modalIsOpen">
          <router-link to="/profil">
            Voir le profil
          </router-link>
        </div>
        <div class="navbar__modal-link" @click="handleDisconnect">
          Se déconnecter
        </div>
        <!-- LINKS : modalIsOpen === true // END -->
      </div>
    </div>
  </nav>
<!-- NAVBAR // END -->
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapActions } from 'vuex';
  import vClickOutside from 'v-click-outside';

  export default Vue.extend({
    name: 'NavBarComponent',
    directives: {
      clickOutside: vClickOutside.directive,
    },
    data() {
      return {
        modalIsOpen: false,
      };
    },
    computed: {
      ...mapState({
        isLogged: state => state.user.isLogged,
        profilePicture: state => state.user.profilePicture,
      }),
    },
    methods: {
      ...mapActions('auth', ['sendLogoutRequest']),

      clickOutsideMenu() {
        this.modalIsOpen = false;
      },
      handleDisconnect() {
          this.clickOutsideMenu();
          this.sendLogoutRequest();
      },
    },
  });
</script>

<style scoped lang="scss">
  // NAVBAR
  .navbar {
    z-index: 5;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $primary;
    color: $white;
    height: 5rem;
    padding: 0 1.875rem;

    &__link {
      margin-left: 1.25rem;
    }

    // MODAL
    &__modal {
      z-index: 5;
      position: absolute;
      top: 5rem;
      right: 1.875rem;
      display: flex;
      flex-direction: column;
      padding: 0.625rem 0.625rem;
      color: $black;
      background-color: $secondary;
      border-bottom: 3px solid $black;

      &-link {
        cursor: pointer;
        margin: 0.625rem;
      }
    }

    // PROFILE PICTURE
    &__user-profile {
      overflow: hidden;
      height: 2.188rem;
      width: 2.188rem;
      border-radius: 3.125rem;
      border: 2px solid $white;

      img {
        object-fit: cover;
        object-position: center;
        height: 100%;
        width: 100%;
      }
    }
  }

  @media (min-width: 992px) {
    .navbar {
      padding: 0 6.25rem;
    }
  }
</style>
