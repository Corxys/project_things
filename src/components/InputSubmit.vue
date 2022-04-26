<template>
  <input :form="formName" class="submit-button" type="submit" :value="value" />
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'InputSubmitComponent',
    props: {
      formName: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  });
</script>

<style scoped lang="scss">
  .submit-button {
    background-color: $primary;
    color: $white;
    font-weight: 700;
    padding: 15px 30px;
    margin-top: 30px;
    text-align: center;
    align-self: center;
  }
</style>
