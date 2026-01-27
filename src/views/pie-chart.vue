<template>
  <div class="container">
    <div class="controls">
      <h1>Управление Pie Chart</h1>
      <TextInput v-model="sectorForm.label" placeholder="Label для нового сектора">
        <template #label>
          Наименование
        </template>
      </TextInput>
      <NumberInput v-model="sectorForm.value" placeholder="Значение(в %) для нового сектора">
        <template #label>
          Значение
        </template>
      </NumberInput>
      <ColorInput v-model="sectorForm.backgroundColor" :color-presets="colorPresets" />
      <button @click="addSector">
        Добавить сектор
      </button>
    </div>

    <div class="chart-container">
      <SectorList :sectors="items" @delete="pieStore.deleteItem" />

      <PieChart :data="items" />
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
import { usePieChartStore } from '@/stores/pie-chart.store'
import { storeToRefs } from 'pinia'
import ColorInput from '@/components/color-input.vue'

const pieStore = usePieChartStore()

const { items, colorPresets } = storeToRefs(pieStore)

const sectorForm = ref<PieSector>({
  label: '',
  value: 0,
  backgroundColor: colorPresets.value[0]!.value
})


const addSector = () => pieStore.addSection(sectorForm.value)
</script>

<style lang="scss" scoped>
.chart-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (min-width: $breakpoint-tablet) {
    gap: 64px;
  }

  @media (min-width: $breakpoint-desktop) {
    gap: 90px;
  }
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
