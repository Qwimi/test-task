<template>
  <label class="form-field">
    <p v-show="$slots.label" class="form-field__label">
      <slot name="label" />
    </p>

    <div class="form-field__input-row">
      <span class="form-field__icon" v-show="slots['prepend-icon']">
        <slot name="prepend-icon" />
      </span>

      <slot />

      <span class="form-field__icon" v-show="slots['append-icon']">
        <slot name="append-icon" />
      </span>
    </div>
  </label>
</template>

<script setup lang="ts">
const slots = defineSlots<{
  label: Node[]
  default: Node[]
  'prepend-icon': Node[]
  'append-icon': Node[]
}>()
</script>

<style lang="scss" scoped>
.form-field {
  @include input-styles;
}
</style>
