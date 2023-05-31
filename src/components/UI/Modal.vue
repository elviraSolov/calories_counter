<script setup>
    import { ref, defineEmits, defineProps } from 'vue'
    const modalVisible = ref(false)

    const props = defineProps(['isFormInvalid'])
    const emits = defineEmits(['clickAddBtn', 'resetForm', 'isFormInvalid'])

    const showModal = () => modalVisible.value = true

    const hideModal = () => {
        modalVisible.value = false
        emits('resetForm')
    }

    const clickAddBtn = () => {
        emits('clickAddBtn')
        hideModal()
    }
</script>

<template>
    <div>
        <a-button type="primary" @click="showModal">
            Добавить
        </a-button>

        <!-- Модальное окно -->
        <a-modal v-model:visible="modalVisible" title="Добавление продукта">
            <slot></slot>

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