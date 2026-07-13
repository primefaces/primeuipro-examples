<script setup lang="ts">
import { ChartCaption, ChartHover, ChartLegend, ChartPie, ChartSvg, ChartTitle, ChartTooltip } from '@primeui/vue-chart';
import { revenueByProduct } from './data';
</script>

<template>
    <ChartSvg :height="360">
        <ChartTitle text="Revenue by product line" />
        <ChartCaption text="Share of total revenue" />
        <ChartPie :data="revenueByProduct" category-field="product" value-field="revenue" />
        <ChartLegend />
        <ChartHover />
        <ChartTooltip />
    </ChartSvg>
</template>
