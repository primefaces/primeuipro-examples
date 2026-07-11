<script setup lang="ts">
import { useSchedulerEventPopoverContext, type SchedulerEvent } from '@primeui/vue-scheduler';
import Button from 'primevue/button';
import { computed } from 'vue';

const emit = defineEmits<{
    edit: [event: SchedulerEvent];
    delete: [event: SchedulerEvent];
}>();

const context = useSchedulerEventPopoverContext();
const popover = computed(() => context.value);
const event = computed(() => popover.value.event ?? null);
const accent = computed(() => event.value?.color ?? event.value?.borderColor ?? 'var(--p-primary-color)');
const rootStyle = computed<Record<string, string>>(() => ({ '--scheduler-overlay-ui-accent': accent.value }));

function editEvent() {
    if (!event.value) return;

    const value = event.value;
    popover.value.close?.();
    emit('edit', value);
}

function deleteEvent() {
    if (!event.value) return;

    const value = event.value;
    popover.value.close?.();
    emit('delete', value);
}
</script>

<template>
    <article class="scheduler-overlay-ui scheduler-overlay-ui-popover" :style="rootStyle">
        <header class="scheduler-overlay-ui-header">
            <span class="scheduler-overlay-ui-marker" aria-hidden="true" />
            <div class="scheduler-overlay-ui-heading">
                <span class="scheduler-overlay-ui-title">{{ event?.title }}</span>
                <span v-if="popover.formattedDate" class="scheduler-overlay-ui-kicker">{{ popover.formattedDate }}</span>
            </div>
            <Button class="scheduler-overlay-ui-icon-button" icon="pi pi-times" text rounded size="small" aria-label="Close" @click="popover.close?.()" />
        </header>

        <div class="scheduler-overlay-ui-body">
            <div v-if="popover.formattedTime" class="scheduler-overlay-ui-row">
                <i class="pi pi-clock" aria-hidden="true" />
                <span>{{ popover.formattedTime }}</span>
            </div>
            <div v-if="popover.resource" class="scheduler-overlay-ui-row">
                <i class="pi pi-map-marker" aria-hidden="true" />
                <span>{{ popover.resource.title }}</span>
            </div>
        </div>

        <footer class="scheduler-overlay-ui-footer">
            <div class="scheduler-overlay-ui-actions">
                <Button label="Delete" icon="pi pi-trash" severity="danger" text size="small" @click="deleteEvent" />
                <Button label="Edit" icon="pi pi-pencil" size="small" @click="editEvent" />
            </div>
        </footer>
    </article>
</template>
