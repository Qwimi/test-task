<template>
  <component v-if="icon" :is="icon" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DefineComponent } from 'vue'

type SvgComponent = DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>

const props = defineProps<{ name: string }>()

const icons = import.meta.glob('../assets/icons/*.svg', { eager: true })

const icon = computed<SvgComponent | null>(() => {
  const key = `../assets/icons/${props.name}.svg`
  return icons[key] ? (icons[key] as { default: SvgComponent }).default : null
})
</script>
