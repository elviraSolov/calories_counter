<script setup>
  import "ant-design-vue/dist/antd.css"
  import db from '.././db.json'
  import {RouterView, RouterLink} from 'vue-router'
  import { ref } from 'vue'
  import { useProductsStore } from './store/products'

  const { addProducts } = useProductsStore()
  addProducts(db)

  const selectedPage = ref(['1'])
</script>

<template>
  <a-layout class="layout">
    <a-layout-header class="layout__header">
      <!-- Главное меню -->
      <a-menu
        class="layout__menu"
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
          <router-link to="/calculation">
            Калькулятор
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="layout__content">
      <div class="layout__content-wrapper">
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

  .layout__menu {
    width: 800px;
    margin: 0 auto;
  }

  .layout__content {
    width: 800px;
    margin: 0 auto;
    margin-top: 90px;
    overflow-y: auto;
  }

  .layout__content-wrapper {
    background: #ffffff; 
    padding: 24px;
    min-height: 280px;
    min-height: 100%;
  }
</style>
