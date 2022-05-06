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
