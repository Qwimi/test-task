<script setup lang="ts">
import { ref } from 'vue';
import ProgressCircle from './components/progress-circle.vue';
import type { Range } from '@/types';

const progressValue = ref<Range<0, 101>>(0)
const status = ref<"progress" | "success" | "warning" | "error">('progress')
</script>

<template>
  <div class="container">
    <input type="number" v-model="progressValue" min="0" max="100" />
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
}
</style>
