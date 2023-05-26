<script setup>  
    import { ref, defineProps } from 'vue'
    import { useProductsStore } from '../store/products'
    import { useCalendarStore } from '../store/calendar'

    const { meal }  = defineProps(['meal'])
    
    const { products } = useProductsStore()
    const calendarStore = useCalendarStore()
    
    const visible = ref(false)
    const selectedProduct = ref()
    const weight = ref(100)

    const showModal = () => visible.value = true
    const hideModal = () => {
        visible.value = false
        selectedProduct.value = ''
        weight.value = 100
    }

    const clickAddBtn = () => {
        //ищет продукт по имени
        let product = products.find(product => product.name == selectedProduct.value)
        const { calories, proteins, fats, carbs } = product

        // создает копию продукта 
        const copiedProduct = {
            ...product,
            weight: weight.value,
            calories: `${(parseInt(calories) * weight.value / 100)} кКал`,
            proteins: `${(parseFloat(proteins) * weight.value) / 100} г`,
            fats: `${(parseFloat(fats) * weight.value) / 100} г`,
            carbs: `${(parseFloat(carbs) * weight.value) / 100} г`
        }

        // добавляет в meal текущего дня
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
            <a-auto-complete
                class="field"
                placeholder="Поиск..."
                v-model:value="selectedProduct"
                :options="productNames"
                :filter-option="filterOption"
            />

            <a-input-number 
                id="inputNumber" 
                v-model:value="weight" 
            />

            <template #footer>
                <a-button key="back" @click="hideModal">Назад</a-button>
                <a-button 
                    key="submit" 
                    type="primary" 
                    @click="clickAddBtn"
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

    .field {
        width: 100%;
        margin-bottom: 15px;
    }
</style>