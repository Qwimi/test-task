<template>
  <div class="sector-list">
    <table class="sector-list__items">
      <tbody>
        <SectorItem
          v-for="sector in sectors"
          :key="sector.id"
          :sector="sector"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </tbody>
    </table>
    <button class="btn" @click="handleAdd">Добавить сектор</button>
  </div>
</template>

<script setup lang="ts">
import SectorItem from './sector-item.vue'
import type { PieSector } from '@/types'

defineProps<{ sectors: PieSector[] }>()

const emit = defineEmits<{
  edit: [PieSector]
  delete: [string]
  add: []
}>()

const handleEdit = (sector: PieSector) => emit('edit', sector)

const handleDelete = (id: string) => emit('delete', id)

const handleAdd = () => emit('add')
</script>

<style lang="scss" scoped>
.sector-list {
  display: flex;
  flex-direction: column;
  gap: 30px;

  &__items {
    border-collapse: separate;
    border-spacing: 0 5px;
  }
}
</style>
