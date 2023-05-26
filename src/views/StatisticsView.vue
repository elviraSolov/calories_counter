<script setup>
    import { ref } from 'vue'
    import { Bar } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import { useCalendarStore } from '../store/calendar'

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

    const { getCaloriesPerDays } = useCalendarStore()

    const formatDate = date => ({
        day: date.getDate(), 
        month: date.getMonth() + 1, 
        year: date.getFullYear()
    })

    const dates = ref(null)

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

    const formatReadableDates = (dateArray) => dateArray.map(({day, month, year}) => `${day}.${month}.${year}`)

    const updateChartData = (days, calories) => {
        const datasets = [{ data: calories }]
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
        <a-range-picker 
            :value="dates"
            @change="onDatesChange"    
        />

        <div class="bar">
            <Bar v-if="dates"
                :data="chartData"
            /> 

            <h3 class="bar__title" v-else>Для отображения статистики выберите даты</h3>
        </div>     
    </div>
</template>

<style scoped>
    .bar__title {
        margin-top: 10px;
    }
</style>