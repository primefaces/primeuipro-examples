<script setup lang="ts">
import UndoIcon from '@primeicons/vue/undo';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button type="button" class="text-editor-toolbar-item" :disabled="!state.canUndo" aria-label="Undo" v-tooltip.top="'Undo (Ctrl+Z)'" @click="commands.undo">
        <UndoIcon class="text-editor-toolbar-item-icon" />
    </button>
</template>
