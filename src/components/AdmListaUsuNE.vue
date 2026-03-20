<script setup lang="ts">
import { ref, watch } from 'vue'
import usuariosT from '../data/usuarios.json'
// -------------------------recibe del padre
const props = defineProps<{
    show: boolean
    elUsuario: number
}>()
// -------------------------envia al padre
const emit = defineEmits<{
    (e: 'close'): void
    (e: 'save', usuario: Usuario): void
}>()
// -------------------------lógica interna
interface Usuario {
    id: number
    nombre: string
    apellido: string
    email: string
    password: string
    tipo: string
    estado: number
}
const nuevoUsuario = ref<Usuario>({
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    tipo: '',
    estado: 0
})
const generarIdCorrelativo = () => {
    //const maxId = Math.max(...usuariosT.usuarios.map((u: Usuario) => u.id), 0)
    const maxId = Date.now()
    return maxId + 1
}
watch(() => props.show, (newVal) => {
    if (newVal) {
        if (props.elUsuario) {
            // Editar usuario existente
            const user = usuariosT.usuarios.find((u: Usuario) => u.id === props.elUsuario)
            if (user) {
                nuevoUsuario.value = { ...user }
            }
        } else {
            // Nuevo usuario
            nuevoUsuario.value = {
                id: generarIdCorrelativo(),
                nombre: '',
                apellido: '',
                email: '',
                password: '',
                tipo: '',
                estado: 0
            }
        }
    }
})
const guardarUsuario = () => {
    // Validación básica
    if (!nuevoUsuario.value.nombre.trim() || !nuevoUsuario.value.email.trim()) {
        alert('Nombre y email son obligatorios')
        return
    }
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(nuevoUsuario.value.email)) {
        alert('El email debe tener un formato válido (ejemplo: usuario@dominio.com)')
        return
    }
    // Validar que tipo de usuario esté seleccionado
    if (!nuevoUsuario.value.tipo.trim()) {
        alert('Debe seleccionar un tipo de usuario')
        return
    }
    // Emitir el usuario guardado
    emit('save', nuevoUsuario.value)
    emit('close')
}
</script>

<template>
<Transition name="modal-fade">
    <div v-if="props.show" class="modal-overlay" @click.self="emit('close')">
        <div class="modal-container">

            <header class="modal-header">
                <h3>Edición de usuarios</h3>
                <button class="close-button" @click="emit('close')">&times;</button>
            </header>

            <!-- Cuerpo del modal -->
            <div class="modal-body">
                <form @submit.prevent="guardarUsuario" autocomplete="off">
                    
                    <div class="items">
                        <label for="nomUsuario">Nombre de Usuario:</label>
                        <input type="text" id="nomUsuario" v-model="nuevoUsuario.nombre">
                    </div>
                    <div class="items">
                        <label for="apellido">Apellido:</label>
                        <input type="text" id="apellido" v-model="nuevoUsuario.apellido">
                    </div>
                    <div class="items">
                        <label for="email">Email:</label>
                        <input type="text" id="email" v-model="nuevoUsuario.email">
                    </div>
                    <div class="items">
                        <label for="password">Contraseña:</label>
                        <input type="text" id="password" v-model="nuevoUsuario.password">
                    </div>
                    <div class="items">
                        <label for="tipoUsuario">Tipo de usuario:</label>
                        <select id="tipoUsuario" v-model="nuevoUsuario.tipo">
                            <option value="">Seleccione...</option>
                            <option value="ADMIN">Administrador</option>
                            <option value="Profesor">Profesor</option>
                            <option value="Alumno">Alumno</option>
                            <option value="Nuevo">Nuevo</option>
                        </select>
                    </div>

                </form>
            </div>

            <!-- Pie del modal -->
            <div class="modal-pie">
                <button type="button" class="btn" @click="guardarUsuario">Guardar</button>
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
.items {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    color: black;
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
select {
    padding: 6px;
    border: 1px solid var(--color3);
    border-radius: 4px;
    font-size: 1rem;
    margin-top: 5px;
    color: inherit;
    
}
select:focus {
    outline: none;
    border: 2px solid var(--color2);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
}
select option {
    color: var(--color2);
    font-weight: bold;
}
/*------------------------------------------------------------*/
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
    width: 80%;
}
</style>