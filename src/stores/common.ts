import { defineStore } from 'pinia'
import { ref } from 'vue'

export const commonStore = defineStore('common', () => {
    const maxPixels = ref(3000)
    const duration = ref(300)
    const completeViewElement = ref<HTMLDivElement>()
    const viewElement = ref<HTMLDivElement>()
    const viewPixels = ref(0)
    const xOffset = ref(0)

    return { maxPixels, viewPixels, xOffset, completeViewElement, viewElement, duration }
})
