<script setup lang="ts">
import BoldIcon from '@primeicons/vue/bold';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { commands, state } = useTextEditorContext();
</script>

<template>
    <button type="button" :class="['text-editor-toolbar-item', { 'text-editor-toolbar-item-active': state.bold }]" :aria-pressed="state.bold" aria-label="Bold" @click="commands.bold" v-tooltip.top="'Bold'">
        <BoldIcon class="text-editor-toolbar-item-icon" />
    </button>
</template>
