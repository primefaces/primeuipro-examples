<script setup lang="ts">
import { useSchedulerEventPopoverContext, type SchedulerEvent, type SchedulerResource, type SchedulerViewType } from '@primeui/vue-scheduler';
import Button from 'primevue/button';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

type SchedulerEventPopoverUIProps = {
    event?: SchedulerEvent | null;
    view?: SchedulerViewType | string;
    resource?: SchedulerResource | null;
    formattedTime?: string;
    formattedDate?: string;
    formattedDuration?: string;
    close?: () => void;
};

const context = useSchedulerEventPopoverContext();
const popover = computed<SchedulerEventPopoverUIProps>(() => context.value);
const accent = computed(() => popover.value.event?.color ?? popover.value.event?.borderColor ?? 'var(--p-primary-color)');
const rootStyle = computed<Record<string, string>>(() => ({
    '--scheduler-overlay-ui-accent': accent.value
}));
const description = computed(() => {
    const value = popover.value.event?.metadata?.description;

    return value == null ? '' : String(value);
});
const location = computed(() => {
    const value = popover.value.event?.metadata?.location;

    return value == null ? '' : String(value);
});
const hasMeta = computed(() => Boolean(popover.value.formattedTime || popover.value.formattedDate || popover.value.formattedDuration || popover.value.resource || description.value || location.value));
</script>

<template>
    <article class="scheduler-overlay-ui scheduler-overlay-ui-popover" :style="rootStyle" v-bind="$attrs">
        <header class="scheduler-overlay-ui-header">
            <span class="scheduler-overlay-ui-marker" aria-hidden="true" />
            <div class="scheduler-overlay-ui-heading">
                <span class="scheduler-overlay-ui-title">{{ popover.event?.title }}</span>
                <span v-if="popover.view" class="scheduler-overlay-ui-kicker">{{ popover.view }}</span>
            </div>
            <Button v-if="popover.close" class="scheduler-overlay-ui-icon-button" icon="pi pi-times" text rounded size="small" aria-label="Close" @click="popover.close" />
        </header>
        <div v-if="hasMeta" class="scheduler-overlay-ui-body">
            <div v-if="popover.formattedTime" class="scheduler-overlay-ui-row">
                <i class="pi pi-clock" aria-hidden="true" />
                <span>{{ popover.formattedTime }}</span>
            </div>
            <div v-if="popover.formattedDate" class="scheduler-overlay-ui-row">
                <i class="pi pi-calendar" aria-hidden="true" />
                <span>{{ popover.formattedDate }}</span>
            </div>
            <div v-if="popover.formattedDuration" class="scheduler-overlay-ui-row">
                <i class="pi pi-stopwatch" aria-hidden="true" />
                <span>{{ popover.formattedDuration }}</span>
            </div>
            <div v-if="popover.resource" class="scheduler-overlay-ui-row">
                <i class="pi pi-map" aria-hidden="true" />
                <span>{{ popover.resource.title }}</span>
            </div>
            <p v-if="description" class="scheduler-overlay-ui-description">{{ description }}</p>
            <div v-if="location" class="scheduler-overlay-ui-row">
                <i class="pi pi-map-marker" aria-hidden="true" />
                <span>{{ location }}</span>
            </div>
        </div>
    </article>
</template>
