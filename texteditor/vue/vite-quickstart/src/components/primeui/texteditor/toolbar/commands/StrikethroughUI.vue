<script setup lang="ts">
import StrikethroughIcon from '@primeicons/vue/strikethrough';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button
        type="button"
        :class="['text-editor-toolbar-item', { 'text-editor-toolbar-item-active': state.strikethrough }]"
        :aria-pressed="state.strikethrough"
        aria-label="Strikethrough"
        v-tooltip.top="'Strikethrough'"
        @click="commands.strikethrough"
    >
        <StrikethroughIcon class="text-editor-toolbar-item-icon" />
    </button>
</template>
