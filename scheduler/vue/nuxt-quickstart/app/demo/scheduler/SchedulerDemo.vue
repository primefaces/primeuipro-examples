<script setup lang="ts">
import {
    Scheduler,
    type EventDropPayload,
    type EventResizeStopPayload,
    type SchedulerEvent,
    type SchedulerViewType
} from '@primeui/vue-scheduler';
import Button from 'primevue/button';
import { ref } from 'vue';
import {
    SchedulerAllDayEventUI,
    SchedulerEventPopoverUI,
    SchedulerMonthEventUI,
    SchedulerResourceAggregateBadgeUI,
    SchedulerResourceColumnHeaderUI,
    SchedulerResourceHeaderUI,
    SchedulerResourceRowUI,
    SchedulerTimeGridEventUI,
    SchedulerTimelineEventUI,
    SchedulerToolbarUI
} from '@/components/primeui/scheduler';
import { demoDate, events, resources } from './data';
import EventEditorDialog, { type EventFormValue } from './EventEditorDialog.vue';

const date = ref(new Date(demoDate));
const currentView = ref<SchedulerViewType>('week');
const views: SchedulerViewType[] = ['month', 'week', 'resourceTimelineWeek'];
const firstDayOfWeek = demoDate.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
const schedulerEvents = ref<SchedulerEvent[]>(events.map((event) => ({ ...event })));
const editorVisible = ref(false);
const editingEvent = ref<SchedulerEvent | null>(null);
let nextEventId = 1;

function onViewChange(payload: { view: SchedulerViewType }) {
    currentView.value = payload.view;
}

function onDateChange(value: Date) {
    date.value = value;
}

function openCreateDialog() {
    editingEvent.value = null;
    editorVisible.value = true;
}

function saveEvent(value: EventFormValue) {
    const existing = editingEvent.value;
    const savedEvent: SchedulerEvent = {
        ...existing,
        id: existing?.id ?? `event-${nextEventId++}`,
        title: value.title,
        start: new Date(value.start),
        end: new Date(value.end),
        resourceId: value.resourceId,
        color: value.color
    };

    schedulerEvents.value = existing
        ? schedulerEvents.value.map((event) => (event.id === existing.id ? savedEvent : event))
        : [...schedulerEvents.value, savedEvent];
}

function deleteEvent(event: SchedulerEvent) {
    schedulerEvents.value = schedulerEvents.value.filter((item) => item.id !== event.id);
    if (editingEvent.value?.id === event.id) editingEvent.value = null;
}

function updateEvent(event: SchedulerEvent) {
    schedulerEvents.value = schedulerEvents.value.map((item) => (item.id === event.id ? { ...item, ...event } : item));
}

function onEventDrop(payload: EventDropPayload) {
    updateEvent(payload.event);
}

function onEventResizeStop(payload: EventResizeStopPayload) {
    updateEvent(payload.event);
}
</script>

<template>
    <Scheduler.Root
        class="border-0 rounded-[inherit]"
        :view="currentView"
        :views="views"
        :date="date"
        :events="schedulerEvents"
        :resources="resources"
        editable
        event-start-editable
        event-duration-editable
        event-popover
        event-popover-show-on-mobile
        resource-area-width="min(220px, 38vw)"
        resources-initially-expanded
        row-auto-height
        slot-min-time="07:00"
        slot-max-time="19:00"
        :slot-duration="30"
        :timeline-slot-width="96"
        :timeline-slot-duration="60"
        :first-day-of-week="firstDayOfWeek"
        :now-indicator="false"
        :max-events-visible="3"
        event-shell="none"
        height="100%"
        aria-label="Team operations scheduler"
        @view-change="onViewChange"
        @date-change="onDateChange"
        @event-drop="onEventDrop"
        @event-resize-stop="onEventResizeStop"
    >
        <Scheduler.Header>
            <SchedulerToolbarUI>
                <template #actions>
                    <Button class="shrink-0 whitespace-nowrap" label="Add event" icon="pi pi-plus" @click="openCreateDialog" />
                </template>
            </SchedulerToolbarUI>
        </Scheduler.Header>

        <Scheduler.Content>
            <Scheduler.TimeGridEvent><SchedulerTimeGridEventUI /></Scheduler.TimeGridEvent>
            <Scheduler.AllDayEvent><SchedulerAllDayEventUI /></Scheduler.AllDayEvent>
            <Scheduler.MonthEvent><SchedulerMonthEventUI /></Scheduler.MonthEvent>
            <Scheduler.TimelineEvent><SchedulerTimelineEventUI /></Scheduler.TimelineEvent>
            <Scheduler.ResourceHeader><SchedulerResourceHeaderUI /></Scheduler.ResourceHeader>
            <Scheduler.ResourceAreaHeader><SchedulerResourceHeaderUI /></Scheduler.ResourceAreaHeader>
            <Scheduler.ResourceColumnHeader><SchedulerResourceColumnHeaderUI /></Scheduler.ResourceColumnHeader>
            <Scheduler.ResourceRow><SchedulerResourceRowUI /></Scheduler.ResourceRow>
            <Scheduler.ResourceGroup><SchedulerResourceRowUI /></Scheduler.ResourceGroup>
            <Scheduler.ResourceAggregateBadge><SchedulerResourceAggregateBadgeUI /></Scheduler.ResourceAggregateBadge>
        </Scheduler.Content>
        <Scheduler.Popover>
            <SchedulerEventPopoverUI />
        </Scheduler.Popover>
    </Scheduler.Root>

    <EventEditorDialog
        v-model:visible="editorVisible"
        :event="editingEvent"
        :resources="resources"
        :default-start="date"
        @save="saveEvent"
        @delete="deleteEvent"
    />
</template>
