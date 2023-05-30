<script setup>
    import { storeToRefs } from 'pinia'
    import { useCalculationStore } from '../store/calculation'
    import { useCalendarStore } from '../store/calendar'

    const { personalData } = useCalculationStore()
    
    const calendarStore = useCalendarStore()
    const { currentDay } = storeToRefs(calendarStore)
</script>

<template>
    <div class="summary">
        <a-progress 
            class="summary__progress-bar"
            :percent="Math.round(100 * currentDay.total.calories / personalData.dailyIntake)" 
        />
        
        <h2 class="summary__title">Сводка</h2>
        
        <table class="summary__table table">
            <tr>
                <td>Осталось калорий</td>
                <td>{{ personalData.dailyIntake - currentDay.total.calories }}</td>
            </tr>
            <tr>
                <td>Употреблено калорий</td>
                <td>{{ currentDay.total.calories }}</td>
            </tr>
            <tr>
                <td>{{ Math.round(100 * currentDay.total.calories / personalData.dailyIntake) }} % от РСК</td>
                <td>{{ personalData.dailyIntake }}</td>
            </tr>
        </table>
    </div>
</template>

<style lang="scss" scoped>
    @import "src/assets/scss/variables.scss";
    @import "src/assets/scss/mixins.scss";

    .summary {
        @include column;
    }

    .summary__progress-bar {
        margin-bottom: $margin-bottom;
    }

    .summary__table {
        width: 250px;
    }

    td {
        padding: 5px 0;
    }
</style>