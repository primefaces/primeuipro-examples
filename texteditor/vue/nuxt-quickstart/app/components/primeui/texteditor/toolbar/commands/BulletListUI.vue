<script setup lang="ts">
import BulletListIcon from '@primeicons/vue/list';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
</script>

<template>
    <button type="button" :class="['text-editor-toolbar-item', { 'text-editor-toolbar-item-active': state.bulletList }]" :aria-pressed="state.bulletList" aria-label="Bullet list" v-tooltip.top="'Bullet List'" @click="commands.bulletList">
        <BulletListIcon class="text-editor-toolbar-item-icon" />
    </button>
</template>
