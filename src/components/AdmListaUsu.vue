<script setup lang="ts">
import { ref } from 'vue'
import usuariosT from '../data/usuarios.json'
import AdmListaUsuNE from './AdmListaUsuNE.vue'

interface Usuario {
    id: number
    nombre: string
    apellido: string
    email: string
    password: string
    tipo: string
    estado: number
}
const usuarios = ref<Usuario[]>(usuariosT.usuarios)
const textoBusqueda = ref('')
const usuariosOrig = ref<Usuario[]>(usuariosT.usuarios)

//-----------------------------para la carga pantalla edicion y nuevo usuario
const showModal = ref(false)
const usuarioSelecc = ref(0)
const buscarUsuario = () => {
    const texto = textoBusqueda.value.toLowerCase().trim()
    
    if (!texto) {
        // Si el campo está vacío, muestra todos los usuarios
        usuarios.value = usuariosOrig.value
        return
    }
        // Filtra por nombre, apellido o email
    usuarios.value = usuariosOrig.value.filter(u => 
        u.nombre.toLowerCase().includes(texto) ||
        u.apellido.toLowerCase().includes(texto) ||
        u.email.toLowerCase().includes(texto)
    )
}
const openModal = () => {
    usuarioSelecc.value = 0;  
    showModal.value = true;
}
const abrirModal = (usuario: Usuario) => {
    usuarioSelecc.value = usuario.id
    showModal.value = true
}
const closeModal = () => {showModal.value = false;}
const guardarUsuario = (usuario: Usuario) => {
    const index = usuarios.value.findIndex(u => u.id === usuario.id)
    if (index !== -1) {
        // Editar usuario existente
        usuarios.value[index] = { ...usuario }
    } else {
        // Agregar nuevo usuario
        usuarios.value.push(usuario)
    }
}
const eliminarUsuario = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        usuarios.value = usuarios.value.filter(u => u.id !== id)
    }
}
</script>

<template>
    <div class="cuerpo">
        <div class="cabeza">
            <h3>Administración de usuarios</h3>
            <div class="barra-busqueda">
                <input 
                    v-model="textoBusqueda"
                    type="text" 
                    placeholder="Buscar usuario..."
                    autocomplete="off"
                    @keyup.enter="buscarUsuario">
                <button @click="buscarUsuario" class="btn-buscar">
                    <img src="../assets/iconos/magnifying.svg" alt="inicia busqueda" class="icono-bus">
                </button>
            </div>
        </div>
        
        <!-- Tabla de usuarios ---------------------->
        <table class="tabla-usuarios">
            <thead>
                <tr>
                <th class="w-10">
                    <div class="creanuevo">
                        <button class="btn verde" @click="openModal" title="Agregar nuevo usuario">+</button>Nro
                    </div>
                </th>
                <th class="w-20">Nombre</th>
                <th class="w-20">Apellido</th>
                <th class="w-30">Email</th>
                <th>Tipo</th>
                <th class="w-60">Acción</th>
                </tr>
            </thead>
            <tbody>
                <!-- Filas de usuarios existentes -->
                <tr v-for="(usuario, index) in usuarios" :key="usuario.id">
                <td class="acentro">{{ index + 1 }}</td>
                <td>{{ usuario.nombre }}</td>
                <td>{{ usuario.apellido }}</td>
                <td>{{ usuario.email }}</td>
                <td class="acentro">{{ usuario.tipo }}</td>
                <td>
                <div class="acciones">
                    <button @click="abrirModal(usuario)"         class="btn verde" title="Editar">E</button>
                    <button @click="eliminarUsuario(usuario.id)" class="btn verde" title="Eliminar">B</button>
                </div>
                </td>
                </tr>
                <tr v-if="usuarios.length == 0">
                <td colspan="6" class="sin-datos">No hay usuarios registrados</td>
                </tr>
            </tbody>
        </table>
    </div>

    <AdmListaUsuNE :show="showModal" :elUsuario="usuarioSelecc" @close="closeModal" @save="guardarUsuario"/>

</template>

<style scoped>
.cuerpo {
    box-sizing: border-box;
    margin: 0px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
}
.cabeza {
    display: flex;
    align-content: space-between;
    justify-content: space-between;
    padding-bottom: 10px;
}
h3 {
    margin: 0px;
    margin-bottom: 10px;
    padding: 0px;
}
.barra-busqueda {
    display: flex;
    gap: 10px;
}
.barra-busqueda input {
    font-size: 0.8rem;
    padding-left: 10px;
    border-radius: 6px;
    border: none;
}
.barra-busqueda input:focus {
    outline: none;
}
.icono-bus {
    width: 30px;
    height: 30px;
    filter: var(--color10);
}
.icono-bus:hover {
    filter: var(--color7);
    cursor: pointer;
}
.btn-buscar {
    background: none;
    display: flex;
    align-items: center;
    border: solid 1px var(--color3);
    border-radius: 4px;
    cursor: pointer;
}
.btn-buscar:hover {
    transform: translateY(-4px);
    transition: all 0.2s ease;
} 
/*------------------------------------------------------------*/
.tabla-usuarios {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    border-radius: 4px;
    overflow: hidden;
}
.tabla-usuarios thead {
    background-color: var(--color3);
    color: black;
    text-align: center;
}
.tabla-usuarios th,
.tabla-usuarios td {
    padding: 5px;
    border-bottom: 1px solid var(--color3);
    height: 0px;
}
.acentro {
    text-align: center;
}
.creanuevo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 7px;
}
.w-10 {
    width: 75px;
}
.w-20 {
    width: 15%;
}
.w-30 {
    width: 40%;
}
.w-60 {
    width: 120px;
}
.verde {/*boton nuevo/editar/borrar*/
    width: 30px;
    height: 30px;
    padding: 0;
    margin: 0;
    font-size: 20px;
    background-color: var(--color11);
    border-radius: 35%;
    border: solid 1px black;
}
.acciones {
    display: flex;
    gap: 10px;
    justify-content: center;
}
.btn:hover {
    background-color: var(--color6);
}
/*------------------------------------------------------------*/
.sin-datos {
    text-align: center;
    color: var(--color6);
    padding: 30px !important;
}
</style>