<script setup lang="ts">
import { ref } from 'vue'
import type { Range } from '@/types'

import NumberInput from '@/components/number-input.vue'
import ProgressCircle from '@/components/progress-circle.vue'
import SelectField from '@/components/select-field.vue'

const progressValue = ref<Range<0, 101>>(25)
const sizeValue = ref(150)
const strokeValue = ref(12)
const status = ref<'progress' | 'success' | 'warning' | 'error'>('progress')

const statusOptions = [
  { label: 'В процессе(progress)', value: 'progress' },
  { label: 'Успешно(success)', value: 'success' },
  { label: 'Предупреждение(warning)', value: 'warning' },
  { label: 'Ошибка(error)', value: 'error' },
]
</script>

<template>
  <div class="container demo">
    <h1 class="demo__title">Прогресс бар</h1>

    <div class="demo__controls">
      <NumberInput v-model="progressValue" :min="0" :max="100" placeholder="0–100">
        <template #label> Значение прогресса (%) </template>
      </NumberInput>

      <SelectField v-model="status" :options="statusOptions">
        <template #label> Статус </template>
      </SelectField>

      <NumberInput v-model="sizeValue" :min="1" placeholder="от 1">
        <template #label> Размер прогресс бара </template>
      </NumberInput>

      <NumberInput v-model="strokeValue" :min="1" placeholder="от 1">
        <template #label> Ширина границ </template>
      </NumberInput>
    </div>

    <div class="demo__preview">
      <div class="demo__item">
        <span class="demo__label">Default</span>
        <ProgressCircle
          :value="progressValue"
          :size="{ height: sizeValue, strokeWidth: strokeValue }"
          :status="status"
        />
      </div>

      <div class="demo__item">
        <span class="demo__label">Dashboard</span>
        <ProgressCircle
          :value="progressValue"
          :size="{ height: sizeValue, strokeWidth: strokeValue }"
          :status="status"
          type="dashboard"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &__title {
    font-size: 24px;
    font-weight: 600;
  }

  &__controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    align-items: end;
  }

  &__preview {
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  &__label {
    font-size: 12px;
    color: $color-gray;
  }
}
</style>
