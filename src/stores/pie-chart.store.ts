import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { ColorPreset, PieSector } from '@/types'
import { ref } from 'vue'

export const usePieChartStore = defineStore('pie-chart', () => {
  const items = useLocalStorage<PieSector[]>('pie-chart-items', [])
  const colorPresets = ref<ColorPreset[]>([
    {
      value: '#7a63ff',
      label: 'Фиолетовый',
    },
    {
      value: '#1b84ff',
      label: 'Синий',
    },
    {
      value: '#12ce66',
      label: 'Зеленый',
    },
    {
      value: '#ffcd56',
      label: 'Желтый',
    },
    {
      value: '#ff4949',
      label: 'Красный',
    },
  ])

  function addSection(sectionData: Omit<PieSector, 'id'>) {
    const id = crypto.randomUUID()
    items.value.push({ id, ...sectionData })
  }

  function editItem(sectionData: PieSector) {
    const idx = items.value.findIndex((i) => i.id === sectionData.id)
    if (idx !== -1) items.value[idx] = sectionData
  }

  function deleteItem(id: string) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  return { items, colorPresets, addSection, editItem, deleteItem }
})
