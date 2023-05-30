<script setup>
    import AppDailyTable from '../components/AppDailyTable.vue'
    import AppDailyModal from '../components/AppDailyModal.vue'
    import { ref } from 'vue'

    const mealTabList = [
        { key: 'breakfast', tab: 'Завтрак' }, 
        { key: 'lunch', tab: 'Обед' }, 
        { key: 'dinner', tab: 'Ужин' }
    ]

    const mealTabKey = ref('breakfast')

    const onTabChange = (value, type) => (type === 'key') ? key.value = value : mealTabKey.value = value
</script>

<template>
    <a-card
        :tab-list="mealTabList"
        v-model:mealTabKey="mealTabKey"
        @tabChange="key => onTabChange(key, 'mealTabKey')"
    >
        <!-- Табы для выбора приема пищи -->
        <div key="breakfast" v-if="mealTabKey === 'breakfast'">
            <app-daily-modal class="modal" :meal="`breakfast`"/>
            <app-daily-table :meal="`breakfast`"/>
        </div>
        <div key="lunch" v-else-if="mealTabKey === 'lunch'">
            <app-daily-modal class="modal" :meal="`lunch`"/>
            <app-daily-table :meal="`lunch`"/>
        </div>
        <div key="dinner" v-else>
            <app-daily-modal class="modal" :meal="`dinner`"/>
            <app-daily-table :meal="`dinner`"/>
        </div>
    </a-card>
</template>

<style lang="scss" scoped>
    @import "src/assets/scss/variables.scss";
    
    .modal {
        margin-bottom: $margin-bottom;
    }
</style>
