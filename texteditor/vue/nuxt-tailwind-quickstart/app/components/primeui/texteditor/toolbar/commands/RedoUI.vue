<script setup lang="ts">
import RedoIcon from '@primeicons/vue/refresh';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button
        type="button"
        class="inline-flex items-center justify-center size-7 rounded hover:bg-slate-100 dark:hover:bg-zinc-700 border-0 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        title="Redo (Ctrl+Shift+Z)"
        aria-label="Redo"
        :disabled="!state.canRedo"
        @click="commands.redo"
    >
        <RedoIcon class="size-3.5 text-slate-600 dark:text-zinc-400" />
    </button>
</template>
