<script setup lang="ts">
import VitrinaV from '../components/Vitrina.vue'
import IndSearch from '../components/IndSearch.vue'
import IndCuerpo from '../components/IndCuerpo.vue'
import Identifica from '../components/Identifica.vue'
</script>

<template>
  <div class="app-container">

    <VitrinaV />

    <div class="main-content">
      <IndSearch />
      <IndCuerpo />
    </div>

    <Identifica />

</div>
</template>

<style> 
  .app-container {
    flex: 1;
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
    
  }
  .main-content {
    display: flex;
    flex: 1;
    margin: 0px;
    padding: 0px;
  }
    
</style>
