<script setup lang="ts">
import TextEditorDemo from '~/demo/texteditor/TextEditorDemo.vue';

useHead({ title: 'Text Editor Quickstart | PrimeUI Pro' });
</script>

<template>
    <section class="min-w-0">
        <AppPageHeader title="Text Editor" context="Product brief" meta="Autosaved locally" />
        <div class="mt-5 h-[calc(100svh-13.5rem)] min-h-[34rem] max-h-[48rem] overflow-visible rounded-lg border border-[var(--app-border)] bg-[var(--app-panel)]">
            <TextEditorDemo />
        </div>
    </section>
</template>
