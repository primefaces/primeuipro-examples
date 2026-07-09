<script setup lang="ts">
import { TaskBoard, type TaskBoardExpose, type TaskBoardItem } from '@primeui/vue-taskboard';
import Button from 'primevue/button';
import { ref, watch } from 'vue';
import { TaskBoardCardAdvancedUI, TaskBoardColumnHeaderUI, TaskBoardSwimlaneColumnHeaderUI, TaskBoardSwimlaneHeaderUI } from '~/components/primeui/taskboard';
import { createDemoTasks, demoColumns, demoSwimlanes, type DemoTask, type DemoTaskFormValue } from './data';
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

function nextOrder(columnId: string | number, teamId: string | number) {
    return tasks.value.filter((task) => String(task.columnId) === String(columnId) && String(task.teamId) === String(teamId)).length;
}

function saveTask(value: DemoTaskFormValue) {
    const existing = editingTask.value;
    const placementChanged = existing && (String(existing.columnId) !== String(value.columnId) || String(existing.teamId) !== String(value.teamId));
    const category = value.category || 'General';
    const teamId = String(value.teamId || demoSwimlanes[0]?.id || '');
    const task: DemoTask = {
        ...existing,
        ...value,
        id: existing?.id ?? `PUI-${Date.now().toString(36).toUpperCase()}`,
        columnId: String(value.columnId),
        teamId,
        category,
        tags: [category],
        order: !existing || placementChanged ? nextOrder(value.columnId, teamId) : existing.order
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
            <Button type="button" size="small" @click="openCreate">
                <i class="pi pi-plus text-xs" aria-hidden="true" />
                <span>Add task</span>
            </Button>
        </div>

        <TaskBoard.Root
            ref="boardRef"
            v-model:tasks="tasks"
            class="swimlane-taskboard"
            data-key="id"
            column-field="columnId"
            swimlane-field="teamId"
            :swimlanes="demoSwimlanes"
            @card-activate="({ card }) => openEdit(card)"
        >
            <TaskBoard.Content>
                <TaskBoard.SwimlaneColumnHeader v-slot="{ column, itemCount }">
                    <TaskBoardSwimlaneColumnHeaderUI v-if="column" :column="column" :task-count="itemCount" />
                </TaskBoard.SwimlaneColumnHeader>
                <TaskBoard.SwimlaneHeader v-slot="{ swimlane, itemCount, isCollapsed, toggleCollapse }">
                    <TaskBoardSwimlaneHeaderUI v-if="swimlane" :swimlane="swimlane" :task-count="itemCount" :is-collapsed="isCollapsed" :toggle-collapse="toggleCollapse" />
                </TaskBoard.SwimlaneHeader>
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

        <TaskEditorDialog v-model:visible="editorVisible" :task="editingTask" :columns="demoColumns" :swimlanes="demoSwimlanes" @save="saveTask" @delete="deleteTask" />
    </div>
</template>

<style scoped>
.swimlane-taskboard {
    flex: 1;
    min-height: 0;
    --p-taskboard-swimlane-header-width: 11rem;
    --p-taskboard-column-min-width: 15.5rem;
    --p-taskboard-column-max-width: 17rem;
    --p-taskboard-columns-padding: 0.75rem;
    --p-taskboard-column-gap: 0.75rem;
    --p-taskboard-column-body-padding: 0.5rem;
    --p-taskboard-card-gap: 0.5rem;
    --p-taskboard-swimlane-min-height: 10rem;
}
</style>
