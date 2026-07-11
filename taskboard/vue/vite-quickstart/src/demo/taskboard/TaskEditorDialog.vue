<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import { computed, ref, watch } from 'vue';
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

const submitted = ref(false);
const draft = ref<DemoTaskFormValue>(emptyDraft());
const dialogVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
});
const isEditing = computed(() => props.task !== null);
const dialogTitle = computed(() => (isEditing.value ? 'Edit task' : 'Add task'));

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
    dialogVisible.value = false;
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
    (visible) => {
        if (visible) resetDraft();
    }
);
</script>

<template>
    <Dialog v-model:visible="dialogVisible" modal :header="dialogTitle" :style="{ width: 'min(36rem, calc(100vw - 2rem))' }">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="sm:col-span-2">
                <label for="task-title" class="mb-1.5 block text-sm font-medium text-[var(--app-text)]">Title</label>
                <InputText id="task-title" v-model="draft.title" class="w-full" :invalid="submitted && !draft.title.trim()" autofocus />
                <small v-if="submitted && !draft.title.trim()" class="mt-1 block text-red-600 dark:text-red-400">Title is required.</small>
            </div>

            <div class="sm:col-span-2">
                <label for="task-description" class="mb-1.5 block text-sm font-medium text-[var(--app-text)]">Description</label>
                <Textarea id="task-description" v-model="draft.description" rows="3" class="w-full resize-none" />
            </div>

            <div>
                <label for="task-column" class="mb-1.5 block text-sm font-medium text-[var(--app-text)]">Column</label>
                <Select id="task-column" v-model="draft.columnId" :options="columns" optionLabel="label" optionValue="id" class="w-full" />
            </div>

            <div>
                <label for="task-priority" class="mb-1.5 block text-sm font-medium text-[var(--app-text)]">Priority</label>
                <Select id="task-priority" v-model="draft.priority" :options="priorityOptions" optionLabel="label" optionValue="value" class="w-full" />
            </div>

            <div>
                <label for="task-category" class="mb-1.5 block text-sm font-medium text-[var(--app-text)]">Category</label>
                <InputText id="task-category" v-model="draft.category" class="w-full" placeholder="e.g. Design" />
            </div>

            <div>
                <label for="task-assignee" class="mb-1.5 block text-sm font-medium text-[var(--app-text)]">Assignee</label>
                <InputText id="task-assignee" v-model="draft.assignee" class="w-full" placeholder="Full name" />
            </div>

            <div>
                <label for="task-due-date" class="mb-1.5 block text-sm font-medium text-[var(--app-text)]">Due date</label>
                <InputText id="task-due-date" v-model="draft.dueDate" type="date" class="w-full" />
            </div>
        </div>

        <template #footer>
            <div class="flex w-full flex-wrap items-center justify-between gap-2">
                <Button v-if="isEditing" type="button" size="small" severity="danger" variant="text" @click="deleteTask">
                    <i class="pi pi-trash text-xs" aria-hidden="true" />
                    <span>Delete</span>
                </Button>
                <div class="ml-auto flex gap-2">
                    <Button type="button" size="small" severity="secondary" variant="outlined" @click="closeDialog">Cancel</Button>
                    <Button type="button" size="small" @click="saveTask">{{ isEditing ? 'Save changes' : 'Add task' }}</Button>
                </div>
            </div>
        </template>
    </Dialog>
</template>
