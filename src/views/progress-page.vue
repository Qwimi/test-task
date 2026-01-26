<script setup lang="ts">
import { ref } from 'vue';
import type { Range } from '@/types';
import NumberInput from '@/components/number-input.vue';
import ProgressCircle from '@/components/progress-circle.vue';

const progressValue = ref<Range<0, 101>>(12)
const status = ref<"progress" | "success" | "warning" | "error">('progress')
</script>

<template>
  <div class="container">
    <router-link to="pie-chart">
      pie chart page
    </router-link>
    <NumberInput :min="1" :max="100" v-model="progressValue" placeholder="min 1 max 100">
      <template #label>
        Отображаемый прогресс
      </template>
    </NumberInput>
    <select v-model="status">
      <option value="progress">progress</option>
      <option value="success">success</option>
      <option value="warning">warning</option>
      <option value="error">error</option>
    </select>
    <ProgressCircle :value="progressValue" :status="status" />
    <ProgressCircle :value="progressValue" :status="status" type="dashboard" />
  </div>
</template>

<style>
.container {
  max-width: 1200px;
  margin: 120px auto;
  padding-inline: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
