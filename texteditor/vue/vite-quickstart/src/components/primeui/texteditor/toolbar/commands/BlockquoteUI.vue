<script setup lang="ts">
import BlockquoteIcon from '@primeicons/vue/block-quote';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button type="button" :class="['text-editor-toolbar-item', { 'text-editor-toolbar-item-active': state.blockquote }]" :aria-pressed="state.blockquote" aria-label="Blockquote" v-tooltip.top="'Blockquote'" @click="commands.blockquote">
        <BlockquoteIcon class="text-editor-toolbar-item-icon" />
    </button>
</template>
