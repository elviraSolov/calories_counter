<script setup>
    import AppCalculationForm from '../components/AppCalculationForm.vue'
    import { useCalculationStore } from '../store/calculation'

    const { personalData } = useCalculationStore()
</script>

<template>
    <h1>Расчет суточной потребности в калориях</h1>
    
    <!-- Форма для расчета РСК -->
    <app-calculation-form  class="form"/>

    <!-- Результат расчета. По умолчанию норма - 2200 Ккал -->
    <h3 v-show="personalData.dailyIntake">
        Ваша суточная норма калорий - {{ personalData.dailyIntake }}
    </h3>
</template>

<style lang="scss" scoped>
    @import "src/assets/scss/variables.scss";

    .form {
        margin-bottom: $margin-bottom;
    }
</style>