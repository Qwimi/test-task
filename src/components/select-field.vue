<template>
  <FormField
    class="select-field"
    :class="{ 'select-field--focus': isOpen }"
    ref="controlRef"
    @click="toggle()"
  >
    <template #label>
      <slot name="label" />
    </template>

    <template #prepend-icon>
      <slot name="prepend-icon" />
    </template>

    <div class="select-field__input">
      <span v-if="selectedOption">
        <slot name="value" :option="selectedOption">
          {{ selectedOption.label }}
        </slot>
      </span>

      <span v-else class="select-field__placeholder">
        {{ placeholder }}
      </span>
    </div>

    <Transition name="fade">
      <ul v-show="isOpen" class="select-field__dropdown">
        <li
          v-for="option in options"
          :key="option.value"
          class="select-field__option"
          :class="{ 'select-field__option--selected': option.value === modelValue }"
          @click.stop="select(option)"
        >
          <slot name="option" :option="option">
            {{ option.label }}
          </slot>
        </li>
      </ul>
    </Transition>

    <template #append-icon>
      <slot name="append-icon">
        <SvgIcon
          name="arrow"
          class="select-field__icon"
          :class="{ 'select-field__icon--rotated': isOpen }"
        />
      </slot>
    </template>
  </FormField>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FormField from './form-field.vue'
import { onClickOutside } from '@vueuse/core'
import SvgIcon from './svg-icon.vue'
import type { Option } from '@/types'

const props = defineProps<{
  options: Option[]
  placeholder?: string
}>()

const modelValue = defineModel<string | null>()

const isOpen = ref(false)
const controlRef = ref<HTMLElement | null>(null)

const selectedOption = computed(() => props.options.find((o) => o.value === modelValue.value))

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function select(option: Option) {
  modelValue.value = option.value
  close()
}

onClickOutside(controlRef, close)
</script>

<style lang="scss" scoped>
.select-field {
  position: relative;
  overflow: visible;

  @include input-styles;

  &__input {
    flex: 1;
  }

  &__dropdown {
    position: absolute;
    width: 100%;
    list-style: none;
    bottom: 0;
    left: 0;
    transform: translateY(calc(100% + 1px));
    background-color: $color-white;
    color: $color-black;
    z-index: 1;
    border-radius: 10px;
    border: 1px solid $color-light-gray;
  }

  &__option {
    cursor: pointer;
    padding: 10px 20px;
    transition: background $animation-duration-base;

    &:hover {
      background: rgba($color: $color-light-gray, $alpha: 0.3);
    }

    &--selected {
      color: $color-blue;
      background: rgba($color: $color-blue, $alpha: 0.1);
    }
  }

  &__icon {
    transition: rotate $animation-duration-base;

    &--rotated {
      rotate: 180deg;
    }
  }
}
</style>
