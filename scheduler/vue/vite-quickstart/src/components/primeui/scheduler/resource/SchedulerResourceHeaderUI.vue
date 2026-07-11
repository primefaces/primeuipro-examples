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
const headerUi = computed<SchedulerResourceHeaderUIProps>(() => context.value);
const defaultRootClasses = computed(() => ['scheduler-resource-header-ui']);
</script>

<template>
    <div :class="defaultRootClasses" v-bind="$attrs">
        <span class="scheduler-resource-header-ui-title">{{ headerUi.content }}</span>
    </div>
</template>
