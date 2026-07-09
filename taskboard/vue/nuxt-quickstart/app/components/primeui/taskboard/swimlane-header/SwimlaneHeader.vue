<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import { useTaskBoardSwimlaneHeaderContext, type TaskBoardSwimlane } from '@primeui/vue-taskboard';
import Tag from 'primevue/tag';

const props = defineProps<{
    swimlane?: TaskBoardSwimlane;
    taskCount?: number;
    isCollapsed?: boolean;
    toggleCollapse?: () => void;
}>();

const context = useTaskBoardSwimlaneHeaderContext({ optional: true });
const instance = getCurrentInstance();
const swimlane = computed(() => props.swimlane ?? context?.swimlaneData ?? { id: '', label: '' });
const taskCount = computed(() => props.taskCount ?? context?.taskCount.value ?? 0);
const isCollapsed = computed(() => (isPropProvided('isCollapsed', 'is-collapsed') ? props.isCollapsed : context?.isCollapsed.value) ?? false);
const toggleCollapse = computed(() => props.toggleCollapse ?? context?.toggleCollapse);

function isPropProvided(camelName: string, kebabName: string): boolean {
    const vnodeProps = instance?.vnode.props ?? {};

    return Object.prototype.hasOwnProperty.call(vnodeProps, camelName) || Object.prototype.hasOwnProperty.call(vnodeProps, kebabName);
}
</script>

<template>
    <div class="taskboard-swimlane-header-content">
        <button type="button" class="taskboard-swimlane-header-collapse-toggle" :aria-label="`${isCollapsed ? 'Expand' : 'Collapse'} ${swimlane.label} swimlane`" :disabled="!toggleCollapse" @pointerdown.stop @click.stop="toggleCollapse?.()">
            <svg class="taskboard-swimlane-header-chevron" :class="isCollapsed ? 'taskboard-swimlane-header-chevron-collapsed' : ''" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <span class="taskboard-swimlane-header-title">{{ swimlane.label }}</span>
        <Tag :value="String(taskCount)" rounded severity="secondary" />
    </div>
</template>
