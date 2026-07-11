<script setup lang="ts">
import type { SchedulerEvent, SchedulerResource } from '@primeui/vue-scheduler';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { computed, ref, watch } from 'vue';

export interface EventFormValue {
    title: string;
    start: Date;
    end: Date;
    resourceId: string;
    color: string;
}

const props = defineProps<{
    visible: boolean;
    event: SchedulerEvent | null;
    resources: SchedulerResource[];
    defaultStart: Date;
}>();

const emit = defineEmits<{
    'update:visible': [value: boolean];
    save: [value: EventFormValue];
    delete: [event: SchedulerEvent];
}>();

const colorOptions = [
    { label: 'Blue', value: 'rgb(37 99 235)' },
    { label: 'Green', value: 'rgb(5 150 105)' },
    { label: 'Purple', value: 'rgb(147 51 234)' },
    { label: 'Orange', value: 'rgb(234 88 12)' }
];
const submitted = ref(false);
const draft = ref<EventFormValue>(emptyDraft());
const dialogVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
});
const isEditing = computed(() => props.event !== null);
const canSave = computed(() => draft.value.title.trim().length > 0 && draft.value.end.getTime() > draft.value.start.getTime());

function asDate(value: Date | string | undefined, fallback: Date) {
    if (!value) return new Date(fallback);
    return value instanceof Date ? new Date(value) : new Date(value);
}

function emptyDraft(): EventFormValue {
    const start = new Date(props.defaultStart);
    start.setHours(9, 0, 0, 0);

    return {
        title: '',
        start,
        end: new Date(start.getTime() + 60 * 60 * 1000),
        resourceId: String(props.resources[0]?.id ?? ''),
        color: colorOptions[0]!.value
    };
}

function resetDraft() {
    submitted.value = false;

    if (!props.event) {
        draft.value = emptyDraft();
        return;
    }

    const start = asDate(props.event.start, props.defaultStart);
    draft.value = {
        title: props.event.title,
        start,
        end: asDate(props.event.end, new Date(start.getTime() + 60 * 60 * 1000)),
        resourceId: String(props.event.resourceId ?? props.resources[0]?.id ?? ''),
        color: props.event.color ?? colorOptions[0]!.value
    };
}

function saveEvent() {
    submitted.value = true;
    if (!canSave.value) return;

    emit('save', { ...draft.value, title: draft.value.title.trim() });
    dialogVisible.value = false;
}

function deleteEvent() {
    if (!props.event) return;

    emit('delete', props.event);
    dialogVisible.value = false;
}

watch(
    () => props.visible,
    (visible) => {
        if (visible) resetDraft();
    }
);
</script>

<template>
    <Dialog v-model:visible="dialogVisible" modal :header="isEditing ? 'Edit event' : 'Add event'" :style="{ width: 'min(36rem, calc(100vw - 2rem))' }">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="sm:col-span-2">
                <label for="event-title" class="mb-1.5 block text-sm font-medium text-[var(--app-text)]">Title</label>
                <InputText id="event-title" v-model="draft.title" class="w-full" :invalid="submitted && !draft.title.trim()" autofocus />
                <small v-if="submitted && !draft.title.trim()" class="mt-1 block text-red-600 dark:text-red-400">Title is required.</small>
            </div>

            <div>
                <label for="event-start" class="mb-1.5 block text-sm font-medium text-[var(--app-text)]">Start</label>
                <DatePicker id="event-start" v-model="draft.start" show-time hour-format="12" fluid />
            </div>
            <div>
                <label for="event-end" class="mb-1.5 block text-sm font-medium text-[var(--app-text)]">End</label>
                <DatePicker id="event-end" v-model="draft.end" show-time hour-format="12" fluid />
            </div>

            <div>
                <label for="event-resource" class="mb-1.5 block text-sm font-medium text-[var(--app-text)]">Resource</label>
                <Select id="event-resource" v-model="draft.resourceId" :options="resources" option-label="title" option-value="id" class="w-full" />
            </div>
            <div>
                <label for="event-color" class="mb-1.5 block text-sm font-medium text-[var(--app-text)]">Color</label>
                <Select id="event-color" v-model="draft.color" :options="colorOptions" option-label="label" option-value="value" class="w-full">
                    <template #option="slotProps">
                        <span class="inline-flex items-center gap-2"><span class="size-2.5 rounded-full" :style="{ backgroundColor: slotProps.option.value }" />{{ slotProps.option.label }}</span>
                    </template>
                </Select>
            </div>

            <small v-if="submitted && !canSave" class="sm:col-span-2 text-red-600 dark:text-red-400">Enter a title and keep the end time after the start time.</small>
        </div>

        <template #footer>
            <div class="flex w-full flex-wrap items-center justify-between gap-2">
                <Button v-if="isEditing" type="button" size="small" severity="danger" variant="text" icon="pi pi-trash" label="Delete" @click="deleteEvent" />
                <div class="ml-auto flex gap-2">
                    <Button type="button" size="small" severity="secondary" variant="outlined" label="Cancel" @click="dialogVisible = false" />
                    <Button type="button" size="small" :label="isEditing ? 'Save changes' : 'Add event'" @click="saveEvent" />
                </div>
            </div>
        </template>
    </Dialog>
</template>
