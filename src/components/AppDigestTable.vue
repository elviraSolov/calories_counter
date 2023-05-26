<script setup>
    import { defineProps } from 'vue'

    const { tableData } = defineProps(['tableData'])

    const columns = [
        { name: 'Таблица БЖУ', dataIndex: 'name', key: 'name' }, 
        { title: 'Калории', dataIndex: 'calories', key: 'calories' },
        { title: 'Белки', dataIndex: 'proteins', key: 'proteins' }, 
        { title: 'Жиры', dataIndex: 'fats', key: 'fats' },
        { title: 'Углеводы', dataIndex: 'carbs', key: 'carbs' }
    ]
</script>

<template>
    <a-table :columns="columns" :data-source="tableData">
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
    </a-table> 
</template>
