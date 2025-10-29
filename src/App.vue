<script setup lang="ts">

import { RouterView } from 'vue-router'
import HeaderP from './components/HeaderP.vue'
import FooterP from './components/FooterP.vue'

</script>

<template>
  
  <div class="app-container">
    <!--
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/about">Acerca de</RouterLink>
          <RouterLink to="/formulario">Formulario</RouterLink>
        </nav>
      </div>
    </header>
  -->
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

/* Estilos básicos para la navegación */
header {
  line-height: 1.5;
  font-size: 1rem;
  text-align: center;
}
nav a {
  color: #b2c4d6;
  margin-left: 30px;
  font-size: 20px;
}
</style>