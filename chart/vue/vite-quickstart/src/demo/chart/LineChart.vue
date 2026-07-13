<script setup lang="ts">
import { ChartCaption, ChartHover, ChartLegend, ChartLine, ChartSvg, ChartTitle, ChartTooltip, ChartXAxis, ChartYAxis } from '@primeui/vue-chart';
import { monthlyRevenue } from './data';
</script>

<template>
    <ChartSvg :height="360">
        <ChartTitle text="Revenue trend" />
        <ChartCaption text="Monthly revenue over the fiscal year" />
        <ChartLine :data="monthlyRevenue" category-x-field="month" value-y-field="revenue" name="Revenue" />
        <ChartXAxis />
        <ChartYAxis />
        <ChartLegend />
        <ChartHover />
        <ChartTooltip />
    </ChartSvg>
</template>
