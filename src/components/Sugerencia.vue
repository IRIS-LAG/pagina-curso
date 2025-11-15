<script setup lang="ts">
import { ref } from 'vue'
// -------------------------recibe del padre
const props = defineProps<{
    show: boolean
}>()
// -------------------------envia al padre
const emit = defineEmits<{
    (e: 'close'): void
}>()

const mensajeVis = ref(false)
const mostrarMen = () => {
    //validar los campos antes de mostrar el mensaje
    mensajeVis.value = true
    setTimeout(() => {
        mensajeVis.value = false    
        emit('close')
    }, 3000)
}
</script>

<template>
<Transition name="modal-fade">
    <div v-if="props.show" class="modal-overlay" @click.self="emit('close')">
        <div class="modal-container">

            <header class="modal-header">
                <h3>Curso Deseado</h3>
                <button class="close-button" @click="emit('close')">&times;</button>
            </header>

            <div class="modal-body">
                <h4>Ingrese alguna referencia del curso deseado:</h4>
                
                <form @submit.prevent="" autocomplete="off">
                    <div class="items">
                        <label for="detalle">Detalle:</label>
                        <input type="text" id="detalle">
                    </div>
                    <div class="items">
                        <label for="nombreProf">Sugerencia de nombre Profesor:</label>
                        <input type="text" id="nombreProf">
                    </div>
                    <div class="items">
                        <label for="telfProf">Celular de contacto:</label>
                        <input type="text" id="telfProf">
                    </div>
                </form>
            </div>

            <div class="modal-pie">
                <button type="submit" class="btn" v-if="!mensajeVis" @click="mostrarMen">Enviar</button>
                <h3 v-if="mensajeVis">Gracias por tus sugerencias!</h3>
            </div>
            
        </div>
    </div>
</Transition>
</template>

<style scoped>
.modal-container {/*las otras estan en style.css*/
    max-width: 450px;
}
.modal-body {
    padding: 1.3rem 2.5rem 1.8rem;
}
h4 {
    margin: 0px;
    padding-bottom: 12px;
}
.items {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}
input {
    padding: 6px;
    border: 1px solid var(--color3);
    border-radius: 4px;
    font-size: 1rem;
    margin-top: 5px;
}
input:focus {
    outline: none;
    border: 2px solid var(--color2);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
}
.modal-pie {
    background-color: var(--color2);
    border-top: 2px solid white;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}   
.btn {
    width: 60%;
}
.modal-pie h3 {
    color: white;
}   
</style>