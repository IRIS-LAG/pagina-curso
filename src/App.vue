<script setup lang="ts">

import IndHeader from './components/IndHeader.vue'
import IndFooter from './components/IndFooter.vue'
import IndSearch from './components/IndSearch.vue'
import IndCuerpo from './components/IndCuerpo.vue'
import IndVitrina from './components/IndVitrina.vue'

</script>

<template>
  <div class="app-container">
    <IndHeader></IndHeader>
    <IndVitrina></IndVitrina>

    <div class="main-content">
      <IndSearch></IndSearch>
      <IndCuerpo></IndCuerpo>
    </div>

    <IndFooter></IndFooter>
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
    flex: 1;
    margin: 0px;
    padding: 0px;
  }
</style>
