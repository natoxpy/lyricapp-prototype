<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LyricsBar from '@/components/lyrics.vue'
import TimeTop from '@/components/timetop.vue'
import TimeBar from '@/components/timebar.vue'
import { commonStore } from '@/stores/common'
const common = commonStore()

const bodyDragging = ref(false)
const lastReference = ref<[number, number] | null>(null)
const keyholding = ref<{ shift: boolean }>({ shift: false })

document.addEventListener('keydown', (e) => {
    if (e.key == 'Shift') keyholding.value.shift = true
})

document.addEventListener('keyup', (e) => {
    if (e.key == 'Shift') keyholding.value.shift = false
})

document.addEventListener('mouseup', () => {
    lastReference.value = null
    bodyDragging.value = false
})

document.addEventListener('mousemove', (e) => {
    if (bodyDragging.value) updatePosition(e)
})

function updatePosition(e: MouseEvent) {
    let element = common.completeViewElement
    if (!element || !common.viewElement) return

    let rect = element.getBoundingClientRect()
    const viewRect = common.viewElement.getBoundingClientRect()

    if (lastReference.value === null) lastReference.value = [e.x, e.y]

    let mouseX = e.x - rect.left
    mouseX = Math.max(Math.min(mouseX, common.maxPixels - 5), 0)

    const delta = [e.x - lastReference.value[0], e.y - lastReference.value[1]]

    lastReference.value = [e.x, e.y]

    const newOffset = common.xOffset + delta[0] * 0.5

    common.xOffset = Math.min(Math.max(Math.floor(newOffset), viewRect.width - rect.width), 0)
}

function wheelEvent(e: WheelEvent) {
    let element = common.completeViewElement
    if (!element || !common.viewElement) return

    const rectView = common.viewElement.getBoundingClientRect()

    if (keyholding.value.shift) {
        let maxPixels = common.maxPixels + -e.deltaY * 0.5

        common.maxPixels = Math.max(Math.min(maxPixels, rectView.width * 25), rectView.width)

        common.xOffset = Math.min(
            Math.max(Math.floor(common.xOffset), rectView.width - common.maxPixels),
            0
        )

        return
    }

    const delta = e.deltaY * -0.1
    let newOffset = common.xOffset + delta * 0.5

    common.xOffset = Math.min(Math.max(Math.floor(newOffset), rectView.width - common.maxPixels), 0)
}

// Drag bar percentage
const exposedAreaElement = ref<HTMLDivElement>()

onMounted(() => {
    let element = exposedAreaElement.value
    if (!element) return

    common.completeViewElement = element

    let rect = element.getBoundingClientRect()

    common.maxPixels = rect.width
})
</script>

<template>
    <div
        class="h-full absolute active:cursor-grabbing"
        ref="aroundElement"
        @mousedown="bodyDragging = true"
        @wheel="wheelEvent"
        :style="{
            left: `${common.xOffset}px`,
            width: `${common.maxPixels}px`
        }"
    >
        <!-- INFO: timeline -->
        <div class="flex items-end w-full h-12 relative select-none" ref="exposedAreaElement">
            <TimeTop />
        </div>

        <LyricsBar />
        <LyricsBar />

        <TimeBar />
    </div>
</template>
