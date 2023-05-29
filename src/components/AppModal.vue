<script setup>  
    import { ref, reactive, defineProps, computed } from 'vue'
    import { useProductsStore } from '../store/products'
    import { useCalendarStore } from '../store/calendar'

    const { meal }  = defineProps(['meal'])
    
    const { products } = useProductsStore()
    const calendarStore = useCalendarStore()
    
    const visible = ref(false)

    const form = reactive({
        product: '',
        weight: ''
    })

    const showModal = () => visible.value = true
    
    const hideModal = () => {
        visible.value = false
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

        const copiedProduct = {
            ...product,
            weight: form.weight,
            calories: `${(parseInt(calories) * form.weight / 100)} кКал`,
            proteins: `${(parseFloat(proteins) * form.weight) / 100} г`,
            fats: `${(parseFloat(fats) * form.weight) / 100} г`,
            carbs: `${(parseFloat(carbs) * form.weight) / 100} г`
        }

        calendarStore.addProduct(meal, copiedProduct)
        hideModal()
    }

    const productNames = ref([])

    for (let i = 0; i < products.length; i++) {
        productNames.value.push({value: products[i].name})
    }

    const filterOption = (input, productNames) => {
      return productNames.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
</script>

<template>
    <div class="modal">
        <a-button type="primary" @click="showModal">Добавить</a-button>

        <a-modal v-model:visible="visible" title="Добавление продукта">

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
                        id="inputNumber" 
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

<style scoped>
    .modal {
        margin-bottom: 15px;
    }
</style>