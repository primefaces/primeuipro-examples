<script setup lang="ts">
defineEmits<{
    navigate: [];
}>();

const route = useRoute();

const navigation = [
    { label: 'Standard board', to: '/', icon: 'pi pi-table' },
    { label: 'Swimlanes', to: '/swimlanes', icon: 'pi pi-list' }
];

function isActive(to: string) {
    return route.path === to;
}
</script>

<template>
    <nav class="flex h-full flex-col" aria-label="TaskBoard examples">
        <div class="px-3 pb-3 text-xs font-semibold text-[var(--app-text-muted)]">Examples</div>

        <ul class="m-0 grid list-none gap-1 p-0">
            <li v-for="item in navigation" :key="item.to">
                <NuxtLink
                    :to="item.to"
                    class="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium no-underline transition-colors duration-150"
                    :class="isActive(item.to) ? 'bg-[var(--app-panel)] text-primary-700 dark:text-primary-300' : 'text-[var(--app-text-muted)] hover:bg-[var(--app-hover)] hover:text-[var(--app-text)]'"
                    :aria-current="isActive(item.to) ? 'page' : undefined"
                    @click="$emit('navigate')"
                >
                    <i :class="item.icon" class="w-4 text-center text-sm" aria-hidden="true" />
                    <span>{{ item.label }}</span>
                </NuxtLink>
            </li>
        </ul>

        <div class="mt-auto flex h-[var(--app-footer-height)] shrink-0 flex-col justify-center border-t border-[var(--app-border)] px-3">
            <div class="text-xs font-semibold text-[var(--app-text)]">Nuxt quickstart</div>
            <div class="mt-1 text-xs text-[var(--app-text-muted)]">Nuxt 4 · Vue 3</div>
        </div>
    </nav>
</template>
