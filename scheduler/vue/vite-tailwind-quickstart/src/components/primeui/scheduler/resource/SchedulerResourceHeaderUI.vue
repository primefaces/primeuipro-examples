<script setup lang="ts">
import { useSchedulerResourceHeaderContext, type FlattenedResource } from '@primeui/vue-scheduler';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

type SchedulerResourceHeaderUIProps = {
    content?: string;
    resources?: FlattenedResource[];
    filterQuery?: string;
    setFilter?: (query: string) => void;
    headerHeight?: number;
};

const context = useSchedulerResourceHeaderContext();
const header = computed<SchedulerResourceHeaderUIProps>(() => context.value);
</script>

<template>
    <div class="inline-flex w-full min-w-0 items-center justify-center text-center text-sm font-bold text-surface-800 dark:text-surface-100" v-bind="$attrs">
        <span class="truncate">{{ header.content }}</span>
    </div>
</template>
