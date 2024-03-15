<script setup lang="ts">
import { ref, watch } from 'vue'
import { commonStore } from '@/stores/common'
const common = commonStore()

const steps = ref(30)

function formatTime(s: number) {
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function formatTimeMS(ms: number) {
    const minutes = String(Math.floor((ms / (1000 * 60)) % 60)).padStart(2, '0')
    const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, '0')
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0')
    return `${minutes}:${seconds}:${milliseconds}`
}

function pLeft(s: number) {
    const delta = s / steps.value
    return delta * common.maxPixels
}

watch([common], () => {
    steps.value = Math.floor(common.maxPixels / 100)
})
</script>
<template>
    <div class="w-full h-full flex relative border border-mantle">
        <div class="absolute left-[-25px] w-[50px] h-full flex items-end justify-center">
            <span class="text-sm">
                <!--
                {{ 0 }}
                <br />
                -->

                {{ formatTime(0) }}
            </span>
        </div>

        <div
            v-for="step in steps"
            class="absolute w-[50px] text-center h-full flex items-end justify-center"
            :style="{
                left: `${pLeft(step) - 25}px`
            }"
        >
            <span class="text-sm">
                <!--
                {{ step }} | {{ pLeft(step) }}
                <br />
                -->

                {{ formatTimeMS(Math.floor(1000 * (step / steps) * common.duration)) }}
            </span>
        </div>
    </div>
</template>
