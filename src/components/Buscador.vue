
<script setup lang="ts">
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
                    <h3>Buscador</h3>
                    <button class="close-button" @click="emit('close')">&times;</button>
                </header>

                <div class="modal-body">
                    <ul>
                        <li>casilla para ingresar palabras</li>
                        <li>lista de cursos encontrados</li>
                        <li>boton para ir al curso</li>
                    </ul>
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
    width: 100%;
    max-width: 620px;
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
.modal-body {
    padding: 1.5rem 2.8rem;
}
</style>