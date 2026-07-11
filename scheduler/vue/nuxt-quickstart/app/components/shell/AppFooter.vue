<script setup lang="ts">
import Tag from 'primevue/tag';

const schedulerVersion = '1.0.0-rc.1';
</script>

<template>
    <footer class="mt-8 flex h-[var(--app-footer-height)] shrink-0 items-center gap-3 border-t border-[var(--app-border)] text-xs text-[var(--app-text-muted)]">
        <a
            href="https://vue.primeuipro.dev/scheduler"
            target="_blank"
            rel="noreferrer"
            class="group inline-flex items-center gap-2 font-medium text-[var(--app-text)] no-underline transition-colors hover:text-primary-600 dark:hover:text-primary-300"
        >
            <span class="inline-flex size-7 items-center justify-center rounded-md border border-[var(--app-border)] bg-[var(--app-panel)] text-primary-600 transition-colors group-hover:border-primary-300 dark:text-primary-300 dark:group-hover:border-primary-700">
                <i class="pi pi-book text-xs" aria-hidden="true" />
            </span>
            <span>PrimeUI Pro Scheduler docs</span>
            <i class="pi pi-external-link text-[0.6875rem] text-[var(--app-text-muted)]" aria-hidden="true" />
        </a>
        <Tag :value="`v${schedulerVersion}`" severity="secondary" />
    </footer>
</template>
