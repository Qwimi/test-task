<template>
  <div class="container">
    <ModalPopup v-model="showModal">
      <form class="sector-form" @submit.prevent="handleUpdate">
        <h3 class="sector-form__title">Добавление сектора</h3>
        <TextInput v-model="sectorForm.label" placeholder="Наименование сектора">
          <template #label> Наименование </template>
        </TextInput>
        <NumberInput
          v-model="sectorForm.value"
          placeholder="Значение сектора(0% до 100%)"
          :min="0"
          :max="100"
        >
          <template #label> Значение </template>
        </NumberInput>
        <ColorInput v-model="sectorForm.backgroundColor" :color-presets="colorPresets" />
        <button class="btn" :disabled="isFormDisabled">
          {{ sectorForm.id ? 'Редактировать сектор' : 'Добавить сектор' }}
        </button>
      </form>
    </ModalPopup>
    <h1 class="chart-title">Круговая диаграмма</h1>
    <div class="chart-container">
      <SectorList
        :sectors="items"
        @add="openModal"
        @edit="openModal"
        @delete="pieStore.deleteItem"
      />

      <PieChart :data="items" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PieChart from '@/components/pie-chart.vue'
import TextInput from '@/components/text-input.vue'
import NumberInput from '@/components/number-input.vue'
import SectorList from '@/components/sector-list.vue'
import type { PieSector } from '@/types'
import { usePieChartStore } from '@/stores/pie-chart.store'
import { storeToRefs } from 'pinia'
import ColorInput from '@/components/color-input.vue'
import ModalPopup from '@/components/modal-popup.vue'

const pieStore = usePieChartStore()

const { items, colorPresets } = storeToRefs(pieStore)

const showModal = ref(false)

const initSector = (): PieSector => ({
  label: '',
  value: null,
  backgroundColor: colorPresets.value[0]!.value,
})

const sectorForm = ref<PieSector>(initSector())
const isFormDisabled = computed(() =>
  Object.values(sectorForm.value).some(
    (field) => field === null || field === undefined || field === '',
  ),
)

const openModal = (sector?: PieSector) => {
  showModal.value = true
  sectorForm.value = sector ? { ...sector } : initSector()
}

const handleUpdate = () => {
  if (sectorForm.value.id) {
    pieStore.editItem(sectorForm.value)
  } else {
    pieStore.addSection(sectorForm.value)
  }
  showModal.value = false
}
</script>

<style lang="scss" scoped>
.chart-title {
  color: $color-dark-gray;
  font-size: 32px;
  font-weight: 600;
  padding: 0 10px 30px 10px;
  border-bottom: 1px solid $color-light-gray;
  margin-bottom: 40px;
}

.chart-container {
  display: grid;
  gap: 20px;

  @media (min-width: $breakpoint-tablet) {
    gap: 64px;
  }

  @media (min-width: $breakpoint-desktop) {
    gap: 90px;
    grid-template-columns: 1fr 1fr;
  }
}

.sector-form {
  display: flex;
  width: calc(100vw - 60px);
  max-width: 350px;
  flex-direction: column;
  gap: 20px;

  &__title {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
