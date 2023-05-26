<script setup>
    import AppTable from '../components/AppTable.vue'
    import AppModal from '../components/AppModal.vue'
    import { ref, computed, onBeforeMount } from 'vue'
    import dayjs from 'dayjs'
    import { useCalendarStore } from '../store/calendar'
    import { useCalculationStore } from '../store/calculation'
    import { storeToRefs } from 'pinia'

    const calendarStore = useCalendarStore()
    const { currentDay } = storeToRefs(calendarStore)

    const { personalData } = useCalculationStore()

    const mealTabList = [
        { key: 'breakfast', tab: 'Завтрак' }, 
        { key: 'lunch', tab: 'Обед' }, 
        { key: 'dinner', tab: 'Ужин' }
    ]

    const mealTabKey = ref()

    const onTabChange = (value, type) => (type === 'key') ? key.value = value : mealTabKey.value = value

    const formatDate = date => ({
        day: date.getDate(), 
        month: date.getMonth() + 1, 
        year: date.getFullYear()
    })
    
    const date = ref(dayjs())

    onBeforeMount(() => calendarStore.setCurrentDay(formatDate(date.value.$d)))

    const setDate = () => {
        if (date.value) {
            const {day, month, year} = formatDate(date.value.$d)
            calendarStore.setCurrentDay(day, month, year)
        } else {
            return
        }
    }   

    const percentageOfDailyIntake = computed(() => {
        Math.round(100 * currentDay.total.calories / personalData.dailyIntake)
    //    100 * currentDay.total.calories / personalData.dailyIntake
    })

</script>

<template>
    <a-date-picker 
        class="datepicker" 
        v-model:value="date"
        placeholder="Выбрать дату"
        @change="setDate"
    />

    <div v-if="date" class="wrapper">
        <div class="total">
            <a-statistic class="total__item" title="Калории" :value="currentDay.total.calories"></a-statistic>
            <a-statistic class="total__item" title="Белки" :value="currentDay.total.proteins"></a-statistic>
            <a-statistic class="total__item" title="Жиры" :value="currentDay.total.fats"></a-statistic>
            <a-statistic class="total__item" title="Углеводы" :value="currentDay.total.carbs"></a-statistic>
        </div>

        <a-card
            :tab-list="mealTabList"
       
            @tabChange="key => onTabChange(key, 'mealTabKey')"
        >
            <div v-if="mealTabKey === 'breakfast'">
                <app-modal :meal="`breakfast`"/>
                <app-table :meal="`breakfast`"/>
            </div>
            <div v-else-if="mealTabKey === 'lunch'">
                <app-modal :meal="`lunch`"/>
                <app-table :meal="`lunch`"/>
            </div>
            <div v-else>
                <app-modal :meal="`dinner`"/>
                <app-table :meal="`dinner`"/>
            </div>
        </a-card>

        <div style="display: flex;">
            <h2>Сводка</h2>
            <table>
                <tr>
                    <td>Осталось калорий</td>
                    <td>{{ personalData.dailyIntake - currentDay.total.calories }}</td>
                </tr>
                <tr>
                    <td>Употреблено калорий</td>
                    <td>{{ currentDay.total.calories }}</td>
                </tr>
                <tr>
                    <td>{{ percentageOfDailyIntake.value }} % от РСК</td>
                    <td>{{ personalData.dailyIntake }}</td>
                </tr>
            </table>
            <a-progress :percent="30" />
        </div>
    </div>
    
    <h3 v-else>Выберите дату</h3>    
</template>

<style lang="scss" scoped>
    .datepicker {
        margin-bottom: 10px;
    }

    .total {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 15px;
    }

    .total__item {
        min-width: 100px;

        &:not(:last-child) {
            margin-right: 15px;
        }
    }
</style>