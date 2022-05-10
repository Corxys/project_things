<template>
  <footer class="footer">
    <router-link class="footer__link" to="/mentions-legales">
      Mentions légales
    </router-link>
    <div class="footer__link">
      © Things 2022
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'FooTerComponent'
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 5rem;
    padding: 0 1.875rem;

    &__link {
      margin-left: 1.25rem;
    }
  }

  @media (min-width: 992px) {
    .footer {
      padding: 0 6.25rem;
    }
  }
</style>
