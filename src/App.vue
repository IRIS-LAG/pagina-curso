<script setup lang="ts">

import HeaderComp from './components/HeaderComp.vue'
import FooterComp from './components/FooterComp.vue'
import SearchComp from './components/SearchComp.vue'
import CuerpoComp from './components/CuerpoComp.vue'

</script>

<template>
  <div class="app-container">
    <HeaderComp></HeaderComp>

    <div class="main-content">
      <SearchComp></SearchComp>
      <CuerpoComp></CuerpoComp>
    </div>

    <FooterComp></FooterComp>
  </div>
</template>

<style> 
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .main-content {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
</style>
