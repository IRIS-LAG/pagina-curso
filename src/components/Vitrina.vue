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
        //video.controls = true
    }
}
// Función para pausar el video al perder el foco
function pauseVideo(event: FocusEvent) {
    const video = (event.target as HTMLElement).querySelector('video') as HTMLVideoElement
    if (video) {
        video.pause()
        //video.controls = false
    }
}

const videoExpandido = ref<number | null>(null)
const toggleExpandir = (index: number, event: Event) => {
    if (videoExpandido.value === index) {
        videoExpandido.value = null
    } else {
        videoExpandido.value = index
        const video = (event.currentTarget as HTMLElement).querySelector('video')
        if (video) {
        video.play()
        }
    }
}
const cerrarVideo = () => {
    videoExpandido.value = null
}


</script>

<template>
<div class="contenedor">
    <section class="vitrina">
        <div class="vitrina-item"
            :class="{ 'expandido': videoExpandido === index }"
            v-for="(video, index) in videos" :key="video.index"
            tabindex="0" 
            @mouseenter="playVideo($event)"
            @mouseleave="pauseVideo($event)"
            @click="toggleExpandir(index, $event)"
            >
            <video :src="video.urlv" muted loop
                :controls="videoExpandido === index"
            ></video>
        </div>
    </section>

    <div 
        v-if="videoExpandido !== null" 
        class="modal-overlay"
        @click="cerrarVideo"
    ></div>
    
</div>
</template>

<style scoped>
.contenedor {
    padding: 10px 30px;
    border-bottom: 2px solid white;
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
    /*flex: 0 0 auto; /* Evita que los elementos se estiren */
    min-width: 190px;
    height: 120px;
    background-color: var(--color2);
    border-radius: 6px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.vitrina-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    margin-top: -5px;
}
.vitrina-item video {
    width: 100%; /* Asegura que el video ocupe todo el ancho disponible */
    height: 100%;
    object-fit: fill;
    border-radius: 6px; /* Opcional: bordes redondeados */
    aspect-ratio: 16/9;
    cursor: pointer;
}
/*************************** Video expandido */
.vitrina-item.expandido {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
    width: 80vw;
    max-width: 1200px;
    height: auto;
    z-index: 1000;
    box-shadow: none;
    /*box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);*/
}
.vitrina-item.expandido video {
    aspect-ratio: 16 / 9;
}
/* Overlay oscuro */
.modal-overlay {
    z-index: 999;
}
</style>
