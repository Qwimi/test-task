import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { PieSector } from '@/types'

export const usePieChartStore = defineStore('pie-chart', () => {
    const items = useLocalStorage<PieSector[]>('pie-chart-items', [])

    function addSection(sectionData: Omit<PieSector, 'id'>) {
        const id = crypto.randomUUID()
        items.value.push({ id, ...sectionData })
    }

    function editItem(sectionData: PieSector) {
        const idx = items.value.findIndex(i => i.id === sectionData.id)
        if (idx !== -1) items.value[idx] = sectionData
    }

    function deleteItem(id: string) {
        items.value = items.value.filter(i => i.id !== id)
    }

    return { items, addSection, editItem, deleteItem }
})
