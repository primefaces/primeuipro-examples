<script setup lang="ts">
import { computed } from 'vue';
import { useTaskBoardCardContext, type TaskBoardItem } from '@primeui/vue-taskboard';
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';

const props = defineProps<{ task?: TaskBoardItem }>();
const context = useTaskBoardCardContext({ optional: true });
const task = computed(() => props.task ?? context?.item.value ?? {});

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((part) => part.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
</script>

<template>
    <div class="taskboard-card">
        <span class="taskboard-card-title">{{ task.title }}</span>
        <p v-if="task.description" class="taskboard-card-description">{{ task.description }}</p>
        <div v-if="task.tags?.length" class="taskboard-card-tags">
            <Tag v-for="tag in task.tags" :key="tag" :value="tag" severity="secondary" />
        </div>
        <div v-if="task.progress != null" class="taskboard-card-progress">
            <div class="taskboard-card-progress-track">
                <div class="taskboard-card-progress-fill" :style="{ width: task.progress + '%' }" />
            </div>
            <span class="taskboard-card-progress-label">{{ task.progress }}%</span>
        </div>
        <div class="taskboard-card-footer">
            <div v-if="task.assignee || task.assignees?.length" class="taskboard-card-assignees">
                <Avatar v-for="name in task.assignees ?? (task.assignee ? [task.assignee] : [])" :key="name" :label="getInitials(name)" shape="circle" />
            </div>
            <span v-if="task.subtasks?.length" class="taskboard-card-subtask-count"> {{ task.subtasks.filter((s: any) => s.completed).length }}/{{ task.subtasks.length }} </span>
        </div>
    </div>
</template>
