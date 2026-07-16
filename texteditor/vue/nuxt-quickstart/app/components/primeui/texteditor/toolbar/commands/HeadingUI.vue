<script setup lang="ts">
import Heading1Icon from '@primeicons/vue/heading-1';
import Heading2Icon from '@primeicons/vue/heading-2';
import Heading3Icon from '@primeicons/vue/heading-3';
import Heading4Icon from '@primeicons/vue/heading-4';
import Heading5Icon from '@primeicons/vue/heading-5';
import Heading6Icon from '@primeicons/vue/heading-6';
import TextIcon from '@primeicons/vue/text';

import Select from 'primevue/select';
import { useTextEditorContext } from '@primeui/vue-texteditor';

const { state, commands } = useTextEditorContext();
const options = [
    { label: 'Normal', value: null, icon: TextIcon },
    { label: 'Heading 1', value: 1, icon: Heading1Icon },
    { label: 'Heading 2', value: 2, icon: Heading2Icon },
    { label: 'Heading 3', value: 3, icon: Heading3Icon },
    { label: 'Heading 4', value: 4, icon: Heading4Icon },
    { label: 'Heading 5', value: 5, icon: Heading5Icon },
    { label: 'Heading 6', value: 6, icon: Heading6Icon }
];

const onChange = (value: number | null) => {
    if (!value) {
        commands.value.paragraph();
    } else {
        commands.value.heading(value);
    }
};

const style = {
    root: {
        class: 'text-editor-toolbar-item',
        style: 'width: auto'
    },
    label: {
        style: 'padding-block-start: 0; padding-block-end: 0; width: 1.5rem; padding-inline-end: 0; display: inline-flex; align-items: center; color: inherit'
    },
    dropdown: {
        style: 'width: 1rem; color: inherit'
    },
    dropdownIcon: {
        style: 'width: 0.625rem; height: 0.625rem; font-size: 0.625rem'
    },
    option: {
        style: 'font-size: 0.75rem; display: flex; align-items: center; gap: 0.5rem'
    }
};
</script>

<template>
    <Select :options="options" :model-value="state.heading" @update:model-value="onChange($event)" option-label="label" option-value="value" size="small" :pt="style" aria-label="Heading" v-tooltip.top="'Heading'">
        <template #value="{ value }">
            <component :is="options.find((o) => o.value === value)?.icon" v-if="value" style="width: 0.75rem; height: 0.75rem; color: var(--p-text-muted-color)" />
            <TextIcon v-else style="width: 0.75rem; height: 0.75rem; color: var(--p-text-muted-color)" class="text-editor-toolbar-item-icon" />
        </template>
        <template #option="{ option }">
            <component :is="option.icon" style="color: var(--p-text-muted-color)" class="text-editor-toolbar-item-icon" />
            <span>{{ option.label }}</span>
        </template>
    </Select>
</template>
