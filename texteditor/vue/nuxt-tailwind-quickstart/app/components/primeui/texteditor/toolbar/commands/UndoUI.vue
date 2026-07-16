<script setup lang="ts">
import UndoIcon from '@primeicons/vue/undo';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button
        type="button"
        class="inline-flex items-center justify-center size-7 rounded hover:bg-slate-100 dark:hover:bg-zinc-700 border-0 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        title="Undo (Ctrl+Z)"
        aria-label="Undo"
        :disabled="!state.canUndo"
        @click="commands.undo"
    >
        <UndoIcon class="size-3.5 text-slate-600 dark:text-zinc-400" />
    </button>
</template>
