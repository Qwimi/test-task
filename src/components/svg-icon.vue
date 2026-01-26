<template>
  <component v-if="icon" :is="icon" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ name: string }>()

const icons = import.meta.glob('../assets/icons/*.svg', { eager: true })

const icon = computed(() => {
  const key = `../assets/icons/${props.name}.svg`
  return icons[key] ? (icons[key] as any).default : null
})
</script>
