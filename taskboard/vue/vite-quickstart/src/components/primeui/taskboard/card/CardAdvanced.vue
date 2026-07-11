<script setup lang="ts">
import { computed } from 'vue';
import { useTaskBoardCardContext, type TaskBoardItem } from '@primeui/vue-taskboard';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';

const props = defineProps<{ task?: TaskBoardItem }>();
const emit = defineEmits<{ edit: [task: TaskBoardItem] }>();
const context = useTaskBoardCardContext({ optional: true });
const task = computed(() => props.task ?? context?.item.value ?? {});

type ChipTone = {
    bg: string;
    fg: string;
    label?: string;
};

function chipTone(lightBg: string, lightFg: string, darkBg: string, darkFg: string, label?: string): ChipTone {
    return {
        bg: `light-dark(${lightBg}, ${darkBg})`,
        fg: `light-dark(${lightFg}, ${darkFg})`,
        label
    };
}

const tagColors: Record<string, { bg: string; fg: string }> = {
    frontend: chipTone('#dbeafe', '#1e40af', 'color-mix(in srgb, #3b82f6 24%, transparent)', '#bfdbfe'),
    backend: chipTone('#dcfce7', '#166534', 'color-mix(in srgb, #22c55e 22%, transparent)', '#bbf7d0'),
    design: chipTone('#fce7f3', '#9d174d', 'color-mix(in srgb, #ec4899 22%, transparent)', '#fbcfe8'),
    devops: chipTone('#e0e7ff', '#3730a3', 'color-mix(in srgb, #6366f1 24%, transparent)', '#c7d2fe'),
    security: chipTone('#fef3c7', '#92400e', 'color-mix(in srgb, #f59e0b 24%, transparent)', '#fde68a'),
    api: chipTone('#cffafe', '#155e75', 'color-mix(in srgb, #06b6d4 22%, transparent)', '#a5f3fc'),
    mobile: chipTone('#f3e8ff', '#6b21a8', 'color-mix(in srgb, #a855f7 24%, transparent)', '#e9d5ff'),
    testing: chipTone('#fef9c3', '#854d0e', 'color-mix(in srgb, #eab308 24%, transparent)', '#fef08a'),
    feature: chipTone('#d1fae5', '#065f46', 'color-mix(in srgb, #10b981 22%, transparent)', '#a7f3d0'),
    bugfix: chipTone('#fee2e2', '#991b1b', 'color-mix(in srgb, #ef4444 22%, transparent)', '#fecaca')
};

const priorityMap: Record<string, ChipTone> = {
    critical: chipTone('#fecaca', '#991b1b', 'color-mix(in srgb, #ef4444 24%, transparent)', '#fecaca', 'P1'),
    high: chipTone('#fed7aa', '#9a3412', 'color-mix(in srgb, #f97316 24%, transparent)', '#fed7aa', 'P2'),
    medium: chipTone('#bfdbfe', '#1e40af', 'color-mix(in srgb, #3b82f6 24%, transparent)', '#bfdbfe', 'P3'),
    low: chipTone('#e2e8f0', '#475569', 'color-mix(in srgb, #94a3b8 20%, transparent)', '#e2e8f0', 'P4')
};

const avatarColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6', '#6366f1', '#0ea5e9', '#10b981', '#f43f5e', '#a855f7'];

function getTagColor(tag: string) {
    return tagColors[tag] ?? chipTone('#f1f5f9', '#475569', 'color-mix(in srgb, #94a3b8 18%, transparent)', '#e2e8f0');
}

function getPriority(priority: string) {
    return priorityMap[priority] ?? chipTone('#e2e8f0', '#475569', 'color-mix(in srgb, #94a3b8 20%, transparent)', '#e2e8f0', priority);
}

function getAvatarColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return avatarColors[Math.abs(hash) % avatarColors.length]!;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((part) => part.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function isOverdue(date: Date | string): boolean {
    return new Date(date) < new Date();
}

function formatDate(date: Date | string): string {
    const d = new Date(date);
    const now = new Date();
    const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return `${Math.abs(diff)}d ago`;
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
</script>

<template>
    <div class="taskboard-card-advanced">
        <div v-if="task.tags && task.tags.length > 0" class="taskboard-card-advanced-tags">
            <span v-for="tag in task.tags" :key="tag" class="taskboard-card-advanced-tag" :style="{ background: getTagColor(tag).bg, color: getTagColor(tag).fg }">
                {{ tag }}
            </span>
        </div>

        <span class="taskboard-card-advanced-title">{{ task.title }}</span>

        <Button
            type="button"
            icon-only
            rounded
            size="small"
            severity="secondary"
            variant="text"
            class="taskboard-card-advanced-edit"
            :aria-label="`Edit ${task.title ?? 'task'}`"
            title="Edit task"
            @pointerdown.stop
            @click.stop="emit('edit', task)"
        >
            <i class="pi pi-pencil text-xs" aria-hidden="true" />
        </Button>

        <div v-if="task.priority || (task.subtasks && task.subtasks.length > 0) || task.description || task.dueDate" class="taskboard-card-advanced-badges">
            <span v-if="task.priority" class="taskboard-card-advanced-priority" :style="{ background: getPriority(task.priority).bg, color: getPriority(task.priority).fg }">
                {{ getPriority(task.priority).label }}
            </span>
            <span v-if="task.subtasks && task.subtasks.length > 0" class="taskboard-card-advanced-subtasks">
                <i class="pi pi-check-square" style="font-size: 0.65rem" />
                {{ task.subtasks.filter((s: any) => s.completed).length }}/{{ task.subtasks.length }}
            </span>
            <span v-if="task.description" class="taskboard-card-advanced-desc-icon">
                <i class="pi pi-align-left" style="font-size: 0.65rem" />
            </span>
            <span v-if="task.dueDate" class="taskboard-card-advanced-due" :class="isOverdue(task.dueDate) ? 'taskboard-card-advanced-due-overdue' : ''">
                <i class="pi pi-calendar" style="font-size: 0.65rem" />
                {{ formatDate(task.dueDate) }}
            </span>
        </div>

        <Avatar
            v-if="task.assignee || (task.assignees && task.assignees.length > 0)"
            :label="getInitials(task.assignees?.[0] ?? task.assignee ?? '')"
            shape="circle"
            class="taskboard-card-advanced-avatar"
            :style="{ background: getAvatarColor(task.assignees?.[0] ?? task.assignee ?? ''), color: '#fff' }"
        />
    </div>
</template>
