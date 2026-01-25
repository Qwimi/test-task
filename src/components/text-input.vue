<template>
  <FormField>
    <template #label>
      <slot name="label" />
    </template>

    <template #prepend-icon>
      <slot name="prepend-icon" />
    </template>

    <input v-model.trim="model" type="text" class="form-field__input" :placeholder="placeholder" />

    <template #append-icon>
      <slot name="append-icon" />
    </template>
  </FormField>
</template>

<script setup lang="ts">
import FormField from './form-field.vue'

defineProps<{ placeholder?: string }>()
const model = defineModel<string>()
</script>
