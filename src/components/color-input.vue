<template>
  <div class="color-picker" :style="{ '--preview-color': color }">
    <SelectField class="color-picker__options" :options="colorList" v-model="color">
      <template #label> Цвет </template>
    </SelectField>
    <ColorPicker v-model:pureColor="color" is-widget format="hex" picker-type="chrome" disable-history z-index="0" />
  </div>
</template>

<script setup lang="ts">
import type { ColorPreset, Option } from '@/types';
import SelectField from './select-field.vue'
import { computed } from 'vue';

const props = defineProps<{ colorPresets: ColorPreset[] }>()
const color = defineModel<string | null>()

const isPresetColor = computed(() =>
  props.colorPresets.some(preset => preset.value === color.value)
)

const colorList = computed(() => ([
  ...props.colorPresets,
  {
    value: isPresetColor.value ? null : color.value,
    label: 'Свой вариант'
  }
]) as Option[])
</script>

<style lang="scss" scoped>
.color-picker {
  width: 100%;

  &__options {
    margin-bottom: 10px;
  }

  :deep(.vc-colorpicker) {
    box-shadow: none;
    width: 100%;

    * {
      margin: 0;
      padding: 0;
    }

    // палитра
    .vc-saturation {
      margin-bottom: 16px;
      border-radius: 10px;
      overflow: hidden;
    }

    // курсор на палитре
    .vc-saturation__cursor div {
      width: 16px;
      height: 16px;
      transform: translate(-8px, -8px);
      border-width: 2px;
      filter: drop-shadow(0 4px 6px rgba(31, 41, 55, 0.1)) drop-shadow(0 2px 4px rgba(31, 41, 55, 0.06));
    }

    // блок с отображением текущего цвета
    .vc-display .vc-current-color {
      display: none;
    }

    // Слайдер для цвета/прозрачности
    .chrome-sliders {
      margin-left: 0 !important;
    }

    .chrome-controls {
      gap: 16px;
      margin-bottom: 16px;
    }

    .chrome-controls::before {
      content: '';
      aspect-ratio: 1;
      display: block;
      height: 32px;
      border-radius: 50%;
      background-color: var(--preview-color);
    }

    .chrome-sliders {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .small-slider {
      height: 8px !important;
    }

    .small-bar>div {
      background-color: transparent;
      border: 2px solid $color-white;
      filter: drop-shadow(0 4px 6px rgba(31, 41, 55, 0.1)) drop-shadow(0 2px 4px rgba(31, 41, 55, 0.06));
    }

    .vc-display {
      flex-wrap: wrap;
      height: auto;
    }

    .vc-alpha-input,
    .vc-color-input input {
      @include input-styles;
      padding: 4px 6px;
      border-radius: 5px;
      flex-direction: row;
      text-align: start;
    }

    .vc-alpha-input input {
      width: 24px;
    }

    .vc-input-toggle {
      width: 100%;
      text-align: center;
      color: $color-gray;
    }
  }
}
</style>
