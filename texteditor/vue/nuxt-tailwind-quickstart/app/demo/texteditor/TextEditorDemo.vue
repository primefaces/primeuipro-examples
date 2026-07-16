<script setup lang="ts">
import { ref } from 'vue';
import { TextEditor } from '@primeui/vue-texteditor';
import { ToolbarUI } from '~/components/primeui/texteditor';

const content = ref('<h1>Product launch brief</h1><p>Use this document to align the team before launch. Edit the content, apply formatting, or add a checklist from the toolbar.</p><h2>Launch goals</h2><ul><li>Make onboarding clear for new customers</li><li>Give support teams an accurate release summary</li><li>Track final launch tasks in one place</li></ul><blockquote><p>Keep this quickstart focused, then replace the sample document with your own data.</p></blockquote>');
</script>

<template>
    <TextEditor.Root v-model="content" aria-label="Product launch brief editor" placeholder="Start writing...">
        <TextEditor.Toolbar>
            <ToolbarUI />
        </TextEditor.Toolbar>
        <TextEditor.Content checklist-placeholder="To-do" />
    </TextEditor.Root>
</template>
