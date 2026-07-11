<script setup lang="ts">
import { computed } from 'vue';
import { useTaskBoardColumnContext, type TaskBoardProps } from '@primeui/vue-taskboard';

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
    <div class="flex min-h-[var(--p-taskboard-column-header-min-height)] min-w-0 flex-1 select-none items-center gap-2">
        <span class="truncate text-sm font-semibold text-surface-700 dark:text-surface-300">{{ column.label }}</span>
        <span class="min-w-5 rounded-full bg-surface-200 px-1.5 py-0.5 text-center text-xs font-medium text-surface-500 dark:bg-surface-700 dark:text-surface-300">{{ taskCount }}</span>
    </div>
</template>
