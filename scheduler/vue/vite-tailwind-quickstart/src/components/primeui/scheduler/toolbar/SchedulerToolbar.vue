<script setup lang="ts">
import { getSchedulerText, useSchedulerHeaderContext, type SchedulerHeaderContext, type SchedulerHeaderViewOption, type SchedulerText, type SchedulerViewType } from '@primeui/vue-scheduler';
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

defineOptions({ inheritAttrs: false });

defineSlots<{
    actions?: () => unknown;
    'view-selector'?: (props: { view?: SchedulerViewType; viewOptions: SchedulerHeaderViewOption[]; changeView: (view: SchedulerViewType) => void }) => unknown;
}>();

const context = useSchedulerHeaderContext();
const toolbar = computed<SchedulerHeaderContext>(() => context.value);
const resolvedViewOptions = computed(() => toolbar.value.viewOptions ?? []);
const hasViewSelector = computed(() => Boolean(toolbar.value.view && resolvedViewOptions.value.length > 1 && (toolbar.value.changeViewCallback || toolbar.value.changeView)));
const viewSelectOpen = ref(false);
const activeViewIndex = ref(0);
const viewSelectRootRef = ref<HTMLElement | null>(null);
const viewOptionRefs = ref<HTMLElement[]>([]);
const selectedViewOption = computed(() => resolvedViewOptions.value.find((option) => option.value === toolbar.value.view));
const selectedViewLabel = computed(() => selectedViewOption.value?.label ?? (toolbar.value.view ? getToolbarViewLabel(toolbar.value.view, toolbar.value.text) : ''));
const viewLabel = computed(() => {
    const view = toolbar.value.view;

    return view ? (resolvedViewOptions.value.find((option) => option.value === view)?.label ?? getToolbarViewLabel(view, toolbar.value.text)) : undefined;
});
const hasViewLabel = computed(() => Boolean(toolbar.value.view && resolvedViewOptions.value.length <= 1));

function getToolbarViewLabel(view: SchedulerViewType, text: SchedulerText = getSchedulerText('en')) {
    switch (view) {
        case 'month':
            return text.month;
        case 'week':
            return text.week;
        case 'day':
            return text.day;
        case 'year':
            return text.year;
        case 'agenda':
            return text.agenda;
        case 'timelineDay':
            return `${text.timeline} ${text.day}`;
        case 'timelineWeek':
            return `${text.timeline} ${text.week}`;
        case 'timelineMonth':
            return `${text.timeline} ${text.month}`;
        case 'timelineYear':
            return `${text.timeline} ${text.year}`;
        case 'resourceDay':
            return `${text.resources} ${text.day}`;
        case 'resourceWeek':
            return `${text.resources} ${text.week}`;
        case 'resourceMonth':
            return `${text.resources} ${text.month}`;
        case 'resourceTimelineDay':
            return `${text.resources} ${text.timeline} ${text.day}`;
        case 'resourceTimelineWeek':
            return `${text.resources} ${text.timeline} ${text.week}`;
        case 'resourceTimelineMonth':
            return `${text.resources} ${text.timeline} ${text.month}`;
        case 'dateDay':
            return `${text.dateView} ${text.day}`;
        case 'dateWeek':
            return `${text.dateView} ${text.week}`;
        case 'dateMonth':
            return `${text.dateView} ${text.month}`;
        default:
            return view;
    }
}

function goPrev() {
    (toolbar.value.prevCallback ?? toolbar.value.prev)?.();
}

function goNext() {
    (toolbar.value.nextCallback ?? toolbar.value.next)?.();
}

function goToday() {
    (toolbar.value.todayCallback ?? toolbar.value.today)?.();
}

function changeView(view: SchedulerViewType | null | undefined) {
    if (!view) return;

    (toolbar.value.changeViewCallback ?? toolbar.value.changeView)?.(view);
    closeViewSelect();
}

function setViewOptionRef(index: number, el: unknown) {
    if (el instanceof HTMLElement) {
        viewOptionRefs.value[index] = el;
    }
}

function selectedViewIndex() {
    const index = resolvedViewOptions.value.findIndex((option) => option.value === toolbar.value.view);

    return index >= 0 ? index : 0;
}

function openViewSelect() {
    if (!hasViewSelector.value) return;

    activeViewIndex.value = selectedViewIndex();
    viewSelectOpen.value = true;

    void nextTick(() => {
        viewOptionRefs.value[activeViewIndex.value]?.scrollIntoView({ block: 'nearest' });
    });
}

function closeViewSelect() {
    viewSelectOpen.value = false;
    viewOptionRefs.value = [];
}

function toggleViewSelect() {
    if (viewSelectOpen.value) {
        closeViewSelect();
    } else {
        openViewSelect();
    }
}

function moveActiveViewOption(delta: number) {
    const count = resolvedViewOptions.value.length;

    if (!count) return;

    activeViewIndex.value = (activeViewIndex.value + delta + count) % count;

    void nextTick(() => {
        viewOptionRefs.value[activeViewIndex.value]?.scrollIntoView({ block: 'nearest' });
    });
}

function selectActiveViewOption() {
    changeView(resolvedViewOptions.value[activeViewIndex.value]?.value);
}

function onViewSelectKeydown(event: KeyboardEvent) {
    event.stopPropagation();

    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            if (!viewSelectOpen.value) {
                openViewSelect();
            } else {
                moveActiveViewOption(1);
            }
            break;
        case 'ArrowUp':
            event.preventDefault();
            if (!viewSelectOpen.value) {
                openViewSelect();
            } else {
                moveActiveViewOption(-1);
            }
            break;
        case 'Home':
            event.preventDefault();
            activeViewIndex.value = 0;
            break;
        case 'End':
            event.preventDefault();
            activeViewIndex.value = Math.max(0, resolvedViewOptions.value.length - 1);
            break;
        case 'Enter':
        case ' ':
            event.preventDefault();
            if (viewSelectOpen.value) {
                selectActiveViewOption();
            } else {
                openViewSelect();
            }
            break;
        case 'Escape':
            if (viewSelectOpen.value) {
                event.preventDefault();
                closeViewSelect();
            }
            break;
    }
}

function onDocumentPointerdown(event: PointerEvent) {
    if (!viewSelectOpen.value) return;

    const target = event.target;

    if (target instanceof Node && viewSelectRootRef.value?.contains(target)) {
        return;
    }

    closeViewSelect();
}

onMounted(() => {
    document.addEventListener('pointerdown', onDocumentPointerdown, true);
});

onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onDocumentPointerdown, true);
});
</script>

<template>
    <div class="w-full min-w-0 border-b border-surface-200 bg-white px-4 py-3.5 text-surface-950 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-0" :dir="toolbar.dir" v-bind="$attrs">
        <div class="grid min-h-14 w-full min-w-0 grid-cols-[max-content_minmax(8rem,1fr)_minmax(10rem,18rem)] items-center gap-x-4 gap-y-3 max-[640px]:grid-cols-1">
            <div class="flex min-w-0 items-center justify-self-start gap-0.5 max-[640px]:w-full" aria-label="Scheduler navigation">
                <button
                    class="inline-flex size-8 items-center justify-center rounded-md border border-transparent text-primary transition hover:border-surface-200 hover:bg-surface-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:hover:border-surface-700 dark:hover:bg-surface-800"
                    type="button"
                    :aria-label="toolbar.prevAriaLabel"
                    @click="goPrev"
                >
                    <i class="pi pi-chevron-left text-xl" aria-hidden="true" />
                </button>
                <button
                    class="inline-flex size-8 items-center justify-center rounded-md border border-transparent text-primary transition hover:border-surface-200 hover:bg-surface-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:hover:border-surface-700 dark:hover:bg-surface-800"
                    type="button"
                    :aria-label="toolbar.nextAriaLabel"
                    @click="goNext"
                >
                    <i class="pi pi-chevron-right text-xl" aria-hidden="true" />
                </button>
                <button
                    class="inline-flex h-8 items-center rounded-md border border-transparent px-3 text-sm font-semibold text-primary transition hover:border-surface-200 hover:bg-surface-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:hover:border-surface-700 dark:hover:bg-surface-800"
                    type="button"
                    @click="goToday"
                >
                    {{ toolbar.todayLabel }}
                </button>
            </div>
            <div class="min-w-0 justify-self-center truncate text-center text-lg font-semibold leading-snug">{{ toolbar.title }}</div>
            <div class="flex w-full min-w-0 items-center justify-end justify-self-end gap-2 max-[640px]:justify-start">
                <slot name="view-selector" :view="toolbar.view" :view-options="resolvedViewOptions" :change-view="changeView">
                    <div v-if="hasViewSelector" ref="viewSelectRootRef" class="relative w-full min-w-0" @keydown="onViewSelectKeydown" @click.stop>
                        <button
                            class="flex h-9 w-full min-w-0 items-center justify-between gap-2 rounded-md border border-surface-300 bg-white px-3 py-2 text-start text-sm text-surface-900 shadow-sm transition hover:border-surface-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-surface-700 dark:bg-surface-950 dark:text-surface-0 dark:hover:border-surface-600"
                            type="button"
                            role="combobox"
                            aria-haspopup="listbox"
                            :aria-expanded="viewSelectOpen ? 'true' : 'false'"
                            :aria-label="toolbar.viewSelectorAriaLabel"
                            @click="toggleViewSelect"
                        >
                            <span class="min-w-0 flex-1 truncate">{{ selectedViewLabel }}</span>
                            <i class="pi pi-chevron-down shrink-0 text-xs text-surface-500 transition-transform dark:text-surface-400" :class="viewSelectOpen && 'rotate-180'" aria-hidden="true" />
                        </button>
                        <div
                            v-if="viewSelectOpen"
                            class="absolute end-0 z-50 mt-1 max-h-64 w-full min-w-52 overflow-y-auto rounded-md border border-surface-200 bg-white p-1 shadow-lg shadow-surface-900/10 ring-1 ring-black/5 dark:border-surface-700 dark:bg-surface-900 dark:shadow-black/40 dark:ring-white/10"
                            role="listbox"
                            :aria-label="toolbar.viewSelectorAriaLabel"
                        >
                            <button
                                v-for="(option, index) in resolvedViewOptions"
                                :key="option.value"
                                :ref="(el) => setViewOptionRef(index, el)"
                                class="flex min-h-8 w-full min-w-0 items-center justify-between gap-2 rounded px-2.5 py-1.5 text-start text-sm transition"
                                :class="[
                                    option.value === toolbar.view ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-200' : 'text-surface-700 dark:text-surface-100',
                                    index === activeViewIndex && option.value !== toolbar.view ? 'bg-surface-100 dark:bg-surface-800' : ''
                                ]"
                                type="button"
                                role="option"
                                :aria-selected="option.value === toolbar.view ? 'true' : 'false'"
                                @mouseenter="activeViewIndex = index"
                                @click="changeView(option.value)"
                            >
                                <span class="min-w-0 truncate">{{ option.label }}</span>
                                <i v-if="option.value === toolbar.view" class="pi pi-check shrink-0 text-xs" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <span
                        v-else-if="hasViewLabel"
                        class="inline-flex min-h-8 min-w-0 flex-1 items-center justify-end truncate px-1 text-end text-sm font-semibold text-surface-500 dark:text-surface-400 max-[640px]:justify-start max-[640px]:text-start"
                        >{{ viewLabel }}</span
                    >
                </slot>
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>
