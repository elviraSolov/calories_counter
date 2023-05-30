<script setup>
    import AppDigestModal from '../components/AppDigestModal.vue'
    import AppDigestTable from '../components/AppDigestTable.vue'
    import { storeToRefs } from 'pinia'
    import { useProductsStore } from '../store/products'
   
    const productsStore = useProductsStore()
    
    const { updateKeyword } = productsStore
    const { filteredProducts } = storeToRefs(productsStore)
</script>

<template>
    <!-- Добавление нового продукта -->
    <app-digest-modal class="modal"/>

    <!-- Поиск по справочнику -->
    <a-input
        class="search"
        @change="updateKeyword($event.target.value)"
    />

    <!-- Справочник -->
    <app-digest-table :tableData="filteredProducts"/>
</template>

<style lang="scss" scoped>
    @import "src/assets/scss/variables.scss";

    .modal, .search {
        margin-bottom: $margin-bottom;
    }
</style>
