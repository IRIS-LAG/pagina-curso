<script setup lang="ts">
import { LanguageServiceMode } from 'typescript';

//import { ref } from 'vue'
//import cursosT from '../data/datosCursos.json'
//const cursos = ref(cursosT.cursos)

// -------------------------recibe del padre
const props = defineProps<{
    show: boolean
}>()
// -------------------------envia al padre
const emit = defineEmits<{
    (e: 'close'): void
}>()

</script>

<template>
<Transition name="modal-fade">
    <div v-if="props.show" class="modal-overlay" @click.self="emit('close')">
        <div class="modal-container">

            <header class="modal-header">
                <h3>Detalle del Curso</h3>
                <button class="close-button" @click="emit('close')">&times;</button>
            </header>

            <div class="modal-body">
                <div class="vistaIzq">
                    <h3>Introducción a la IA con Python</h3>
                    <h4>Fulano de los Mangales</h4>
                    <nav class="tabsPres">
                        <ul>
                            <li>Presentación</li>
                            <li>Contenido</li>
                            <li>Instructor</li>
                            <li>Reseñas</li>
                        </ul>
                    </nav>
                    <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" alt="">
                    <h4>Aprende los fundamentos de la inteligencia artificial y cómo aplicarla en la resolución de problema </h4>
                    <p>Este curso te llevará a través de los conceptos básicos de la inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y procesamiento del lenguaje natural. A lo largo del curso, trabajarás en proyectos prácticos que te permitirán aplicar lo que has aprendido y desarrollar tus propias soluciones de IA.</p>
                </div>

                <div class="vistaDer">
                    <div class="precio">
                        <p>Precio:</p><span> $49.99</span>
                    </div>
                    <button class="btn">Añadir al carrito</button>
                    <p>¡Oferta especial!</p>
                    <ul>
                        <li>&#x1F603; 80% valoraciones positivas</li>
                        <li>&#x1F9D1; 2000 estudiantes</li>
                        <li>&#x1F4AD; online y a tu ritmo</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</Transition>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(36, 35, 35, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.modal-container {
    background-color: var(--color5);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    border-radius: 10px;
    /*width: 100%;*/
    max-height: 90%;
    display: flex;
    flex-direction: column;
}
.modal-header {
    background-color: var(--color2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 1rem;
    /*margin-top: 10px;*/
    border-bottom: 4px solid white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.modal-header h3 {
    margin: 0;
    font-size: 1.4rem;
    color: white;
    width: 100%;
    text-align: center;
}
.close-button {
    border: none;
    background: none;
    font-size: 3.2rem;
    font-weight: 300;
    cursor: pointer;
    color:white;
    height: 40px;
    margin-top: -35px;
    transition: color 0.2s;
}
.close-button:hover {
    color: var(--color6);
}
/***************************************/
.modal-body {
    padding: 1.3rem 2.3rem;
    overflow-y: auto;
    scrollbar-width: thin;
    display: flex;
    gap: 20px;
}
.modal-body h3, h4 { 
    margin: 0;
}
.vistaIzq {
    max-width: 500px;
}
.tabsPres ul {
    background-color: var(--color3);
    color: white;
    list-style: none;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 8px 20px;
    font-size: 0.9rem;
    border-radius: 8px;
}
.tabsPres ul li {
    cursor: pointer;
}
.tabsPres ul li:hover {
    color: var(--color6);
    font-weight: bold;
}
img {
    width: 100%;
    border-radius: 8px;
    margin: 0px 0;
    margin-bottom: 15px;
}
p {
    text-align: justify;
}

/***************************************/
.vistaDer {
    min-width: 200px;
    border: 1px solid var(--color2);
    border-radius: 8px;
    padding: 20px;
}
.precio {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1px 12px;
    font-size: 1.1rem;
    font-weight: bold;
}
.vistaDer ul {
    list-style: none;
    padding: 0px;
    font-size: 0.8rem;
}
.vistaDer p {
    text-align: center;
    font-weight: bold;
}
</style>