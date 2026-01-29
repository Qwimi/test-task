<template>
  <span class="color-option">
    <span class="color-option__label">
      {{ option.label }}
    </span>
    <div class="color-option__color" :style="{ background: option.value }" />
  </span>
</template>

<script setup lang="ts">
import type { Option } from '@/types'

defineProps<{ option: Option }>()
</script>

<style lang="scss" scoped>
.color-option {
  display: flex;
  gap: 5px;

  &__label {
    flex: 1;
  }

  &__color {
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
}
</style>