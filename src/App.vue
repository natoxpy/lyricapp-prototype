<script setup lang="ts">
import EditArea from '@/components/editArea.vue'
import { commonStore } from '@/stores/common'
import { onMounted, ref } from 'vue'
const common = commonStore()

const viewElement = ref<HTMLDivElement>()

onMounted(() => {
    let element = viewElement.value
    if (!element) return

    let rect = element.getBoundingClientRect()

    common.viewElement = element

    common.viewPixels = rect.width
})
</script>
<template>
    <main
        class="macchiato flex w-full h-screen rounded items-center justify-center flex-col gap-3 p-10"
    >
        <!-- INFO: Lyrics viewer -->
        <div class="flex w-[80%] gap-3">
            <!-- INFO: Lyrics map -->
            <div class="bg-crust grow h-96 rounded max-w-[550px] flex flex-col gap-3 p-5">
                <span>
                    Frozen stairs, carpet in blood red Seating goodbyes left unsaid Despite our
                    promises, here I am following your steps
                </span>

                <span>
                    Drop by drop As your unchanging reality dampen my sleeve You kissed them off
                    Through the fibers of my handkerchief
                </span>

                <span>
                    I am fire Burn those who dare to care for me And my fuel are memories They
                    perish with the heat So I can move on Flower of iron Shrivelled up to hide the
                    imposter in me "Why did you leave?" Don't let those words out of me So I chewed
                    on 話梅糖
                </span>
            </div>
            <!-- INFO: Visible lyrics visualizer -->
            <div class="bg-crust grow h-96 rounded"></div>
        </div>

        <!-- INFO: Lyrics editor -->
        <div class="bg-crust w-[80%] h-full max-h-[760px] rounded flex">
            <div class="h-full w-20 pt-12 border-r border-mantle">
                <div class="h-14 flex justify-center items-center border-surface0 p-2">
                    <span class="whitespace-nowrap overflow-hidden text-ellipsis"> Primary</span>
                </div>
                <div class="h-14 flex justify-center items-center border-surface0 p-2">
                    <span class="whitespace-nowrap overflow-hidden text-ellipsis">Secondary</span>
                </div>
            </div>
            <div class="w-full relative overflow-hidden" ref="viewElement">
                <EditArea />
            </div>
        </div>
    </main>
</template>
