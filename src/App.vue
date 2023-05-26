<script>
  import "ant-design-vue/dist/antd.css"
  import food_base from './data/food_base.json'
  import {RouterView, RouterLink} from 'vue-router'
  import { ref } from 'vue'
  
  import { useProductsStore } from './store/products'

  export default {
    setup() {
      const { addProducts } = useProductsStore()
      addProducts(food_base)

      return {
        selectedPage: ref(['1'])
      }
    }
  }
 
</script>

<template>
  <a-layout class="layout">
    <a-layout-header class="layout__header">
      <a-menu
        class="menu"
        v-model:selectedKeys="selectedPage"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          <router-link to="/">
            Главная
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/statistics">
            Статистика
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/digest">
            Справочник
          </router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/settings">
            Калькулятор
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="layout__content">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px', minHeight: '100%' }">
        <RouterView />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
  .layout {
    height: 100vh;
  }

  .layout__header {
    position: fixed; 
    z-index: 1; 
    width: 100%;
  }

  .menu {
    width: 800px;
    margin: 0 auto;
  }

  .layout__content {
    width: 800px;
    margin: 0 auto;
    margin-top: 90px;
    overflow-y: auto;
  }
</style>
