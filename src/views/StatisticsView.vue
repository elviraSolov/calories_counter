<script setup>
    import formatDateMixin from '../mixins/FormatDateMixin'
    import { ref } from 'vue'
    import { Bar } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import { useCalendarStore } from '../store/calendar'

    const { formatDate } = formatDateMixin.methods

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

    const { getCaloriesPerDays } = useCalendarStore()

    const dates = ref(null)

    // Создание массива с датами из выбранного диапазона
    const createDatesArray = (dates)  => {
        let dateArray = []
        const startDate = dates[0].$d
        const endDate = dates[1].$d
        let currentDate = new Date(startDate.getTime())

        while (currentDate <= endDate) {
            const formattedDate = formatDate(currentDate)
            dateArray.push(formattedDate)
            currentDate.setDate(currentDate.getDate() + 1) 
        }

        return dateArray
    }

    // Форматирование массива дат для вывода графика
    const formatReadableDates = (dateArray) => dateArray.map(({day, month, year}) => `${day}.${month}.${year}`)

    // Обновление данных графика
    const updateChartData = (days, calories) => {
        const datasets = [{ label: "Калории", data: calories }]
        const labels = days
        chartData.value = { labels, datasets }
    }

    const onDatesChange = (value) => {
        dates.value = value
        const dateArray = createDatesArray(dates.value)
        const calories = getCaloriesPerDays(dateArray)
        const readableDates = formatReadableDates(dateArray)
        updateChartData(readableDates, calories)
    }

    const chartData = ref()
</script>

<template>
    <div>
        <h1>Статистика</h1>

        <!-- Выбор дат -->
        <a-range-picker 
            class="range-picker"
            :value="dates"
            @change="onDatesChange"    
        />

        <!-- Статистика за выбранный диапазон дат -->
        <div>
            <Bar v-if="dates"
                :data="chartData"
            /> 

            <h3 v-else>Для отображения статистики выберите даты</h3>
        </div>     
    </div>
</template>

<style lang="scss" scoped>
    @import "src/assets/scss/variables.scss";
    .range-picker {
        margin-bottom: $margin-bottom;
    }
</style>