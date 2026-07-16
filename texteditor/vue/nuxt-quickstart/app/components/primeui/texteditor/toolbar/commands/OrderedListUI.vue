<script setup lang="ts">
import OrderedListIcon from '@primeicons/vue/list-ol';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button type="button" :class="['text-editor-toolbar-item', { 'text-editor-toolbar-item-active': state.orderedList }]" :aria-pressed="state.orderedList" aria-label="Ordered list" v-tooltip.top="'Ordered List'" @click="commands.orderedList">
        <OrderedListIcon class="text-editor-toolbar-item-icon" />
    </button>
</template>
