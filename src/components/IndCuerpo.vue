<script setup lang="ts">
// 1. IMPORTAR COMPONENTE Y TIPOS
import { ref } from 'vue';
import CourseCard, { type Course } from './IndCuerpoCard.vue'; // Importamos el componente y su tipo

const courses = ref<Course[]>([
    {
    id: 1,
    title: 'Vue 3 y TypeScript: Desde Cero a Experto',
    instructor: 'Juan Pérez',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713',
    price: 350.50,
    rating: 4.9,
    studentCount: 12500,
    },
    {
    id: 2,
    title: 'Diseño de UI/UX Moderno con Figma',
    instructor: 'Ana García',
    imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    price: 280.00,
    rating: 4.8,
    studentCount: 8800,
    },
    {
    id: 3,
    title: 'Bases de Datos con PostgreSQL y Docker',
    instructor: 'Carlos Sánchez',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e',
    price: 420.00,
    // Este curso no tiene rating para demostrar la propiedad opcional
    },
    {
    id: 4,
    title: 'Bases de Datos con PostgreSQL y Docker',
    instructor: 'Carlos Sánchez',
    imageUrl: 'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg',
    price: 420.00,
    // Este curso no tiene rating para demostrar la propiedad opcional
    },
    {
    id: 5,
    title: 'Bases de Datos con PostgreSQL y Docker',
    instructor: 'Carlos Sánchez',
    imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23',
    price: 420.00,
    // Este curso no tiene rating para demostrar la propiedad opcional
    },
    {
    id: 6,
    title: 'Bases de Datos con PostgreSQL y Docker',
    instructor: 'Carlos Sánchez',
    imageUrl: 'https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg',
    price: 420.00,
    // Este curso no tiene rating para demostrar la propiedad opcional
    },
]);

</script>

<template>
    <div class="course-list-container">
        <h2>Nuestros Cursos</h2>
        <div class="course-grid">
            <CourseCard
                v-for="course in courses"
                :key="course.id"
                :course="course"
            />
        </div>
    </div>
</template>

<style scoped>
    .course-list-container {
        background-color: var(--color4);
        display: flex;
        flex-direction: column;
        flex: 1;
        margin: 0px;
        padding: 10px 20px;
        gap: 20px;
    }
    h2 {
        color: var(--color1);
        text-align: center;
        margin: 0px;
        padding: 0px;
    }
    .course-grid {
        display: grid;
        justify-items: center;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem; 
        
    }
</style>