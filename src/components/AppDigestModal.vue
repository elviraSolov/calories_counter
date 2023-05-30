<script setup>  
    import { ref, reactive, computed } from 'vue'
    import { useProductsStore } from '../store/products'

    const { addProduct } = useProductsStore()
      
    const form = reactive ({
        name: '',
        calories: null,
        proteins: null,
        fats: null,
        carbs: null
    })

    const modalVisible = ref(false)

    const showModal = () => modalVisible.value = true

    const hideModal = () => {
        modalVisible.value = false
        resetForm()
    }

    const isFormInvalid = computed(() => {
        return !form.name || !form.calories || !form.proteins || !form.fats || !form.carbs
    })

    const submitForm = () => {
        const product = {
            name: form.name,
            calories: `${form.calories} кКал`,
            proteins: `${form.proteins} г`,
            fats: `${form.fats} г`,
            carbs: `${form.carbs} г`
        }
        addProduct(product)
        hideModal()
    }

    const resetForm = () => {
        form.name = ''
        form.calories = ''
        form.proteins = ''
        form.fats = ''
        form.carbs = ''
    }
</script>

<template>
    <div>
        <a-button type="primary" @click="showModal">
            Добавить
        </a-button>
        <!-- Добавление нового продукта в справочник -->
        <a-modal v-model:visible="modalVisible" title="Добавить продукт в справочник">
            <a-form :modal="form">
                <a-form-item label="Название" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :colon="false">
                    <a-input v-model:value="form.name"/>
                </a-form-item>
                <a-form-item label="Калории" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :colon="false">
                    <a-input-number v-model:value="form.calories" :min="1"/>
                </a-form-item>
                <a-form-item label="Белки, грамм" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :colon="false">
                    <a-input-number v-model:value="form.proteins" :min="1"/>
                </a-form-item>
                <a-form-item label="Жиры, грамм" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :colon="false">
                    <a-input-number v-model:value="form.fats" :min="1"/>
                </a-form-item>
                <a-form-item label="Углеводы, грамм" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :colon="false">
                    <a-input-number v-model:value="form.carbs" :min="1"/>
                </a-form-item>
            </a-form>

            <template #footer>
                <a-button key="back" @click="hideModal">
                    Назад
                </a-button>
                <a-button key="submit" @click="submitForm" type="primary" :disabled="isFormInvalid">
                    Добавить
                </a-button>
            </template>
        </a-modal>
    </div>
</template>
