<script setup lang="ts">
import CheckListIcon from '@primeicons/vue/check-square';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button type="button" :class="['text-editor-toolbar-item', { 'text-editor-toolbar-item-active': state.checkList }]" :aria-pressed="state.checkList" aria-label="Check list" v-tooltip.top="'Check List'" @click="commands.checkList">
        <CheckListIcon class="text-editor-toolbar-item-icon" />
    </button>
</template>
