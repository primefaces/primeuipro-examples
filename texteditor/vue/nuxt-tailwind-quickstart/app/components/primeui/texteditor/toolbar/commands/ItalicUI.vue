<script setup lang="ts">
import ItalicIcon from '@primeicons/vue/italic';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button
        type="button"
        :class="['inline-flex items-center justify-center size-7 rounded hover:bg-slate-100 dark:hover:bg-zinc-700 border-0 cursor-pointer', { 'bg-slate-200 dark:bg-zinc-600': state.italic }]"
        title="Italic"
        aria-label="Italic"
        :aria-pressed="state.italic"
        @click="commands.italic"
    >
        <ItalicIcon class="size-3.5 text-slate-600 dark:text-zinc-400" />
    </button>
</template>
