<script setup>  
    import Modal from '../components/UI/Modal.vue'
    import { ref, reactive, defineProps, computed } from 'vue'
    import { useProductsStore } from '../store/products'
    import { useCalendarStore } from '../store/calendar'
    import resetFormMixin from '../mixins/ResetFormMixin'

    const { resetForm } = resetFormMixin.methods

    const { meal }  = defineProps(['meal'])
    
    const { products } = useProductsStore()
    const calendarStore = useCalendarStore()

    const form = reactive({
        product: '',
        weight: ''
    })

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
    <modal 
        :isFormInvalid="isFormInvalid" 
        @clickAddBtn="clickAddBtn"
        @resetForm="resetForm(form)"
    >
       <!-- Добавление продукта в прием пищи -->
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
    </modal>
</template>
