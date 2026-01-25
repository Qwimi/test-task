<script setup lang="ts">
import { ref } from 'vue';
import ProgressCircle from './components/progress-circle.vue';
import type { Range } from '@/types';
import ModalPopup from './components/modal-popup.vue';
import TextInput from './components/text-input.vue';
import NumberInput from './components/number-input.vue';

const progressValue = ref<Range<0, 101>>(12)
const status = ref<"progress" | "success" | "warning" | "error">('progress')
const openPopup = ref(false)

const textInput = ref('')
const numberInput = ref(12)
</script>

<template>
  <ModalPopup v-model="openPopup" v-slot="{ closeModal }">
    <p style="max-width: 500px;">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nulla voluptatibus omnis suscipit est nemo repellat
      harum aliquid earum voluptate maiores mollitia quo labore, voluptates culpa reiciendis qui ut sapiente!
    </p>
    <ProgressCircle :value="progressValue" :status="status" type="dashboard" />
    <button @click="closeModal" style="width: 100%; padding: 20px;">close modal</button>
  </ModalPopup>
  <div class="container">
    <div>
      <button @click="openPopup = true">
        open popup
      </button>
    </div>
    <TextInput v-model="textInput" placeholder="text placeholder">
      <template #label>
        text
      </template>
      <template #append-icon>
        >
      </template>
      <template #prepend-icon>
        #
      </template>
    </TextInput>
    <NumberInput :min="1" :max="100" v-model="numberInput" placeholder="min 1 max 100">
      <template #label>
        number
      </template>
    </NumberInput>
    <div>
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
