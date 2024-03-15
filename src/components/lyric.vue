<script setup lang="ts">
import { commonStore } from '@/stores/common'
const common = commonStore()

defineProps<{ lyric: string; start: number; end: number }>()

function dur(s: number) {
    return s / common.duration
}
function keydown(e: KeyboardEvent) {
    if (e.key == 'Enter') return e.preventDefault()
}
</script>
<template>
    <div
        class="flex h-full bg-mantle gap-1 absolute cursor-grab"
        :style="{
            left: `${dur(start) * common.maxPixels}px`,
            width: `${dur(end - start) * common.maxPixels}px`
        }"
    >
        <div class="h-full min-w-1 hover:bg-pink cursor-col-resize"></div>

        <div
            class="flex w-40 items-center justify-center grow whitespace-nowrap overflow-hidden text-ellipsis"
        >
            <span
                @keydown="keydown"
                class="whitespace-nowrap overflow-hidden text-ellipsis cursor-auto"
                contenteditable
                >{{ lyric }}</span
            >
        </div>

        <div class="h-full min-w-1 hover:bg-pink cursor-col-resize"></div>
    </div>
</template>
