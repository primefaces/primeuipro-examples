<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import type { DemoColumn, DemoTask, DemoTaskFormValue } from './data';

const props = defineProps<{
    visible: boolean;
    task: DemoTask | null;
    columns: DemoColumn[];
}>();

const emit = defineEmits<{
    'update:visible': [value: boolean];
    save: [value: DemoTaskFormValue];
    delete: [id: string];
}>();

const priorityOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' }
];

const dialog = ref<HTMLDialogElement | null>(null);
const titleInput = ref<HTMLInputElement | null>(null);
const submitted = ref(false);
const draft = ref<DemoTaskFormValue>(emptyDraft());
const isEditing = computed(() => props.task !== null);
const dialogTitle = computed(() => (isEditing.value ? 'Edit task' : 'Add task'));
const fieldClass =
    'h-10 w-full rounded-md border border-surface-300 bg-surface-0 px-3 text-sm text-surface-900 outline-none transition-colors placeholder:text-surface-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-surface-700 dark:bg-surface-950 dark:text-surface-100';

function emptyDraft(): DemoTaskFormValue {
    return {
        title: '',
        description: '',
        columnId: props.columns[0]?.id ?? '',
        category: '',
        priority: 'medium',
        assignee: '',
        dueDate: ''
    };
}

function resetDraft() {
    submitted.value = false;
    draft.value = props.task
        ? {
              title: props.task.title,
              description: props.task.description ?? '',
              columnId: props.task.columnId,
              category: props.task.category,
              priority: props.task.priority,
              assignee: props.task.assignee,
              dueDate: props.task.dueDate
          }
        : emptyDraft();
}

function closeDialog() {
    emit('update:visible', false);
}

function onDialogClose() {
    if (props.visible) emit('update:visible', false);
}

function onDialogPointerDown(event: PointerEvent) {
    if (event.target === event.currentTarget) closeDialog();
}

function saveTask() {
    submitted.value = true;
    if (!draft.value.title.trim()) return;

    emit('save', {
        ...draft.value,
        title: draft.value.title.trim(),
        description: draft.value.description.trim(),
        category: draft.value.category.trim() || 'General',
        assignee: draft.value.assignee.trim()
    });
    closeDialog();
}

function deleteTask() {
    if (!props.task) return;
    emit('delete', props.task.id);
    closeDialog();
}

watch(
    () => props.visible,
    async (visible) => {
        if (import.meta.client) document.body.style.overflow = visible ? 'hidden' : '';
        if (visible) {
            resetDraft();
            await nextTick();
            if (!dialog.value?.open) dialog.value?.showModal();
            titleInput.value?.focus();
        } else if (dialog.value?.open) {
            dialog.value.close();
        }
    }
);

onBeforeUnmount(() => {
    if (import.meta.client) document.body.style.overflow = '';
    if (dialog.value?.open) dialog.value.close();
});
</script>

<template>
    <Teleport to="body">
        <dialog
            ref="dialog"
            aria-labelledby="task-dialog-title"
            class="fixed inset-0 m-auto max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-lg border border-surface-200 bg-surface-0 p-0 text-surface-900 shadow-2xl backdrop:bg-black/45 backdrop:backdrop-blur-[2px] dark:border-surface-700 dark:bg-surface-900 dark:text-surface-50"
            @cancel.prevent="closeDialog"
            @close="onDialogClose"
            @pointerdown="onDialogPointerDown"
        >
            <div class="flex h-14 items-center justify-between border-b border-surface-200 px-5 dark:border-surface-700">
                <h2 id="task-dialog-title" class="m-0 text-base font-semibold text-surface-900 dark:text-surface-50">{{ dialogTitle }}</h2>
                <button type="button" class="inline-flex size-8 items-center justify-center rounded-md text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-surface-800 dark:hover:text-surface-100" aria-label="Close" @click="closeDialog">
                    <i class="pi pi-times text-sm" aria-hidden="true" />
                </button>
            </div>

            <form @submit.prevent="saveTask">
                <div class="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                    <div class="sm:col-span-2">
                        <label for="task-title" class="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-200">Title</label>
                        <input ref="titleInput" id="task-title" v-model="draft.title" type="text" :class="fieldClass" :aria-invalid="submitted && !draft.title.trim()" />
                        <small v-if="submitted && !draft.title.trim()" class="mt-1 block text-red-600 dark:text-red-400">Title is required.</small>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="task-description" class="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-200">Description</label>
                        <textarea id="task-description" v-model="draft.description" rows="3" :class="[fieldClass, 'h-auto resize-none py-2.5']" />
                    </div>

                    <div>
                        <label for="task-column" class="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-200">Column</label>
                        <select id="task-column" v-model="draft.columnId" :class="fieldClass">
                            <option v-for="column in columns" :key="column.id" :value="column.id">{{ column.label }}</option>
                        </select>
                    </div>

                    <div>
                        <label for="task-priority" class="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-200">Priority</label>
                        <select id="task-priority" v-model="draft.priority" :class="fieldClass">
                            <option v-for="option in priorityOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                        </select>
                    </div>

                    <div>
                        <label for="task-category" class="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-200">Category</label>
                        <input id="task-category" v-model="draft.category" type="text" :class="fieldClass" placeholder="e.g. Design" />
                    </div>

                    <div>
                        <label for="task-assignee" class="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-200">Assignee</label>
                        <input id="task-assignee" v-model="draft.assignee" type="text" :class="fieldClass" placeholder="Full name" />
                    </div>

                    <div>
                        <label for="task-due-date" class="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-200">Due date</label>
                        <input id="task-due-date" v-model="draft.dueDate" type="date" :class="fieldClass" />
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-2 border-t border-surface-200 px-5 py-4 dark:border-surface-700">
                    <button v-if="isEditing" type="button" class="inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:text-red-400 dark:hover:bg-red-500/10" @click="deleteTask">
                        <i class="pi pi-trash text-xs" aria-hidden="true" />
                        <span>Delete</span>
                    </button>
                    <div class="ml-auto flex gap-2">
                        <button type="button" class="inline-flex h-9 items-center rounded-md border border-surface-300 px-3 text-sm font-semibold text-surface-700 transition-colors hover:bg-surface-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-surface-700 dark:text-surface-200 dark:hover:bg-surface-800" @click="closeDialog">Cancel</button>
                        <button type="submit" class="inline-flex h-9 items-center rounded-md bg-primary px-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-surface-950">{{ isEditing ? 'Save changes' : 'Add task' }}</button>
                    </div>
                </div>
            </form>
        </dialog>
    </Teleport>
</template>
