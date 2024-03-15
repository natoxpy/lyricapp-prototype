<script setup lang="ts">
import { ref } from 'vue'
import { commonStore } from '@/stores/common'
const common = commonStore()

// Drag bar percentage
const barper = ref(0)
const barpress = ref(false)
const continueTime = ref()

function mouseDown(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    const elm = document.querySelector('#app') as HTMLDivElement
    if (!elm) return

    barpress.value = true

    document.body.style.setProperty('cursor', 'grabbing', 'important')
    elm.style.setProperty('pointer-events', 'none', 'important')
}

document.addEventListener('mouseup', () => {
    const elm = document.querySelector('#app') as HTMLDivElement
    if (!elm) return
    barpress.value = false

    if (!continueTime.value) return
    clearTimeout(continueTime.value)

    document.body.style.cursor = 'auto'
    elm.style.setProperty('pointer-events', 'auto')
})

document.addEventListener('mousemove', (e) => {
    if (barpress.value) {
        if (continueTime.value) clearTimeout(continueTime.value)

        updatePosition(e)
        continueTime.value = setInterval(() => updatePosition(e))
    }
})

function updatePosition(e: MouseEvent) {
    let element = common.completeViewElement

    if (!element || !common.viewElement) return

    let rect = element.getBoundingClientRect()
    const rectView = common.viewElement.getBoundingClientRect()

    const bgOffset = rectView.left - rect.left

    let mouseX = e.x - rect.left

    mouseX = Math.max(Math.min(mouseX, common.maxPixels - 5), 0)

    barper.value = mouseX / common.maxPixels

    const viewBaroffset = mouseX - bgOffset

    let newOffset = 0

    if (viewBaroffset < 75) {
        const delta = -0.1 * (viewBaroffset - 75)
        newOffset = common.xOffset + delta * 0.5
    } else if (viewBaroffset > common.viewPixels - 75) {
        const delta = -0.1 * (viewBaroffset - common.viewPixels + 75)
        newOffset = common.xOffset + delta * 0.5
    } else return

    common.xOffset = Math.min(Math.max(Math.floor(newOffset), rectView.width - rect.width), 0)
}

function formatTime(s: number) {
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function formatTimeMS(ms: number) {
    const minutes = String(Math.floor((ms / (1000 * 60)) % 60)).padStart(2, '0')
    const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, '0')
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0')
    return `${minutes}:${seconds}:${milliseconds}`
}
</script>

<template>
    <!-- INFO: TIMEBAR -->
    <div
        class="flex justify-center absolute top-7 w-1 h-[calc(100%-1.75rem)] bg-surface1 rounded cursor-grab select-none group"
        :style="{
            left: `${Math.round(barper * common.maxPixels)}px`,
            cursor: barpress ? `grabbing !important` : 'grab'
        }"
        @mousedown="mouseDown"
    >
        <span
            class="absolute -top-6 group-hover:visible invisible"
            :style="{
                visibility: barpress ? 'visible' : undefined
            }"
            >{{ formatTimeMS(Math.round(1000 * barper * common.duration)) }}
        </span>
    </div>
</template>
