<script setup>
    import { defineProps } from 'vue'
    import { useCalendarStore } from '../store/calendar'
    import { storeToRefs } from 'pinia'

    const { meal } = defineProps(['meal'])

    const calendarStore = useCalendarStore()
    const { currentDay } = storeToRefs(calendarStore)

    const columns = [
        { name: 'Таблица БЖУ', dataIndex: 'name', key: 'name' }, 
        { title: 'Масса', dataIndex: 'weight', key: 'weight' },
        { title: 'Калории', dataIndex: 'calories', key: 'calories' },
        { title: 'Белки', dataIndex: 'proteins', key: 'proteins' }, 
        { title: 'Жиры', key: 'fats', dataIndex: 'fats' },
        { title: 'Углеводы', dataIndex: 'carbs', key: 'carbs' },
        { title: '', dataIndex: 'operation', slots: { customRender: 'operation' } }
    ]
</script>

<template>
    <a-table :columns="columns" :data-source="currentDay[meal]">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
                <span>
                    Еда
                </span>
            </template>
        </template>
        
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
                <a>
                    {{ record.name }}
                </a>
            </template>
        </template>

        <template #operation="{ record }">
            <a @click="calendarStore.removeProduct(meal, record.name)">Удалить</a>
        </template>  
    </a-table> 
</template>