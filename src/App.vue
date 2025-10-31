<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderP from './components/HeaderP.vue'
import FooterP from './components/FooterP.vue'
</script>

<template>
  <div class="app-container">
    <HeaderP />
    <div class="main-content">
      <RouterView />
    </div>
    <FooterP />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
.main-content {
  display: flex;
  flex: 1;
  margin: 0px;
  padding: 0px;
}
</style>