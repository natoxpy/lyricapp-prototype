<script setup lang="ts">
import LyricItem from './lyric.vue'
</script>
<template>
    <div class="flex w-full h-14 border border-surface0 py-1 rounded relative">
        <LyricItem lyric="The tv is buffer" :start="1" :end="2" />
        <LyricItem lyric="The tv is buffer" :start="10" :end="20" />
        <LyricItem lyric="The tv is buffer" :start="120" :end="125" />
    </div>
</template>
