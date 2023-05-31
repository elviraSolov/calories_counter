<script setup>
    import { computed, reactive } from 'vue'
    import { useCalculationStore } from '../store/calculation'
    import resetFormMixin from '../mixins/ResetFormMixin'

    const { resetForm } = resetFormMixin.methods
    
    const { personalData, calculateDailyIntake } = useCalculationStore()

    const form = reactive({
        age: '',
        weight: '',
        height: '',
        sex: '',
        activity: ''
    })

    const setPersonalData = () => {
        personalData.age = form.age
        personalData.weight = form.weight
        personalData.height = form.height
        personalData.sex = form.sex
        personalData.activity = form.activity

        calculateDailyIntake()
        resetForm(form)
    }

    const isFormInvalid = computed(() => {
        return !form.age || !form.weight || !form.height || !form.sex || !form.activity
    })
</script>

<template>
    <!-- Расчет суточной нормы калорий -->
    <a-form>
        <a-form-item label="Возраст, лет" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :colon="false">
            <a-input-number min="1" max="100" v-model:value="form.age"/>
        </a-form-item>
        <a-form-item label="Вес, кг" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :colon="false">
            <a-input-number :min="5" v-model:value="form.weight"/>
        </a-form-item>
        <a-form-item label="Рост, см" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :colon="false">
            <a-input-number :min="40" :max="300" v-model:value="form.height"/>
        </a-form-item>
        <a-form-item class="field-group" label="Пол" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :colon="false">
            <a-radio-group class="field-group__list" v-model:value="form.sex">
                <a-radio :value="`male`">Мужской</a-radio>
                <a-radio :value="`female`">Женский</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item class="field-group" label="Физическая активность" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :colon="false">
            <a-radio-group class="field-group__list" v-model:value="form.activity">
                <a-radio :value="1.2">Минимальная</a-radio>
                <a-radio :value="1.375">Слабая</a-radio>
                <a-radio :value="1.55">Умеренная</a-radio>
                <a-radio :value="1.7">Тяжелая или трудоемкая</a-radio>
                <a-radio :value="1.9">Экстремальная</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-button 
            type="primary" 
            @click="setPersonalData()"
            :disabled="isFormInvalid"
        >
            Рассчитать
        </a-button>
    </a-form>
</template>

<style lang="scss" scoped>
    @import "src/assets/scss/mixins.scss";
    
    .field-group {
        align-items: baseline;
    }
    .field-group__list {
        @include column;
    }
</style>