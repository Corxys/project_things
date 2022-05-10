<template>
  <div class="things">
    <nav-bar />
    <nuxt />
    <foo-ter />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'DefaultLayout',
    beforeMount() {
      const vh = window.innerHeight / 100;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      window.addEventListener('resize', () => {
        const vh = window.innerHeight / 100;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      })
    },
  });
</script>

<style lang="scss">
  :root {
    --vh: 1vh;
  }

  .login, .error {
    min-height: calc(var(--vh, 1vh) * 100 - 10rem - 60px);
  }

  .registration__content {
    min-height: calc(var(--vh, 1vh) * 100 - 10rem - 60px - 66px);
  }

  @media (min-width: 768px) {
    .registration__content {
      min-height: calc(var(--vh, 1vh) * 100 - 10rem);
    }
  }
</style>
