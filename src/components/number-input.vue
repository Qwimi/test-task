<template>
  <FormField>
    <template #label>
      <slot name="label" />
    </template>

    <template #prepend-icon>
      <slot name="prepend-icon" />
    </template>

    <input type="number" v-model="inputValue" class="form-field__input" :placeholder="placeholder"
      @input="applyClamp" />

    <template #append-icon>
      <slot name="append-icon" />
    </template>
  </FormField>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FormField from './form-field.vue'

const props = defineProps<{
  placeholder?: string
  min?: number
  max?: number
}>()

const inputValue = ref('')

const model = defineModel<number | null>()

watch(
  model,
  (val) => {
    inputValue.value = val === null ? '' : String(val)
  },
  { immediate: true }
)

function applyClamp() {
  if (inputValue.value === '') {
    model.value = null
    return
  }

  let num = Number(inputValue.value)
  if (isNaN(num)) return

  if (props.min !== undefined && num < props.min) num = props.min
  if (props.max !== undefined && num > props.max) num = props.max

  model.value = num
  inputValue.value = String(num)
}
</script>
