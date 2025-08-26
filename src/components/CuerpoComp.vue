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
    "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
    
];

const videos = ref(videoUrls);

</script>

<template>

    <div class="video-center">
        <!-- Carrusel de videos cortos -->
        <h3>Videos cortos</h3>
        <section class="carousel-container">
            <div class="carousel-item" v-for="(video, index) in videos" :key="index">
                <!--<video src="" width="120" height="80" muted />-->
                <video :src="video" width="80"  muted autoplay loop></video>
                <p>Video {{ index + 1 }}</p>
            </div>
        </section>

        <!-- Lista de videos filtrados -->
        <h3>Resultados</h3>
        <section class="video-list">
            <div class="grid">
                <div class="video-card" v-for="(video, index) in videos" :key="index">
                    <video :src="video" controls width="300" />
                    <h5>Título del video {{index+1}}</h5>
                    <p>Descripción breve del contenido.</p>
                </div>
            </div>
        </section>

        <h3>Otrosssss</h3>
        
    </div>

</template>

<style scoped>

.video-center {
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 15px;
    overflow-y: auto;
}
/* ----------------------------Carrusel */
.carousel-container {
    display: flex;
    gap: 12px;
    padding: 10px 0;
    overflow-x: auto; /* Habilita el desplazamiento horizontal */
    scroll-behavior: smooth; /* Hace que el desplazamiento sea suave */
    max-width: 100%; /* Asegura que el carrusel no se desborde */

    scrollbar-width: thin; /* Oculta la barra en Firefox */
    scrollbar-color: var(--color2) transparent; /* Oculta la barra en Firefox */
}
.carousel-container::-webkit-scrollbar {
    display: none; /* Oculta la barra en navegadores basados en WebKit */
}

.carousel-item {
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
.carousel-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    margin-top: -5px;
}
.carousel-item video {
    width: 100%; /* Asegura que el video ocupe todo el ancho disponible */
    height: 80%;
    object-fit: fill;
    border-radius: 6px; /* Opcional: bordes redondeados */
}
.carousel-item p {
    flex: 0 0 20%; /* El texto ocupa el 20% del espacio vertical */
    margin: 0;
    padding-top: 5px;    
    font-size: 12px; /* Ajusta el tamaño del texto */
    color: white; /* Cambia el color del texto */
}

/* ----------------------------Lista de videos */
.video-list .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
}
.video-card {
    color: var(--color1);
    width: 280px;
    height: 300px;
    background-color: var(--color4);
    border-radius: 10px;
    text-align: center;
}
.video-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    margin-top: -5px;
}
.video-card video{
    width: 100%; /* Asegura que el video ocupe todo el ancho disponible */
    height: 80%;
    object-fit: fill;
    border-radius: 10px; /* Opcional: bordes redondeados */

}

</style>
