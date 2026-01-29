<template>
  <FormField>
    <template #label>
      <slot name="label" />
    </template>

    <template #prepend-icon>
      <slot name="prepend-icon" />
    </template>

    <input
      type="text"
      inputmode="decimal"
      class="form-field__input"
      :value="model"
      :placeholder="placeholder"
      @input="validateInput"
    />

    <template #append-icon>
      <slot name="append-icon" />
    </template>
  </FormField>
</template>

<script setup lang="ts">
import FormField from './form-field.vue'

const props = defineProps<{
  placeholder?: string
  min?: number
  max?: number
}>()

const model = defineModel<number | null>()
const NUMBER_REGEX = /^-?\d*(\.\d*)?$/

function validateInput(e: Event) {
  const el = e.target as HTMLInputElement
  const value = el.value

  if (!NUMBER_REGEX.test(value)) {
    el.value = value.slice(0, -1)
    return
  }

  if (value === '' || value === '-') {
    model.value = null
    return
  }

  let num = Number(value)
  if (Number.isNaN(num)) return

  if (props.min !== undefined) num = Math.max(props.min, num)
  if (props.max !== undefined) num = Math.min(props.max, num)

  model.value = num
  el.value = String(num)
}
</script>
