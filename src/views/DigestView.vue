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
    <app-digest-modal/>

    <a-input
        class="search"
        @change="updateKeyword($event.target.value)"
        placeholder="Поиск..."
    />

    <app-digest-table :tableData="filteredProducts"/>
</template>

<style scoped>
    .search {
        margin-bottom: 15px;
    }
</style>
