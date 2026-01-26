<template>
  <div class="pie-page-container">
    <div class="controls">
      <h1>Управление Pie Chart</h1>
      <TextInput v-model="textInput" placeholder="Label для нового сектора" />
      <NumberInput v-model="numberInput" placeholder="Значение" />
      <button @click="addPieItem(
        textInput,
        numberInput,
        '#' + Math.floor(Math.random() * 16777215).toString(16)
      )">
        Добавить сектор
      </button>
      <SectorList v-model:sectors="pieData" />
    </div>


    <div class="chart-container">
      <PieChart :data="pieData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PieChart from '@/components/pie-chart.vue'
import TextInput from '@/components/text-input.vue'
import NumberInput from '@/components/number-input.vue'
import SectorList from '@/components/sector-list.vue'
import type { PieSector } from '@/types'

const pieData = ref<PieSector[]>([
  { id: '1', label: 'Red', value: 25, backgroundColor: '#FF6384' },
  { id: '2', label: 'Blue', value: 25, backgroundColor: '#36A2EB' },
  { id: '3', label: 'Yellow', value: 25, backgroundColor: '#FFCE56' }
])

const textInput = ref('')
const numberInput = ref(25)

const addPieItem = (label: string, value: number, backgroundColor: string) => {
  const id = String(pieData.value.length)
  pieData.value = [
    ...pieData.value,
    { id, label, value, backgroundColor }
  ]
}
</script>

<style scoped>
.pie-page-container {
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  flex: 1;
}

.chart-container {
  flex: 1;
}
</style>
