<script setup lang="ts">
import RedoIcon from '@primeicons/vue/refresh';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button type="button" class="text-editor-toolbar-item" :disabled="!state.canRedo" aria-label="Redo" v-tooltip.top="'Redo (Ctrl+Shift+Z)'" @click="commands.redo">
        <RedoIcon class="text-editor-toolbar-item-icon" />
    </button>
</template>
