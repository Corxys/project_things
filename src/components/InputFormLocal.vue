<template>
  <div class="input__group">
    <input :id="id" class="input__field" :name="name" :type="type" :placeholder="label" :value="value" @input="$emit('input', $event.target.value)" />
    <label class="input__label">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'InputFormLocalComponent',
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    label: {
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
  .input {
    &__group {
      align-self: center;
      position: relative;
      padding-top: 0.938rem;
      width: 100%;
      font-size: 0.938rem;
    }

    &__field {
      position: relative;
      width: 100%;
      border: 0;
      border-bottom: 1px solid $black;
      outline: 0;
      color: $black;
      background: transparent;
      padding: 0.438rem 0.625rem;
      transition: border-color 0.2s, background-color 0.2s;

      &:not(:placeholder-shown) {
        ~ .input__label {
          font-weight: 700;
          color: $primary;
        }
      }

      &::placeholder {
        color: transparent;
      }

      &:placeholder-shown ~ .input__label {
        cursor: text;
        top: 1.25rem;
      }

      &:focus {
        border-bottom: 1px solid $primary;
        background-color: $secondary;

        ~ .input__label {
          position: absolute;
          top: -0.625rem;
          display: block;
          transition: 0.2s;
          color: $primary;
          font-weight: 700;
        }
      }
    }

    &__label {
      position: absolute;
      top: -0.625rem;
      display: block;
      transition: 0.2s;
      color: $black;
    }
  }

  @media (min-width: 992px) {
    .login {
      &__content {
        display: flex;
        margin: 2.813rem auto 0 auto;
      }

      &__form {
        min-width: 275px;
        margin-left: 80px;
      }

      &__header {
        &-img {
          height: 100%;
          margin-bottom: 0;
        }
      }
    }

    .mobile {
      display: none;
    }

    .desktop {
      display: block;
    }
  }
</style>
