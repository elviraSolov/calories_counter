<script setup>
    import { useCalendarStore } from '../store/calendar'
    import { storeToRefs } from 'pinia'

    const calendarStore = useCalendarStore()
    const { currentDay } = storeToRefs(calendarStore)
</script>

<template>
    <!-- Общее количество КБЖУ за день -->
    <div class="total">
        <a-statistic class="total__item" title="Калории" :value="currentDay.total.calories"></a-statistic>
        <a-statistic class="total__item" title="Белки" :value="currentDay.total.proteins"></a-statistic>
        <a-statistic class="total__item" title="Жиры" :value="currentDay.total.fats"></a-statistic>
        <a-statistic class="total__item" title="Углеводы" :value="currentDay.total.carbs"></a-statistic>
    </div>
</template>

<style lang="scss" scoped>
    .total {
        display: flex;
        flex-wrap: wrap;
    }

    .total__item {
        min-width: 100px;

        &:not(:last-child) {
            margin-right: 15px;
        }
    }
</style>