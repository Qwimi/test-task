<template>
  <div class="sector-list">
    <table class="sector-list__items">
      <tbody>
        <SectorItem v-for="sector in sectors" :key="sector.id" :sector="sector" @edit="handleEdit"
          @delete="handleDelete" />
      </tbody>
    </table>
    <button class="sector-list__btn" @click="handleAdd">Добавить сектор</button>
  </div>
</template>

<script setup lang="ts">
import SectorItem from './sector-item.vue'
import type { PieSector } from '@/types';

const props = defineProps<{ sectors: PieSector[] }>()

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
@use 'sass:color';

.sector-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;

  &__items {
    border-collapse: separate;
    border-spacing: 0 5px;
  }

  &__btn {
    display: flex;
    padding: 18px 36px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    background: $color-blue;
    border: none;
    color: $color-white;
    font-size: 16px;
    line-height: 24px;
    transition: background $animation-duration-base;
    cursor: pointer;

    &:hover {
      background: color.adjust($color-blue, $lightness: 10%);
    }
  }
}
</style>
