<script setup>  
    import { ref } from 'vue'
    import { useProductsStore } from '../store/products'

    const { addProduct } = useProductsStore()
      
    const name = ref()
    const calories = ref()
    const proteins = ref()
    const fats = ref()
    const carbs = ref()

    const visible = ref(false)
    const error = ref(false)
    const errorMessage = ref('Заполните все обязательные поля')

    const showModal = () => visible.value = true
    const hideModal = () => {
        visible.value = false
        error.value = false
        name.value = calories.value = proteins.value = fats.value = carbs.value = ''
    }

    const clickAddBtn = () => {
        if (name.value && calories.value && proteins.value && fats.value && carbs.value) {
            const product = {
                name: name.value,
                calories: `${calories.value} кКал`,
                proteins: `${proteins.value} г`,
                fats: `${fats.value} г`,
                carbs: `${carbs.value} г`
            }

            addProduct(product)
            hideModal()
        } else {
            error.value = true
        }
    }
</script>

<template>
    <div class="modal">
        <a-button type="primary" @click="showModal">
            Добавить
        </a-button>
        <a-modal v-model:visible="visible" title="Добавить продукт в справочник">
           
            <p class="error" v-show="error">{{ errorMessage }}</p>

            <a-input 
                v-model:value="name"
                placeholder="Название" 
                style="margin-bottom: 15px;"
            />

            <div class="field-group">
                <a-input-number 
                    id="inputNumber" 
                    v-model:value="calories" 
                    placeholder="Калории"
                />
                <a-input-number 
                    id="inputNumber" 
                    v-model:value="proteins" 
                    placeholder="Белки"
                />
                <a-input-number 
                    id="inputNumber" 
                    v-model:value="fats" 
                    placeholder="Жиры"
                />
                <a-input-number 
                    id="inputNumber" 
                    v-model:value="carbs" 
                    placeholder="Углеводы"
                />
            </div>

            <template #footer>
                <a-button key="back" @click="hideModal">
                    Назад
                </a-button>
                <a-button key="submit" @click="clickAddBtn" type="primary">
                    Добавить
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<style scoped>
    .field-group {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .modal {
        margin-bottom: 15px;
    }

    .error {
        color: red;
    }
</style>