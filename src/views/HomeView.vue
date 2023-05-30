<script setup>
    import formatDateMixin  from '../mixins/FormatDateMixin'
    import AppTotalMacros from '../components/AppTotalMacros.vue'
    import AppMealTabs from '../components/AppMealTabs.vue'
    import AppDaySummary from '../components/AppDaySummary.vue'
    import { ref } from 'vue'
    import dayjs from 'dayjs'
    import { useCalendarStore } from '../store/calendar'

    const { formatDate } = formatDateMixin.methods

    const calendarStore = useCalendarStore()

    const date = ref(dayjs())
    const isLoaded = ref(false)

    const setDate = () => {
        if (date.value) {
            const { day, month, year } = formatDate(date.value.$d)
            calendarStore.setCurrentDay(day, month, year)
        } else {
            return
        }
    }   

    // Установка текущей даты при первом запуске 
    if (!isLoaded.value) {
        setDate()
        isLoaded.value = true
    }
</script>

<template>
    <!-- Выбор даты -->
    <a-date-picker 
        class="datepicker" 
        v-model:value="date"
        placeholder="Выбрать дату"
        @change="setDate"
    />

    <div v-if="date">
        <!-- Общее количество КБЖУ за день -->
        <app-total-macros class="macros"/>

        <!-- Табы для выбора приема пищи -->
        <app-meal-tabs class="meals"/>

        <!-- Сводка за день -->
        <app-day-summary />
    </div>
    
    <h3 v-else>Выберите дату</h3>    
</template>

<style lang="scss" scoped>
    @import "src/assets/scss/variables.scss";

    .datepicker, .macros, .meals {
        margin-bottom: $margin-bottom;
    }
    
</style>