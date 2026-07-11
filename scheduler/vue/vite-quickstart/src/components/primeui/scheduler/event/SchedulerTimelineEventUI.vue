<script setup lang="ts">
import { isSchedulerAutoTextColor, useSchedulerEventContext, type SchedulerEvent } from '@primeui/vue-scheduler';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

defineOptions({ inheritAttrs: false });

const TIMELINE_EVENT_CONTENT_SAFE_PADDING = 16;

type SchedulerTimelineEventUIProps = {
    event?: SchedulerEvent;
    variant?: 'timeline' | 'timeline-year' | 'drag-preview' | string;
    density?: 'minimal' | 'compact' | 'default' | 'comfortable' | string;
    availableHeight?: number;
    availableWidth?: number;
    view?: string;
    isSelected?: boolean;
    isDragging?: boolean;
    isResizing?: boolean;
    isDropValid?: boolean;
    isMultiDrag?: boolean;
    selectedCount?: number;
    timeText?: string;
    accentColor?: string;
    contentOffset?: number;
    contentMaxWidth?: number;
};

const context = useSchedulerEventContext();
const eventUi = computed<SchedulerTimelineEventUIProps>(() => {
    const value = context.value;

    if (!value || (value.surface !== 'timeline' && value.surface !== 'timeline-year')) {
        return {};
    }

    return {
        event: value.event,
        variant: value.variant ?? value.surface,
        density: value.density,
        availableHeight: value.availableHeight,
        availableWidth: value.availableWidth,
        view: value.view,
        isSelected: value.isSelected,
        isDragging: value.isDragging,
        isResizing: value.isResizing,
        isDropValid: value.isDropValid,
        isMultiDrag: value.isMultiDrag,
        selectedCount: value.selectedCount,
        timeText: value.timeText ?? value.formattedTime,
        accentColor: value.accentColor,
        contentOffset: value.contentOffset,
        contentMaxWidth: value.contentMaxWidth
    };
});
const accent = computed(() => eventUi.value.accentColor ?? eventUi.value.event?.color ?? eventUi.value.event?.borderColor ?? 'var(--p-primary-color)');
const isYear = computed(() => eventUi.value.variant === 'timeline-year');
const explicitTextColor = computed(() => (isSchedulerAutoTextColor(eventUi.value.event) ? undefined : eventUi.value.event?.textColor));
const hasEnoughWidthForTime = computed(() => isYear.value || eventUi.value.availableWidth == null || eventUi.value.availableWidth >= 140);
const showTime = computed(() => Boolean(eventUi.value.timeText && !eventUi.value.event?.allDay && eventUi.value.density !== 'minimal' && hasEnoughWidthForTime.value));
const contentRef = ref<HTMLElement | null>(null);
const contentNaturalWidth = ref(0);
let resizeObserver: ResizeObserver | null = null;
const defaultRootClasses = computed(() => [
    'scheduler-timeline-event-ui',
    isYear.value && 'scheduler-timeline-event-ui--year',
    eventUi.value.density && `scheduler-timeline-event-ui--density-${eventUi.value.density}`,
    eventUi.value.isSelected && 'scheduler-timeline-event-ui-selected',
    eventUi.value.isDragging && 'scheduler-timeline-event-ui-dragging',
    eventUi.value.isResizing && 'scheduler-timeline-event-ui-resizing',
    eventUi.value.isDropValid === false && 'scheduler-timeline-event-ui-invalid-drop',
    eventUi.value.isMultiDrag && 'scheduler-timeline-event-ui-multi-drag'
]);
const rootStyle = computed<Record<string, string>>(() => ({
    '--scheduler-timeline-event-ui-accent': accent.value,
    '--scheduler-timeline-event-ui-color': explicitTextColor.value ?? 'var(--p-text-color)',
    '--scheduler-timeline-event-ui-time-color': explicitTextColor.value ?? 'var(--p-text-muted-color)'
}));
const resolvedContentLayout = computed(() => {
    if (isYear.value) {
        return { offset: 0, maxWidth: undefined };
    }

    const availableWidth = finiteNonNegative(eventUi.value.availableWidth);
    const safeAvailableWidth = availableWidth == null ? undefined : Math.max(0, availableWidth - TIMELINE_EVENT_CONTENT_SAFE_PADDING);
    const contentLimit = minDefined(finiteNonNegative(eventUi.value.contentMaxWidth), safeAvailableWidth);
    const measuredWidth = finiteNonNegative(contentNaturalWidth.value);
    const contentWidth = minDefined(measuredWidth && measuredWidth > 0 ? measuredWidth : contentLimit, contentLimit);
    const desiredOffset = Number.isFinite(eventUi.value.contentOffset) ? eventUi.value.contentOffset! : 0;
    const sign = desiredOffset < 0 ? -1 : 1;
    const maxOffset = availableWidth != null && contentWidth != null ? Math.max(0, availableWidth - contentWidth - TIMELINE_EVENT_CONTENT_SAFE_PADDING) : Math.abs(desiredOffset);
    const offset = sign * Math.min(Math.abs(desiredOffset), maxOffset);

    return { offset, maxWidth: contentLimit };
});
const contentStyle = computed<Record<string, string>>(() => {
    const style: Record<string, string> = {};
    const layout = resolvedContentLayout.value;

    if (!isYear.value) {
        style.transform = `translate3d(${layout.offset}px, 0, 0)`;
    }

    if (layout.maxWidth != null) {
        style.maxWidth = `${layout.maxWidth}px`;
    }

    return style;
});

function finiteNonNegative(value: unknown) {
    return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, value) : undefined;
}

function minDefined(...values: Array<number | undefined>) {
    const finiteValues = values.filter((value): value is number => value !== undefined);

    if (!finiteValues.length) return undefined;

    return Math.min(...finiteValues);
}

function measureContent() {
    const el = contentRef.value;

    if (!el) {
        contentNaturalWidth.value = 0;

        return;
    }

    const childWidths = Array.from(el.children)
        .map((child) => (child instanceof HTMLElement ? measureInlineContentWidth(child) : 0))
        .filter((width) => width > 0);

    contentNaturalWidth.value = Math.ceil(childWidths.length ? Math.max(...childWidths) : el.scrollWidth);
}

function measureInlineContentWidth(el: HTMLElement) {
    if (typeof document !== 'undefined' && typeof document.createRange === 'function') {
        const range = document.createRange();

        range.selectNodeContents(el);

        const width = typeof range.getBoundingClientRect === 'function' ? range.getBoundingClientRect().width : 0;

        range.detach?.();

        if (width > 0) return width;
    }

    return el.scrollWidth;
}

function observeContent() {
    resizeObserver?.disconnect();
    resizeObserver = null;

    const el = contentRef.value;

    if (!el || typeof ResizeObserver === 'undefined') return;

    resizeObserver = new ResizeObserver(measureContent);
    resizeObserver.observe(el);

    for (const child of Array.from(el.children)) {
        if (child instanceof HTMLElement) {
            resizeObserver.observe(child);
        }
    }
}

onMounted(() => {
    measureContent();
    observeContent();
});

onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    resizeObserver = null;
});

watch([() => eventUi.value.event?.title, () => eventUi.value.timeText, showTime, () => eventUi.value.availableWidth, () => eventUi.value.contentMaxWidth], async () => {
    await nextTick();
    measureContent();
    observeContent();
});
</script>

<template>
    <div :class="defaultRootClasses" :style="rootStyle" v-bind="$attrs">
        <span v-if="!isYear" class="scheduler-timeline-event-ui-marker" aria-hidden="true" />
        <span ref="contentRef" class="scheduler-timeline-event-ui-content" :style="contentStyle">
            <span class="scheduler-timeline-event-ui-title">{{ eventUi.event?.title }}</span>
            <span v-if="showTime" class="scheduler-timeline-event-ui-time">{{ eventUi.timeText }}</span>
        </span>
        <span v-if="eventUi.isMultiDrag && eventUi.selectedCount" class="scheduler-timeline-event-ui-badge" aria-hidden="true">{{ eventUi.selectedCount }}</span>
    </div>
</template>
