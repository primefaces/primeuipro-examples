<script setup lang="ts">
import UnderlineIcon from '@primeicons/vue/underline';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button type="button" :class="['text-editor-toolbar-item', { 'text-editor-toolbar-item-active': state.underline }]" :aria-pressed="state.underline" aria-label="Underline" v-tooltip.top="'Underline'" @click="commands.underline">
        <UnderlineIcon class="text-editor-toolbar-item-icon" />
    </button>
</template>
