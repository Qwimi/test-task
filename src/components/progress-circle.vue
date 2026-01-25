<template>
    <div class="progress-bar" :class="`progress-bar--${props.status}`">
        <svg xmlns="http://www.w3.org/2000/svg" :view-box="viewBox"
            :style="{ rotate: `${props.type === 'ordinary' ? -90 : -225}deg`, height: `${props.size.height}px`, width: `${props.size.height}px` }">
            <circle class="progress-bar__path" fill="none" stroke-linecap="round" :stroke-width="size.strokeWidth"
                :r="radius" :cx="cx" :cy="cx" :stroke-dasharray="dasharray" />
            <circle v-show="props.value" class="progress-bar__progress" fill="none" stroke-linecap="round"
                :stroke-width="size.strokeWidth" :r="radius" :cx="cx" :cy="cx" :stroke-dasharray="progressDasharray" />
        </svg>

        <Transition name="fade" mode="out-in">
            <span class="progress-bar__label" v-html="label" :key="label"></span>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import type { Range } from '@/types';
import { computed } from 'vue';


interface ProgrssProps {
    type?: 'dashboard' | 'ordinary'
    value: Range<0, 101> | null
    size?: {
        height: number
        strokeWidth: number
    }
    status: 'progress' | 'success' | 'warning' | 'error'
}


const props = withDefaults(defineProps<ProgrssProps>(),
    {
        type: 'ordinary',
        size: () => ({
            height: 100,
            strokeWidth: 8
        })
    }
)

// sizes
const cx = computed(() => props.size.height / 2)
const radius = computed(() => props.size.height / 2 - props.size.strokeWidth)
const dasharray = computed(() => 2 * Math.PI * radius.value * (props.type === 'ordinary' ? 1 : 0.75))
const viewBox = computed(() => `0 0 ${props.size.height} ${props.size.height}`)
//  умножаем dasharray на 2 на случай, если окружность не полная (тип диаграммы dashboard) 
// и у нас не появлялся второй dash
const progressDasharray = computed(() => {
    const progress = dasharray.value / 100 * props.value
    return `${progress} ${dasharray.value * 2}`
})

const label = computed(() => {
    switch (props.status) {
        case 'error':
            return '<i class="pi pi-times"></i>'
        case 'success':
            return '<i class="pi pi-check"></i>'
        case 'warning':
            return '<i class="pi pi-exclamation-circle"></i>'
        default:
            return props.value ?? 0 + '%'
    }
})
</script>

<style lang="scss">
.progress-bar {
    position: relative;
    height: fit-content;
    width: fit-content;
    transition: color $animation-duration-base;

    &__label {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__path {
        stroke: $color-light-gray;
    }

    &__progress {
        stroke: currentColor;
        ;
        transition: stroke-dasharray $animation-duration-base ease;
    }

    &--progress {
        color: $color-blue;
    }

    &--progress &__label {
        color: $color-dark-gray;
    }

    &--success {
        color: $color-green;
    }

    &--warning {
        color: $color-yellow;
    }

    &--error {
        color: $color-red;
    }
}
</style>