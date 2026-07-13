<script setup lang="ts">
import { ChartBar, ChartCaption, ChartHover, ChartLegend, ChartSvg, ChartTitle, ChartTooltip, ChartXAxis, ChartYAxis } from '@primeui/vue-chart';
import { monthlyRevenue } from './data';
</script>

<template>
    <ChartSvg :height="360">
        <ChartTitle text="Monthly revenue" />
        <ChartCaption text="Revenue by month, current fiscal year" />
        <ChartBar :data="monthlyRevenue" category-x-field="month" value-y-field="revenue" name="Revenue" />
        <ChartXAxis />
        <ChartYAxis />
        <ChartLegend />
        <ChartHover />
        <ChartTooltip />
    </ChartSvg>
</template>
