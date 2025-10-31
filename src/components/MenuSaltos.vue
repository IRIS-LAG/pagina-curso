<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<template>
    <div class="menu-saltos">
        <nav>
            <!--<a class="home"><img src="../assets/iconos/home.svg"  alt="home"></a>-->
            <RouterLink class="links" to="/">Inicio</RouterLink>
            <RouterLink class="links" to="/misCursos">Mis Cursos</RouterLink>
            <RouterLink class="links" to="/miEstado">Mi Estado</RouterLink>
            <RouterLink class="links" to="/administracion">Administración</RouterLink>
        </nav>
    </div>
</template>

<style scoped>
.menu-saltos {
    background-color: var(--color2);
    border-bottom: 1px solid #dee2e6;
    color: white;
    display: flex;
    justify-content:center;
}
.links {
    margin-right: 15px;
    text-decoration: none;
    color: white;
    width: 25px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 5px;
}
.links:hover {
    background-color: var(--color6);
    color: black;
}
/*
img {
    width: 35px;
    height: 30px;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(37deg) brightness(103%) contrast(102%);   
}
img:hover {
    filter: var(--color7);
    cursor: pointer;
}
    */
</style>