<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import { useTaskBoardColumnContext, type TaskBoardProps } from '@primeui/vue-taskboard';
import Tag from 'primevue/tag';

type TaskBoardColumnModel = NonNullable<TaskBoardProps['columns']>[number];

const props = withDefaults(
    defineProps<{
        column?: TaskBoardColumnModel;
        taskCount?: number;
        isCollapsed?: boolean;
        toggleCollapse?: () => void;
        startDrag?: (e: PointerEvent) => void;
        collapsible?: boolean;
        reorderable?: boolean;
        showMetadata?: boolean;
    }>(),
    {
        showMetadata: true
    }
);

const context = useTaskBoardColumnContext({ optional: true });
const instance = getCurrentInstance();
const column = computed(() => props.column ?? context?.columnData ?? { id: '', label: '' });
const taskCount = computed(() => props.taskCount ?? context?.itemCount.value ?? 0);
const isCollapsed = computed(() => (isPropProvided('isCollapsed', 'is-collapsed') ? props.isCollapsed : context?.isCollapsed.value) ?? false);
const toggleCollapse = computed(() => props.toggleCollapse ?? context?.toggleCollapse);
const collapsible = computed(() => props.collapsible ?? false);
const showMetadata = computed(() => props.showMetadata);

type HeaderBadge = {
    key: string;
    label: string;
    tone: 'neutral' | 'warning' | 'danger' | 'info';
    title: string;
};

function isPropProvided(camelName: string, kebabName: string): boolean {
    const vnodeProps = instance?.vnode.props ?? {};

    return Object.prototype.hasOwnProperty.call(vnodeProps, camelName) || Object.prototype.hasOwnProperty.call(vnodeProps, kebabName);
}

function formatFieldLabel(field: string): string {
    const knownLabels: Record<string, string> = {
        assignee: 'assignee',
        assignees: 'members',
        dueDate: 'date',
        priority: 'priority',
        tags: 'labels',
        description: 'description',
        title: 'title'
    };

    return (
        knownLabels[field] ??
        field
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/[-_]+/g, ' ')
            .toLowerCase()
    );
}

const headerBadges = computed<HeaderBadge[]>(() => {
    const columnData = column.value;
    const badges: HeaderBadge[] = [];

    if (typeof columnData.wipLimit === 'number' && columnData.wipLimit > 0) {
        const tone = taskCount.value >= columnData.wipLimit ? 'danger' : taskCount.value >= columnData.wipLimit - 1 ? 'warning' : 'neutral';

        badges.push({
            key: 'wip',
            label: `WIP ${taskCount.value}/${columnData.wipLimit}`,
            tone,
            title: `Work in progress limit: ${taskCount.value} of ${columnData.wipLimit}`
        });
    }

    if ((columnData.requiredFields?.length ?? 0) > 0) {
        const fields = columnData.requiredFields ?? [];

        badges.push({
            key: 'required-fields',
            label: 'Required',
            tone: 'warning',
            title: `Cards must include ${fields.map(formatFieldLabel).join(', ')} before entering this column`
        });
    }

    if (columnData.confirmOnEnter) {
        badges.push({
            key: 'confirm',
            label: 'Confirm',
            tone: 'info',
            title: 'Moving cards into this column asks for confirmation'
        });
    }

    return badges;
});
</script>

<template>
    <div class="taskboard-column-header-content" :class="{ 'taskboard-column-header-content--collapsed': isCollapsed }">
        <template v-if="isCollapsed">
            <button type="button" class="taskboard-column-header-collapse-toggle" :aria-label="`Expand ${column.label} column`" :disabled="!collapsible || !toggleCollapse" @pointerdown.stop @click.stop="toggleCollapse?.()">
                <svg class="taskboard-column-header-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </template>
        <template v-else>
            <div class="taskboard-column-header-left">
                <span class="taskboard-column-header-title">{{ column.label }}</span>
                <span v-if="column.locked" class="taskboard-column-header-lock" role="img" aria-label="Locked column" title="Locked column">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M3.25 5.25V4.1C3.25 2.6 4.35 1.5 6 1.5s2.75 1.1 2.75 2.6v1.15" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" />
                        <path d="M3 5.25h6A.75.75 0 0 1 9.75 6v3.35A.75.75 0 0 1 9 10.1H3a.75.75 0 0 1-.75-.75V6A.75.75 0 0 1 3 5.25Z" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round" />
                    </svg>
                </span>
                <Tag :value="String(taskCount)" rounded severity="secondary" />
                <div v-if="(showMetadata && headerBadges.length) || $slots.meta" class="taskboard-column-header-meta-group" aria-label="Column metadata">
                    <span v-for="badge in showMetadata ? headerBadges : []" :key="badge.key" class="taskboard-column-header-meta" :class="`taskboard-column-header-meta--${badge.tone}`" :title="badge.title">
                        {{ badge.label }}
                    </span>
                    <slot name="meta" :column="column" :task-count="taskCount" :is-collapsed="isCollapsed" />
                </div>
            </div>
            <button v-if="collapsible" type="button" class="taskboard-column-header-collapse-toggle" :aria-label="`Collapse ${column.label} column`" :disabled="!toggleCollapse" @pointerdown.stop @click.stop="toggleCollapse?.()">
                <svg class="taskboard-column-header-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </template>
    </div>
</template>
