<template>
  <div class="pie-chart">
    <canvas ref="canvasRef" class="pie-chart__canvas" />
    <ul class="pie-chart__legend">
      <li class="pie-chart__item" v-for="item in data" :key="item.label">
        <div class="pie-chart__color" :style="{ backgroundColor: item.backgroundColor }"></div>
        <span class="pie-chart__label">
          {{ item.label }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  PieController,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import type { PieSector } from '@/types'

Chart.register(PieController, ArcElement, Tooltip, Legend)

const props = defineProps<{
  data: PieSector[]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

onMounted(() => {
  if (!canvasRef.value) return

  const labels = props.data.map((item) => item.label)
  const values = props.data.map((item) => item.value)
  const colors = props.data.map((item) => item.backgroundColor)

  const chartData: ChartData<'pie'> = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
      },
    ],
  }

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label(context) {
            const label = context.label ?? ''
            const value = context.parsed ?? 0
            return `${label}: ${value}%`
          },
        },
      },
    },
  }

  chartInstance = new Chart(canvasRef.value.getContext('2d')!, {
    type: 'pie',
    data: chartData,
    options,
  })
})

watch(
  () => props.data,
  (newData) => {
    if (!chartInstance) return
    chartInstance.data.labels = newData.map((item) => item.label)
    chartInstance.data.datasets[0].data = newData.map((item) => item.value)
    chartInstance.data.datasets[0].backgroundColor = newData.map((item) => item.backgroundColor)
    chartInstance.update()
  },
  { deep: true },
)

onBeforeUnmount(() => {
  chartInstance?.destroy()
})
</script>

<style lang="scss" scoped>
.pie-chart {
  &__legend {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 15px 30px;
    flex-wrap: wrap;
  }

  &__canvas {
    margin-bottom: 40px;
  }

  &__item {
    display: flex;
    gap: 12px;
    align-items: center;
    font-size: 15px;
    line-height: 24px;
    color: $color-dark-gray;
  }

  &__color {
    height: 14px;
    width: 14px;
    border-radius: 50%;
  }
}
</style>
