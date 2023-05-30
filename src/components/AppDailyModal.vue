<script setup>  
    import { ref, reactive, defineProps, computed } from 'vue'
    import { useProductsStore } from '../store/products'
    import { useCalendarStore } from '../store/calendar'

    const { meal }  = defineProps(['meal'])
    
    const { products } = useProductsStore()
    const calendarStore = useCalendarStore()
    
    const modalVisible = ref(false)

    const form = reactive({
        product: '',
        weight: ''
    })

    const showModal = () => modalVisible.value = true
    
    const hideModal = () => {
        modalVisible.value = false
        resetForm()
    }

    const resetForm = () => {
        form.product = ''
        form.weight = ''
    }

    const isFormInvalid = computed(() => {
        return !form.product || !form.weight
    })

    const clickAddBtn = () => {
        let product = products.find(product => product.name == form.product)
        const { calories, proteins, fats, carbs } = product

        // Копирование продукта из базы в таблицу с указанием массы
        const copiedProduct = {
            ...product,
            weight: form.weight,
            calories: `${(parseInt(calories) * form.weight / 100)} кКал`,
            proteins: `${(parseFloat(proteins) * form.weight) / 100} г`,
            fats: `${(parseFloat(fats) * form.weight) / 100} г`,
            carbs: `${(parseFloat(carbs) * form.weight) / 100} г`
        }

        // Добавление продукта в прием пищи (meal)
        calendarStore.addProduct(meal, copiedProduct)
        hideModal()
    }

    const productNames = ref([])

    for (let i = 0; i < products.length; i++) {
        productNames.value.push({ value: products[i].name })
    }

    // Поиск продукта в базе
    const filterOption = (input, productNames) => {
      return productNames.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
</script>

<template>
    <div>
        <a-button type="primary" @click="showModal">
            Добавить
        </a-button>

        <!-- Добавление продукта в прием пищи -->
        <a-modal v-model:visible="modalVisible" title="Добавление продукта">
            <a-form>
                <a-form-item label="Продукт" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" :colon="false">
                    <a-auto-complete
                        placeholder="Поиск..."
                        v-model:value="form.product"
                        :options="productNames"
                        :filter-option="filterOption"
                    />
                </a-form-item>
                <a-form-item label="Масса, грамм" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" :colon="false">
                    <a-input-number 
                        :min="1"
                        v-model:value="form.weight" 
                    />
                </a-form-item>
            </a-form>

            <template #footer>
                <a-button key="back" @click="hideModal">Назад</a-button>
                <a-button 
                    key="submit" 
                    type="primary" 
                    @click="clickAddBtn"
                    :disabled="isFormInvalid"
                >
                    Добавить
                </a-button>
            </template>
        </a-modal>
    </div>
</template>
