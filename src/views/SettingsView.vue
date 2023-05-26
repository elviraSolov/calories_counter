<script setup>
    import { ref } from 'vue'
    import { useCalculationStore } from '../store/calculation'
    const { personalData, calculateDailyIntake } = useCalculationStore()

    const age = ref()
    const weight = ref()
    const height = ref()
    const sex = ref('male')
    const activity = ref()

    const setPersonalData = () => {
        personalData.age = age
        personalData.weight = weight
        personalData.height = height
        personalData.sex = sex
        personalData.activity = activity

        calculateDailyIntake()
    }

</script>

<template>
    <h1>Расчет суточной потребности в калориях</h1>

    <form class="form">
        <div class="phisical-data">
            <label class="form__label">
                <span class="form__label-text">Возраст, лет</span>
                <a-input-number min="1" max="100" v-model:value="age"/>
            </label>

            <label class="form__label">
                <span class="form__label-text">Вес, кг.</span>
                <a-input-number v-model:value="weight"/>
            </label>

            <label class="form__label">
                <span class="form__label-text">Рост, см.</span>
                <a-input-number v-model:value="height"/>
            </label>
        </div>

        <fieldset class="field-group">
            <legend class="field-group__legend">Пол</legend>
            <a-radio-group v-model:value="sex">
                <a-radio :value="`male`">Мужской</a-radio>
                <a-radio :value="`female`">Женский</a-radio>
            </a-radio-group>
        </fieldset>        

        <fieldset class="field-group">
            <legend class="field-group__legend">Степень физической активности</legend>
            <a-radio-group v-model:value="activity">
                <a-radio :value="1.2">Минимальная активность</a-radio>
                <a-radio :value="1.375">Слабый уровень активности</a-radio>
                <a-radio :value="1.55">Умеренный уровень активности</a-radio>
                <a-radio :value="1.7">Тяжелая или трудоемкая активность</a-radio>
                <a-radio :value="1.9">Экстремальный уровень</a-radio>
            </a-radio-group>
        </fieldset>

        <a-button type="primary" @click="setPersonalData()">Рассчитать</a-button>

        <div v-show="personalData.dailyIntake">
            Ваша суточная норма калорий - {{ personalData.dailyIntake }}
        </div>
    </form>
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