<script setup lang="ts">
import { getSchedulerText, useSchedulerHeaderContext, type SchedulerHeaderContext, type SchedulerHeaderViewOption, type SchedulerText, type SchedulerViewType } from '@primeui/vue-scheduler';
import Button from 'primevue/button';
import Select from 'primevue/select';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

defineSlots<{
    actions?: () => unknown;
    'view-selector'?: (props: { view?: SchedulerViewType; viewOptions: SchedulerHeaderViewOption[]; changeView: (view: SchedulerViewType) => void }) => unknown;
}>();

const context = useSchedulerHeaderContext();
const toolbar = computed<SchedulerHeaderContext>(() => context.value);
const resolvedViewOptions = computed(() => toolbar.value.viewOptions ?? []);
const hasViewSelector = computed(() => Boolean(toolbar.value.view && resolvedViewOptions.value.length > 1 && (toolbar.value.changeViewCallback || toolbar.value.changeView)));
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
    if (!view) {
        return;
    }

    (toolbar.value.changeViewCallback ?? toolbar.value.changeView)?.(view);
}
</script>

<template>
    <div class="scheduler-toolbar-ui" :dir="toolbar.dir" v-bind="$attrs">
        <div class="scheduler-toolbar-ui-layout">
            <div class="scheduler-toolbar-ui-nav" aria-label="Scheduler navigation">
                <Button class="scheduler-toolbar-ui-nav-button scheduler-toolbar-ui-prev" text rounded icon="pi pi-chevron-left" :aria-label="toolbar.prevAriaLabel" @click="goPrev" />
                <Button class="scheduler-toolbar-ui-nav-button scheduler-toolbar-ui-next" text rounded icon="pi pi-chevron-right" :aria-label="toolbar.nextAriaLabel" @click="goNext" />
                <Button class="scheduler-toolbar-ui-nav-button scheduler-toolbar-ui-today" text :label="toolbar.todayLabel" @click="goToday" />
            </div>
            <div class="scheduler-toolbar-ui-title">{{ toolbar.title }}</div>
            <div class="scheduler-toolbar-ui-actions">
                <slot name="view-selector" :view="toolbar.view" :view-options="resolvedViewOptions" :change-view="changeView">
                    <Select
                        v-if="hasViewSelector"
                        class="scheduler-toolbar-ui-view-select"
                        :model-value="toolbar.view"
                        :options="resolvedViewOptions"
                        option-label="label"
                        option-value="value"
                        :aria-label="toolbar.viewSelectorAriaLabel"
                        @update:model-value="changeView"
                    />
                    <span v-else-if="hasViewLabel" class="scheduler-toolbar-ui-view-label">{{ viewLabel }}</span>
                </slot>
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>
