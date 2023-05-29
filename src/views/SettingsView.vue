<script setup>
    import { ref, computed, reactive } from 'vue'
    import { useCalculationStore } from '../store/calculation'
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
        resetForm()
    }

    const isFormInvalid = computed(() => {
        return !form.age || !form.weight || !form.height || !form.sex || !form.activity
    })

    const resetForm = () => {
        form.age = ''
        form.weight = ''
        form.height = ''
        form.sex = ''
        form.activity = ''
    }
</script>

<template>
    <h1>Расчет суточной потребности в калориях</h1>

    <a-form>
        <a-form-item label="Возраст, лет">
            <a-input-number min="1" max="100" v-model:value="form.age"/>
        </a-form-item>
        <a-form-item label="Вес, кг">
            <a-input-number :min="5" v-model:value="form.weight"/>
        </a-form-item>
        <a-form-item label="Рост, см">
            <a-input-number :min="40" :max="300" v-model:value="form.height"/>
        </a-form-item>
        <a-form-item label="Пол">
            <a-radio-group v-model:value="form.sex">
                <a-radio :value="`male`">Мужской</a-radio>
                <a-radio :value="`female`">Женский</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item label="Степень физической активности">
            <a-radio-group v-model:value="form.activity">
                <a-radio :value="1.2">Минимальная активность</a-radio>
                <a-radio :value="1.375">Слабый уровень активности</a-radio>
                <a-radio :value="1.55">Умеренный уровень активности</a-radio>
                <a-radio :value="1.7">Тяжелая или трудоемкая активность</a-radio>
                <a-radio :value="1.9">Экстремальный уровень</a-radio>
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

    <div v-show="personalData.dailyIntake">
        Ваша суточная норма калорий - {{ personalData.dailyIntake }}
    </div>
</template>

<style lang="scss" scoped>
    .form {
        display: flex;
        flex-direction: column;
    }

    .form__label {
        display: flex;
        flex-direction: column;
        max-width: 200px;
    }

    .field-group {
        display: flex;
        flex-direction: column;
    }
    .form-list  {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
</style>