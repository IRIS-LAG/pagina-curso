<script setup lang="ts">
// -------------------------recibe del padre
const props = defineProps<{
    show: boolean
}>()
// -------------------------envia al padre
const emit = defineEmits<{
    (e: 'close'): void
}>();
</script>

<template>
    <Transition name="modal-fade">
        <div v-if="props.show" class="modal-overlay" @click.self="emit('close')">
            <div class="modal-container">
                
                <header class="modal-header">
                    <h3>Contenido del Carrito</h3>
                    <button class="close-button" @click="emit('close')">&times;</button>
                </header>

                <div class="modal-body">
                    <ul>
                        <li>Lista de cursos seleccionados</li>
                        <li>Costo total</li>
                        <li>Detalles</li>
                        <li>Preparar cobro</li>
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
    height: 920px;
    max-width: 620px;
    display: flex;
    flex-direction: column;
}
.modal-header {
    background-color: var(--color2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 1.5rem;
    /*margin-top: 10px;*/
    border-bottom: 4px solid white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.modal-header h3 {
    margin: 0;
    font-size: 1.6rem;
    color: white;
    width: 100%;
    text-align: center;
}
.close-button {
    border: none;
    background: none;
    font-size: 3.4rem;
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