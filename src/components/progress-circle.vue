<template>
    <div class="progress-bar" :class="`progress-bar--${props.status}`">
        <svg xmlns="http://www.w3.org/2000/svg" :view-box="viewBox"
            :style="{ rotate: `${props.type === 'ordinary' ? -90 : -225}deg`, height: `${props.size.height}px`, width: `${props.size.height}px` }">
            <circle class="progress-bar__path" fill="none" stroke-linecap="round" :stroke-width="size.strokeWidth"
                :r="radius" :cx="cx" :cy="cx" :stroke-dasharray="dasharray" />
            <circle v-show="props.value" class="progress-bar__progress" fill="none" stroke-linecap="round"
                :stroke-width="size.strokeWidth" :r="radius" :cx="cx" :cy="cx" :stroke-dasharray="progresssDasharray" />
        </svg>

        <span class="progress-bar__label" v-html="label"></span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Enumerate<N extends number, Acc extends number[] = []> =
    Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>;

type Range<F extends number, T extends number> = Exclude<Enumerate<T | (T extends F ? never : F)>, Enumerate<F>>;

interface ProgrssProps {
    type?: 'dashboard' | 'ordinary'
    value: Range<0, 100>
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
const stepSize = computed(() => dasharray.value / 100)
const viewBox = computed(() => `0 0 ${props.size.height} ${props.size.height}`)
const progresssDasharray = computed(() => `${stepSize.value * props.value}  ${dasharray.value * 2 - (stepSize.value * props.value)}`)

const label = computed(() => {
    switch (props.status) {
        case 'error':
            return '<i class="pi pi-times"></i>'
        case 'success':
            return '<i class="pi pi-check"></i>'
        case 'warning':
            return '<i class="pi pi-exclamation-circle"></i>'
        default:
            return props.value + '%'
    }
})
</script>

<style lang="scss">
.progress-bar {
    position: relative;
    height: fit-content;
    width: fit-content;

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