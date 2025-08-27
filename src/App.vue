<script setup lang="ts">

import HeaderComp from './components/IndHeader.vue'
import FooterComp from './components/IndFooter.vue'
import SearchComp from './components/IndSearch.vue'
import CuerpoComp from './components/IndCuerpo.vue'
import Vitrina from './components/IndVitrina.vue'

</script>

<template>
  <div class="app-container">
    <HeaderComp></HeaderComp>
    <Vitrina></Vitrina>

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
