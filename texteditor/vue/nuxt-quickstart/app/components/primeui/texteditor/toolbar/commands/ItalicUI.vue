<script setup lang="ts">
import ItalicIcon from '@primeicons/vue/italic';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button type="button" :class="['text-editor-toolbar-item', { 'text-editor-toolbar-item-active': state.italic }]" :aria-pressed="state.italic" aria-label="Italic" v-tooltip.top="'Italic'" @click="commands.italic">
        <ItalicIcon class="text-editor-toolbar-item-icon" />
    </button>
</template>
