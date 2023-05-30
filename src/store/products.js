import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
    state: () => ({
        products: [],
        keyword: ''
    }),
    getters: {
        // Фильтрация продуктов для поиска в справочнике
        filteredProducts() {
            return this.products.filter(
                product => product.name.toLowerCase().startsWith(this.keyword.toLowerCase())
            )
        }
    },
    actions: {
        addProducts(products) {
            for (let i in products) {
                this.products.push(products[i])
            }
        },
        // Добавление продукта в справочник
        addProduct(product) {
            this.products.push(product)
        },
        updateKeyword(keyword) {
            this.keyword = keyword
        }
    }
})