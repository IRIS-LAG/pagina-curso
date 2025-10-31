
<script setup lang="ts">

export interface Course {
  id: number;
  title: string;
  instructor: string;
  imageUrl: string;
  price: number;
  rating?: number; // La '?' hace que esta propiedad sea opcional
  studentCount?: number;
}
defineProps<{
  course: Course;
}>();

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', // Cambia a tu moneda local si es necesario
  }).format(value);
};

</script>

<template>
  <article class="course-card">
    <div class="card-image-container">
      <img :src="course.imageUrl" :alt="`Portada del curso ${course.title}`" class="card-image" />
    </div>

    <div class="card-content">
      
      <h3 class="card-title">{{ course.title }}</h3>
      <p class="card-instructor">{{ course.instructor }}</p>
      <hr class="divider" />

      <div class="card-details">
        
        <span v-if="course.rating" class="card-rating">
          ⭐ {{ course.rating.toFixed(1) }}
        </span>
        
        <span v-if="course.studentCount" class="card-students">
          👤 {{ course.studentCount.toLocaleString('es-ES') }}
        </span>
      
      </div>

      <p class="card-price">{{ formatCurrency(course.price) }}</p>
      
      <nav class="iconos-pie">
        <a class="redsoc" target="_blank"><img src="../assets/iconos/carito.svg"  alt="carrito"></a>
        <a class="redsoc" target="_blank"><img src="../assets/iconos/instagram.svg" alt="algo"></a>
      </nav>

    </div>
  </article>
</template>

<style scoped>
  .course-card {
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden; /* Asegura que la imagen no se salga de los bordes redondeados */
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    max-width: 280px; 
  }
  .course-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  }
  .card-image-container {
    width: 100%;
    height: 150px; /* Altura fija para la imagen */
  }
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Asegura que la imagen cubra el espacio sin deformarse */
  }
  h3 {
    margin: 0;
    padding: 0;
    color: var(--color1);
    font-size: 1.1rem;
  }
  .card-content {
    padding: 0.5rem 1.2rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* Permite que el contenido ocupe el espacio restante */
  }
  .card-instructor {
    font-size: 0.9rem;
    color: var(--color1);
    margin: 0 0 1rem;
  }
  .divider {
    border: none;
    border-top: 1.5px solid var(--color1);
    margin: 0.5rem 0 0.5rem 0; 
  }
  .card-details {
    display: flex;  
    justify-content: space-between;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
  .card-price {
    background-color: var(--color5);
    font-size: 0.9rem;
    font-weight: 500;
    color: #2d3748;
    margin-top: auto; /* Empuja el precio al final de la tarjeta */
    margin-bottom: 10px;
    padding-right: 12px;
    text-align: right;
  }
  .iconos-pie {
    display: flex;
    justify-content: flex-end;
    padding-right: 12px;
    gap: 15px;
  }
  .redsoc img {
    width: 30px;
    height: 30px;
    filter: var(--color7);
  }
  .redsoc img:hover {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
</style>