<script setup lang="ts">
import VitrinaV from '../components/BVitrina.vue'
import IndSearch from '../components/CIndSearch.vue'
import IndCuerpo from '../components/DContCards.vue'
import Identifica from '../components/YIdentifica.vue'
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
