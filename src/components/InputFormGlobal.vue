<template>
  <div class="input__group">
    <input :id="id" class="input__field" :name="name" :type="type" :placeholder="label" :value="value" @change="checkInput({ value: $event.target.value, type: name, action: 'change' })"/>
    <label class="input__label">{{ label }}</label>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: 'InputFormGlobal',
    props: ['id', 'name', 'type', 'label', 'value'],
    methods: {
      ...mapActions('auth', ['checkInput']),
    },
  };
</script>
