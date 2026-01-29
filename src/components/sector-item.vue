<template>
  <tr class="pie-sector">
    <td class="pie-sector__td pie-sector__label">{{ sector.label }}</td>
    <td class="pie-sector__td">
      <div class="pie-sector__dividor">
        <SvgIcon name="vertical-line" />
      </div>
    </td>
    <td class="pie-sector__td pie-sector__value">{{ sector.value }}%</td>
    <td class="pie-sector__td">
      <div class="pie-sector__dividor">
        <SvgIcon name="vertical-line" />
      </div>
    </td>
    <td class="pie-sector__td">
      <div class="pie-sector__color" :style="{ backgroundColor: sector.backgroundColor }"></div>
    </td>
    <td class="pie-sector__td">
      <div class="pie-sector__controls">
        <button class="pie-sector__button" @click="handleEdit">
          <SvgIcon name="pen" />
        </button>
        <button class="pie-sector__button" @click="handleDelete">
          <SvgIcon name="trash" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { PieSector } from '@/types'
import SvgIcon from './svg-icon.vue'

const props = defineProps<{
  sector: PieSector
}>()

const emit = defineEmits<{
  edit: [PieSector]
  delete: [string]
}>()

const handleEdit = () => emit('edit', props.sector)

const handleDelete = () => emit('delete', props.sector.id)
</script>

<style lang="scss" scoped>
.pie-sector {
  color: $color-dark-gray;
  font-size: 16px;
  line-height: 24px;
  background-color: rgba($color: $color-light-gray, $alpha: 0.2);

  &__td {
    padding-block: 20px;
    vertical-align: middle;

    &:not(:last-child) {
      width: 1%;
    }

    &:first-child {
      padding-left: 18px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    &:last-child {
      padding-inline: 25px 18px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  &__label {
    max-width: 200px;
    white-space: normal;
    overflow-wrap: break-word;
  }

  &__value {
    text-align: center;
  }

  &__dividor {
    height: 16px;
    width: 0;
    margin-inline: 25px;
    color: $color-light-gray;
  }

  &__color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  &__controls {
    display: flex;
    gap: 20px;
    justify-content: flex-end;
  }

  &__button {
    width: 24px;
    height: 24px;
    cursor: pointer;
    border-radius: 6px;
    outline: none;
    border: none;
    background: none;
    color: $color-gray;
    transition: color $animation-duration-base;

    &:hover {
      color: $color-dark-gray;
    }
  }
}
</style>
