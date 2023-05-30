<script setup>
    import AppCalculationForm from '../components/AppCalculationForm.vue'
    import { useCalculationStore } from '../store/calculation'

    const { personalData } = useCalculationStore()
</script>

<template>
    <h1>Расчет суточной потребности в калориях</h1>
    
    <!-- Форма для расчета РСК -->
    <app-calculation-form />

    <!-- Результат расчета. По умолчанию норма - 2200 Ккал -->
    <h3 class="result" v-show="personalData.dailyIntake">
        Ваша суточная норма калорий - {{ personalData.dailyIntake }}
    </h3>
</template>

<style scoped>
    .result {
        margin-top: 15px;
    }
</style>