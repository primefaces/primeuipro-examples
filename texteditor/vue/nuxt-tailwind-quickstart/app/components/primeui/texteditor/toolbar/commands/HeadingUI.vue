<script setup lang="ts">
import Heading1Icon from '@primeicons/vue/heading-1';
import Heading2Icon from '@primeicons/vue/heading-2';
import Heading3Icon from '@primeicons/vue/heading-3';
import Heading4Icon from '@primeicons/vue/heading-4';
import Heading5Icon from '@primeicons/vue/heading-5';
import Heading6Icon from '@primeicons/vue/heading-6';
import TextIcon from '@primeicons/vue/text';
import { useTextEditorContext } from '@primeui/vue-texteditor';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, type ComponentPublicInstance } from 'vue';

const { state, commands } = useTextEditorContext();

const options = [
    { label: 'Normal', value: null as number | null, icon: TextIcon },
    { label: 'Heading 1', value: 1, icon: Heading1Icon },
    { label: 'Heading 2', value: 2, icon: Heading2Icon },
    { label: 'Heading 3', value: 3, icon: Heading3Icon },
    { label: 'Heading 4', value: 4, icon: Heading4Icon },
    { label: 'Heading 5', value: 5, icon: Heading5Icon },
    { label: 'Heading 6', value: 6, icon: Heading6Icon }
];

const current = computed<number | null>(() => state.value.heading ?? null);
const currentIcon = computed(() => options.find((o) => o.value === current.value)?.icon ?? TextIcon);

const apply = (value: number | null) => {
    if (value == null) {
        commands.value.paragraph();
    } else {
        commands.value.heading(value);
    }
};

const open = ref(false);
const activeIndex = ref(0);
const rootRef = ref<HTMLElement | null>(null);
const optionRefs = ref<HTMLElement[]>([]);

const setOptionRef = (index: number, el: Element | ComponentPublicInstance | null) => {
    if (el instanceof HTMLElement) optionRefs.value[index] = el;
};

const selectedIndex = () => {
    const i = options.findIndex((o) => o.value === current.value);

    return i >= 0 ? i : 0;
};

const openMenu = () => {
    activeIndex.value = selectedIndex();
    open.value = true;
    void nextTick(() => optionRefs.value[activeIndex.value]?.scrollIntoView({ block: 'nearest' }));
};

const closeMenu = () => {
    open.value = false;
    optionRefs.value = [];
};

const toggle = () => (open.value ? closeMenu() : openMenu());

const select = (value: number | null) => {
    apply(value);
    closeMenu();
};

const move = (delta: number) => {
    activeIndex.value = (activeIndex.value + delta + options.length) % options.length;
    void nextTick(() => optionRefs.value[activeIndex.value]?.scrollIntoView({ block: 'nearest' }));
};

const onKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            open.value ? move(1) : openMenu();
            break;
        case 'ArrowUp':
            event.preventDefault();
            open.value ? move(-1) : openMenu();
            break;
        case 'Home':
            if (open.value) {
                event.preventDefault();
                activeIndex.value = 0;
            }
            break;
        case 'End':
            if (open.value) {
                event.preventDefault();
                activeIndex.value = options.length - 1;
            }
            break;
        case 'Enter':
        case ' ':
            event.preventDefault();
            open.value ? select(options[activeIndex.value]!.value) : openMenu();
            break;
        case 'Escape':
            if (open.value) {
                event.preventDefault();
                closeMenu();
            }
            break;
        case 'Tab':
            closeMenu();
            break;
    }
};

const onDocumentPointerdown = (event: PointerEvent) => {
    if (!open.value) return;

    const target = event.target;

    if (target instanceof Node && rootRef.value?.contains(target)) return;

    closeMenu();
};

onMounted(() => document.addEventListener('pointerdown', onDocumentPointerdown, true));
onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocumentPointerdown, true));
</script>

<template>
    <div ref="rootRef" class="relative" @keydown="onKeydown">
        <button
            type="button"
            class="flex h-7 items-center justify-center gap-1 rounded border border-slate-200 bg-white px-1.5 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            role="combobox"
            aria-haspopup="listbox"
            :aria-expanded="open ? 'true' : 'false'"
            aria-label="Heading"
            title="Heading"
            @click="toggle"
        >
            <component :is="currentIcon" class="size-3.5 text-slate-600 dark:text-zinc-400" />
            <i class="pi pi-chevron-down shrink-0 text-[0.625rem] text-slate-400 transition-transform dark:text-zinc-500" :class="open && 'rotate-180'" aria-hidden="true" />
        </button>
        <div v-if="open" class="absolute start-0 z-50 mt-1 w-40 overflow-y-auto rounded-md border border-slate-200 bg-white p-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800" role="listbox" aria-label="Heading">
            <button
                v-for="(option, index) in options"
                :key="option.label"
                :ref="(el) => setOptionRef(index, el)"
                type="button"
                class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-start text-xs transition"
                :class="[option.value === current ? 'bg-primary/10 text-primary dark:bg-primary/20' : 'text-slate-700 dark:text-zinc-300', index === activeIndex && option.value !== current ? 'bg-slate-100 dark:bg-zinc-700' : '']"
                role="option"
                :aria-selected="option.value === current ? 'true' : 'false'"
                @mouseenter="activeIndex = index"
                @click="select(option.value)"
            >
                <component :is="option.icon" class="size-3.5 shrink-0" />
                <span class="min-w-0 flex-1 truncate">{{ option.label }}</span>
                <i v-if="option.value === current" class="pi pi-check shrink-0 text-[0.625rem]" aria-hidden="true" />
            </button>
        </div>
    </div>
</template>
