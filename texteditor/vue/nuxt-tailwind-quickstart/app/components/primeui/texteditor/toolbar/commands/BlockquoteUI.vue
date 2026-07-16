<script setup lang="ts">
import BlockquoteIcon from '@primeicons/vue/block-quote';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button
        type="button"
        :class="['inline-flex items-center justify-center size-7 rounded hover:bg-slate-100 dark:hover:bg-zinc-700 border-0 cursor-pointer', { 'bg-slate-200 dark:bg-zinc-600': state.blockquote }]"
        title="Blockquote"
        aria-label="Blockquote"
        :aria-pressed="state.blockquote"
        @click="commands.blockquote"
    >
        <BlockquoteIcon class="size-3.5 text-slate-600 dark:text-zinc-400" />
    </button>
</template>
