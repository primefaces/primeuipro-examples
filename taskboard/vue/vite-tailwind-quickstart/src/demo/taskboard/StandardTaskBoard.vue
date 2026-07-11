<script setup lang="ts">
import { TaskBoard, type TaskBoardExpose, type TaskBoardItem } from '@primeui/vue-taskboard';
import { ref, watch } from 'vue';
import { TaskBoardCardAdvancedUI, TaskBoardColumnHeaderUI } from '@/components/primeui/taskboard';
import { createDemoTasks, demoColumns, type DemoTask, type DemoTaskFormValue } from './data';
import TaskEditorDialog from './TaskEditorDialog.vue';

const emit = defineEmits<{ 'update:task-count': [value: number] }>();
const tasks = ref(createDemoTasks());
const boardRef = ref<TaskBoardExpose | null>(null);
const editorVisible = ref(false);
const editingTask = ref<DemoTask | null>(null);

function openCreate() {
    editingTask.value = null;
    editorVisible.value = true;
}

function openEdit(task: TaskBoardItem) {
    editingTask.value = task as DemoTask;
    editorVisible.value = true;
}

function nextOrder(columnId: string | number) {
    return tasks.value.filter((task) => String(task.columnId) === String(columnId)).length;
}

function saveTask(value: DemoTaskFormValue) {
    const existing = editingTask.value;
    const placementChanged = existing && String(existing.columnId) !== String(value.columnId);
    const category = value.category || 'General';
    const task: DemoTask = {
        ...existing,
        ...value,
        id: existing?.id ?? `PUI-${Date.now().toString(36).toUpperCase()}`,
        columnId: String(value.columnId),
        category,
        tags: [category],
        order: !existing || placementChanged ? nextOrder(value.columnId) : existing.order
    };

    if (existing) {
        boardRef.value?.updateTask(task);
    } else {
        boardRef.value?.addTask(task);
    }
}

function deleteTask(id: string) {
    boardRef.value?.removeTask(id);
}

watch(
    () => tasks.value.length,
    (count) => emit('update:task-count', count),
    { immediate: true }
);
</script>

<template>
    <div class="flex h-full min-h-0 flex-col">
        <div class="flex h-12 shrink-0 items-center justify-between border-b border-[var(--app-border)] px-3">
            <span class="text-xs font-medium text-[var(--app-text-muted)]">{{ tasks.length }} tasks</span>
            <button
                type="button"
                class="inline-flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-xs font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--app-panel)] dark:text-surface-950"
                @click="openCreate"
            >
                <i class="pi pi-plus text-xs" aria-hidden="true" />
                <span>Add task</span>
            </button>
        </div>

        <TaskBoard.Root
            ref="boardRef"
            v-model:tasks="tasks"
            class="standard-taskboard"
            data-key="id"
            column-field="columnId"
            :column-reorderable="true"
            @card-activate="({ card }) => openEdit(card)"
        >
            <TaskBoard.Content>
                <TaskBoard.Column v-for="column in demoColumns" :key="column.id" :label="column.label" :value="column.id" :column="column">
                    <TaskBoard.ColumnHeader v-slot="{ column: activeColumn, itemCount }">
                        <TaskBoardColumnHeaderUI :column="activeColumn" :task-count="itemCount" />
                    </TaskBoard.ColumnHeader>
                    <TaskBoard.ColumnContent v-slot="{ item }">
                        <TaskBoard.Card :item="item">
                            <TaskBoardCardAdvancedUI :task="item" @edit="openEdit" />
                        </TaskBoard.Card>
                    </TaskBoard.ColumnContent>
                </TaskBoard.Column>
            </TaskBoard.Content>
        </TaskBoard.Root>

        <TaskEditorDialog v-model:visible="editorVisible" :task="editingTask" :columns="demoColumns" @save="saveTask" @delete="deleteTask" />
    </div>
</template>

<style scoped>
.standard-taskboard {
    flex: 1;
    min-height: 0;
    --p-taskboard-column-min-width: 17rem;
    --p-taskboard-column-max-width: 19rem;
    --p-taskboard-columns-padding: 0.75rem;
    --p-taskboard-column-gap: 0.75rem;
    --p-taskboard-column-body-padding: 0.5rem;
    --p-taskboard-card-gap: 0.5rem;
}
</style>
