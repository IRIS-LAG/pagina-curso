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
.modal-container {
    max-width: 620px;
}
.modal-body {
    padding: 1.5rem 2.8rem;
}
</style>