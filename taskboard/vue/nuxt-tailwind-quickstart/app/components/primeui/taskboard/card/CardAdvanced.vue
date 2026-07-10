<script setup lang="ts">
import { computed } from 'vue';
import { useTaskBoardCardContext, type TaskBoardItem } from '@primeui/vue-taskboard';

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
    return { bg: `light-dark(${lightBg}, ${darkBg})`, fg: `light-dark(${lightFg}, ${darkFg})`, label };
}

const tagColors: Record<string, { bg: string; fg: string }> = {
    frontend: chipTone('#dbeafe', '#1e40af', 'color-mix(in srgb, #3b82f6 24%, transparent)', '#bfdbfe'),
    backend: chipTone('#dcfce7', '#166534', 'color-mix(in srgb, #22c55e 22%, transparent)', '#bbf7d0'),
    design: chipTone('#fce7f3', '#9d174d', 'color-mix(in srgb, #ec4899 22%, transparent)', '#fbcfe8'),
    security: chipTone('#fef3c7', '#92400e', 'color-mix(in srgb, #f59e0b 24%, transparent)', '#fde68a'),
    api: chipTone('#cffafe', '#155e75', 'color-mix(in srgb, #06b6d4 22%, transparent)', '#a5f3fc')
};

const priorityMap: Record<string, ChipTone> = {
    high: chipTone('#fed7aa', '#9a3412', 'color-mix(in srgb, #f97316 24%, transparent)', '#fed7aa', 'P2'),
    medium: chipTone('#bfdbfe', '#1e40af', 'color-mix(in srgb, #3b82f6 24%, transparent)', '#bfdbfe', 'P3'),
    low: chipTone('#e2e8f0', '#475569', 'color-mix(in srgb, #94a3b8 20%, transparent)', '#e2e8f0', 'P4')
};

const avatarColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6', '#6366f1', '#0ea5e9', '#10b981'];

function getTagColor(tag: string) {
    return tagColors[tag.toLowerCase()] ?? chipTone('#f1f5f9', '#475569', 'color-mix(in srgb, #94a3b8 18%, transparent)', '#e2e8f0');
}

function getPriority(priority: string) {
    return priorityMap[priority] ?? chipTone('#e2e8f0', '#475569', 'color-mix(in srgb, #94a3b8 20%, transparent)', '#e2e8f0', priority);
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((part) => part.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function getAvatarColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return avatarColors[Math.abs(hash) % avatarColors.length]!;
}

function isOverdue(date: Date | string): boolean {
    return new Date(date) < new Date();
}

function formatDate(date: Date | string): string {
    const value = new Date(date);
    const diff = Math.ceil((value.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return `${Math.abs(diff)}d ago`;
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
</script>

<template>
    <div class="relative flex min-h-14 cursor-pointer flex-col gap-2 rounded-lg border border-surface-200 bg-surface-0 p-3 transition-colors hover:border-primary/40 dark:border-surface-700 dark:bg-surface-800">
        <div v-if="task.tags && task.tags.length > 0" class="flex flex-wrap gap-1 pr-8">
            <span v-for="tag in task.tags" :key="tag" class="rounded-sm px-1.5 py-0.5 text-[0.6rem] font-semibold" :style="{ background: getTagColor(tag).bg, color: getTagColor(tag).fg }">
                {{ tag }}
            </span>
        </div>

        <span class="pr-8 text-sm font-semibold leading-snug text-surface-900 dark:text-surface-100">{{ task.title }}</span>

        <button
            type="button"
            class="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-md text-surface-400 transition-colors hover:bg-surface-100 hover:text-surface-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-surface-700 dark:hover:text-surface-100"
            :aria-label="`Edit ${task.title ?? 'task'}`"
            title="Edit task"
            @pointerdown.stop
            @click.stop="emit('edit', task)"
        >
            <i class="pi pi-pencil text-xs" aria-hidden="true" />
        </button>

        <div v-if="task.priority || task.description || task.dueDate" class="mt-auto flex flex-wrap items-center gap-2">
            <span v-if="task.priority" class="rounded px-1.5 py-0.5 text-[0.6rem] font-bold" :style="{ background: getPriority(task.priority).bg, color: getPriority(task.priority).fg }">
                {{ getPriority(task.priority).label }}
            </span>
            <span v-if="task.description" class="flex items-center text-surface-400">
                <i class="pi pi-align-left text-[0.65rem]" aria-hidden="true" />
            </span>
            <span v-if="task.dueDate" class="flex items-center gap-1 text-xs" :class="isOverdue(task.dueDate) ? 'text-red-500' : 'text-surface-500'">
                <i class="pi pi-calendar text-[0.65rem]" aria-hidden="true" />
                {{ formatDate(task.dueDate) }}
            </span>
        </div>

        <span
            v-if="task.assignee"
            class="absolute bottom-2 right-2 flex size-6 items-center justify-center rounded-full text-[0.6rem] font-semibold text-white"
            :style="{ background: getAvatarColor(task.assignee) }"
        >
            {{ getInitials(task.assignee) }}
        </span>
    </div>
</template>
