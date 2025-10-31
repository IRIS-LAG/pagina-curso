<script setup lang="ts">
// 1. IMPORTAR COMPONENTE Y TIPOS
import { ref } from 'vue'
import CourseCard, { type Course } from './IndCuerpoCard.vue' 
import DetalleCurso from './DetalleCurso.vue'
import cursosT from '../data/datosCursos.json'

// ------------para toda la carga del modal detalle del video
const showModal = ref(false)
const openModal = () => {showModal.value = true;}
const closeModal = () => {showModal.value = false;}
const cursos = ref<Course[]>(cursosT.cursos)

</script>

<template>
    <div class="course-list-container">
        <h3>Area/Materia/Especialización...</h3>
        <div class="course-grid">
            <CourseCard
                v-for="curso in cursos"
                :key="curso.id"
                :course="curso"
                @click="openModal"
            />
        </div>
    </div>

    <DetalleCurso :show="showModal" @close="closeModal"/>

</template>

<style scoped>
    .course-list-container {
        background-color: var(--color4);
        display: flex;
        flex-direction: column;
        flex: 1;
        margin: 0px;
        padding: 15px 20px 40px 20px;
        gap: 20px;
    }
    h3 {
        color: var(--color1);
        text-align: left;
        margin: 0px;
        padding: 0px;
        font-size: 1rem;
    }
    .course-grid {
        display: grid;
        justify-items: center;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem; 
        
    }
</style>