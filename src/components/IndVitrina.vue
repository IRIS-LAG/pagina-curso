
<script setup lang="ts">
import { ref } from 'vue';

const videoUrls = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
    
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
];

const videos = ref(videoUrls);

</script>

<template>
    <!-- Carrusel de videos cortos -->
    <div class="contenedor">
    <section class="vitrina">
        <div class="vitrina-item" v-for="(video, index) in videos" :key="index">
            <!--<video src="" width="120" height="80" muted />-->
            <video :src="video" width="80"  muted autoplay loop></video>
            <p>Video {{ index + 1 }}</p>
        </div>
    </section>
    </div>
</template>

<style scoped>
    .contenedor {
        padding: 10px 30px;
        color: white;
        border-bottom: 1px solid white;
    }
    .vitrina {
        background-color: var(--color1);
        padding: 10px;
        display: flex;
        justify-content: center;
        gap: 25px;
        overflow-y: auto;
        scroll-behavior: smooth; /* Hace que el desplazamiento sea suave */    
        scrollbar-width: thin; /* Oculta la barra en Firefox */
        scrollbar-color: var(--color2) transparent; /* Oculta la barra en Firefox */
    }
    .vitrina-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        flex: 0 0 auto; /* Evita que los elementos se estiren */
        width: 90px;
        height: 120px;
        text-align: center;
        background-color: var(--color2);
        border-radius: 6px;
    }
    .vitrina-item:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
        margin-top: -5px;
    }
    .vitrina-item video {
        width: 100%; /* Asegura que el video ocupe todo el ancho disponible */
        height: 80%;
        object-fit: fill;
        border-radius: 6px; /* Opcional: bordes redondeados */
    }
    .vitrina-item p {
        flex: 0 0 20%; /* El texto ocupa el 20% del espacio vertical */
        margin: 0;
        padding-top: 5px;    
        font-size: 12px; /* Ajusta el tamaño del texto */
   }
</style>
