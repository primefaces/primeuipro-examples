<script setup lang="ts">
import type { SchedulerEvent, SchedulerResource } from '@primeui/vue-scheduler';
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

export interface EventFormValue {
    title: string;
    start: Date;
    end: Date;
    resourceId: string;
    color: string;
}

const props = defineProps<{ visible: boolean; event: SchedulerEvent | null; resources: SchedulerResource[]; defaultStart: Date }>();
const emit = defineEmits<{ 'update:visible': [value: boolean]; save: [value: EventFormValue]; delete: [event: SchedulerEvent] }>();
const dialog = ref<HTMLDialogElement | null>(null);
const titleInput = ref<HTMLInputElement | null>(null);
const submitted = ref(false);
const colors = [
    { label: 'Blue', value: 'rgb(37 99 235)' },
    { label: 'Green', value: 'rgb(5 150 105)' },
    { label: 'Purple', value: 'rgb(147 51 234)' },
    { label: 'Orange', value: 'rgb(234 88 12)' }
];
const draft = ref({ title: '', start: '', end: '', resourceId: '', color: colors[0]!.value });
const isEditing = computed(() => props.event !== null);
const fieldClass = 'h-10 w-full rounded-md border border-surface-300 bg-white px-3 text-sm text-surface-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-surface-700 dark:bg-surface-950 dark:text-surface-100';

function localValue(value: Date | string | undefined, fallback: Date) {
    const date = value ? new Date(value) : new Date(fallback);
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    return local.toISOString().slice(0, 16);
}

function resetDraft() {
    submitted.value = false;
    const start = props.event?.start ? new Date(props.event.start) : new Date(props.defaultStart);
    if (!props.event) start.setHours(9, 0, 0, 0);
    const end = props.event?.end ? new Date(props.event.end) : new Date(start.getTime() + 3_600_000);
    draft.value = {
        title: props.event?.title ?? '',
        start: localValue(start, props.defaultStart),
        end: localValue(end, new Date(start.getTime() + 3_600_000)),
        resourceId: String(props.event?.resourceId ?? props.resources[0]?.id ?? ''),
        color: props.event?.color ?? colors[0]!.value
    };
}

function closeDialog() { emit('update:visible', false); }
function saveEvent() {
    submitted.value = true;
    const start = new Date(draft.value.start);
    const end = new Date(draft.value.end);
    if (!draft.value.title.trim() || end <= start) return;
    emit('save', { ...draft.value, title: draft.value.title.trim(), start, end });
    closeDialog();
}
function deleteEvent() { if (props.event) emit('delete', props.event); closeDialog(); }

watch(() => props.visible, async (visible) => {
    document.body.style.overflow = visible ? 'hidden' : '';
    if (visible) { resetDraft(); await nextTick(); dialog.value?.showModal(); titleInput.value?.focus(); }
    else if (dialog.value?.open) dialog.value.close();
});
onBeforeUnmount(() => { document.body.style.overflow = ''; });
</script>

<template>
    <Teleport to="body">
        <dialog ref="dialog" class="fixed inset-0 m-auto max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-lg border border-surface-200 bg-white p-0 text-surface-900 shadow-2xl backdrop:bg-black/45 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-50" @cancel.prevent="closeDialog" @close="closeDialog">
            <div class="flex h-14 items-center justify-between border-b border-surface-200 px-5 dark:border-surface-700">
                <h2 class="m-0 text-base font-semibold">{{ isEditing ? 'Edit event' : 'Add event' }}</h2>
                <button type="button" class="inline-flex size-8 items-center justify-center rounded-md hover:bg-surface-100 dark:hover:bg-surface-800" aria-label="Close" @click="closeDialog"><i class="pi pi-times" /></button>
            </div>
            <form @submit.prevent="saveEvent">
                <div class="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                    <div class="sm:col-span-2"><label class="mb-1.5 block text-sm font-medium">Title</label><input ref="titleInput" v-model="draft.title" :class="fieldClass" /><small v-if="submitted && !draft.title.trim()" class="mt-1 block text-red-600">Title is required.</small></div>
                    <div><label class="mb-1.5 block text-sm font-medium">Start</label><input v-model="draft.start" type="datetime-local" :class="fieldClass" /></div>
                    <div><label class="mb-1.5 block text-sm font-medium">End</label><input v-model="draft.end" type="datetime-local" :class="fieldClass" /></div>
                    <div><label class="mb-1.5 block text-sm font-medium">Resource</label><select v-model="draft.resourceId" :class="fieldClass"><option v-for="resource in resources" :key="resource.id" :value="resource.id">{{ resource.title }}</option></select></div>
                    <div><label class="mb-1.5 block text-sm font-medium">Color</label><select v-model="draft.color" :class="fieldClass"><option v-for="color in colors" :key="color.value" :value="color.value">{{ color.label }}</option></select></div>
                    <small v-if="submitted && (!draft.title.trim() || new Date(draft.end) <= new Date(draft.start))" class="sm:col-span-2 text-red-600">Enter a title and keep the end after the start.</small>
                </div>
                <div class="flex items-center gap-2 border-t border-surface-200 px-5 py-4 dark:border-surface-700">
                    <button v-if="isEditing" type="button" class="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10" @click="deleteEvent"><i class="pi pi-trash text-xs" />Delete</button>
                    <div class="ml-auto flex gap-2"><button type="button" class="h-10 rounded-md border border-surface-300 px-4 text-sm font-semibold dark:border-surface-700" @click="closeDialog">Cancel</button><button type="submit" class="h-10 rounded-md bg-primary px-4 text-sm font-semibold text-white dark:text-surface-950">{{ isEditing ? 'Save changes' : 'Add event' }}</button></div>
                </div>
            </form>
        </dialog>
    </Teleport>
</template>
