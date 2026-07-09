<script setup lang="ts">
import { computed } from 'vue';
import { useTaskBoardColumnContext, type TaskBoardProps } from '@primeui/vue-taskboard';
import Tag from 'primevue/tag';

type TaskBoardColumnModel = NonNullable<TaskBoardProps['columns']>[number];

const props = defineProps<{
    column?: TaskBoardColumnModel;
    taskCount?: number;
}>();

const context = useTaskBoardColumnContext({ optional: true });
const column = computed(() => props.column ?? context?.columnData ?? { id: '', label: '' });
const taskCount = computed(() => props.taskCount ?? context?.itemCount.value ?? 0);
</script>

<template>
    <div class="taskboard-swimlane-column-header">
        <span class="taskboard-swimlane-column-header-title">{{ column.label }}</span>
        <span v-if="column.locked" class="taskboard-swimlane-column-header-lock" role="img" aria-label="Locked column" title="Locked column">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3.25 5.25V4.1C3.25 2.6 4.35 1.5 6 1.5s2.75 1.1 2.75 2.6v1.15" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" />
                <path d="M3 5.25h6A.75.75 0 0 1 9.75 6v3.35A.75.75 0 0 1 9 10.1H3a.75.75 0 0 1-.75-.75V6A.75.75 0 0 1 3 5.25Z" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round" />
            </svg>
        </span>
        <Tag :value="String(taskCount)" rounded severity="secondary" />
    </div>
</template>
