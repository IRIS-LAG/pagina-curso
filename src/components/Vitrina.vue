<script setup lang="ts">
import { ref, onMounted } from 'vue'
import videosVit from '../data/videosVitrina.json'

interface Video {
    index: number;
    urlv: string;
}   
const videos = ref<Video[]>([])
onMounted(() => {
    videos.value = videosVit.videitos
})    
// Función para reproducir el video al enfocar
function playVideo(event: FocusEvent) {
    const video = (event.target as HTMLElement).querySelector('video') as HTMLVideoElement
    if (video) {
        video.play()
    }
}
// Función para pausar el video al perder el foco
function pauseVideo(event: FocusEvent) {
    const video = (event.target as HTMLElement).querySelector('video') as HTMLVideoElement
    if (video) {
        video.pause()
    }
}
</script>

<template>
    <div class="contenedor">
    <section class="vitrina">
        <div class="vitrina-item" 
            v-for="video in videos" :key="video.index"
            tabindex="0" 
            @mouseenter="playVideo($event)"
            @mouseleave="pauseVideo($event)"
            >
            <video :src="video.urlv" width="80" muted></video>
            <p>Video__{{ video.index + 1 }}</p>
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
        max-width: 100%;
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
