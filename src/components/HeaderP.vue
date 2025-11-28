<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { UsuarioGeneral } from '../data/Types.ts' 

import Buscador from './Buscador.vue'
import ContenidoCarrito from './ContenidoCarrito.vue'
import RegisUsuario from './RegisUsuario.vue'
import UserProfile from './UserProfile.vue'
import MenuSaltos from '../components/MenuSaltos.vue'
import avatar from '../assets/iconos/faceUsu.svg'

//-----------------------------para manejo del usuario en el header
const usuario = ref<UsuarioGeneral | null>(null)
const existeUsuario = ref(false)
const cargarUsuario = () => {
    const userData = localStorage.getItem('usuario')
    if (userData) {
        usuario.value = JSON.parse(userData) // Restaura el usuario
        existeUsuario.value = true}
}
const guardarUsuario = (user: UsuarioGeneral) => {
    localStorage.setItem('usuario', JSON.stringify(user))
}
const cerrarSesion = () => {
    //console.log('Cerrando sesión...')
    localStorage.removeItem('usuario')
    usuario.value = null
    existeUsuario.value = false 
}
//-----------------------------para toda la carga del modal de registro de usuario
const showModal = ref(false)
const openModal = () => {showModal.value = true;}
const closeModal = () => {showModal.value = false;}
const handleUserSubmit = (payload: { email: string; username: string;  password: string; tipoUsu: number }) => {
    const nuevoUsuario: UsuarioGeneral = {
        email: payload.email,
        name: payload.username,
        avatarUrl: avatar//'https://i.pravatar.cc/150?u=anagarcia' 
    }
    usuario.value = nuevoUsuario
    guardarUsuario(nuevoUsuario) //en memoria
    existeUsuario.value = true
    closeModal()   
    
    // Aquí iría la lógica para manejar el nuevo usuario, como llamar a una API.
    
}
// ------------para toda la carga del modal de contenido del carrito
const showModala = ref(false)
const openModala = () => {showModala.value = true;}
const closeModala = () => {showModala.value = false;}
// ------------para toda la carga del modal de contenido del carrito
const showModalb = ref(false)
const openModalb = () => {showModalb.value = true;}
const closeModalb = () => {showModalb.value = false;}

// ------------cargar usuario al iniciar la app
onMounted(() => {
    cargarUsuario()
})

/******************************************************************************************/
/******************************************************************************************/
</script>
<template>
    <header class="header">
        <div class="logo"><!-- Logo --------------------------------------------->
            <img src="../assets/iconos/logo0.svg" alt="Logo" width="70" height="70"/>
            <p class="nombreP">Aprende+</p>
        </div>
        
        <div class="varios">
            <div class="buscador"><!-- Buscador ------------------------------------>
                <button class="bot-buscar" @click="openModalb">
                    <img class="lupa" src="../assets/iconos/magnifying.svg" alt="Buscar" width="30" height="30"/>
                    <span>Buscar ...</span>
                </button>
            </div>

            <div class="cart" @click="openModala"><!-- Icono de compra ------------------------------>
                <img class="svg-imagen" src="../assets/iconos/carito.svg" alt="carrito" width="30" height="30"/>
                <p class="numeroP">0</p>
            </div>

            <div class="sesibutton" v-if = "!existeUsuario"><!-- Boton de sesión --->
                <button class="btn" @click="openModal">Iniciar sesión</button>
            </div>

            <div class="usuarioAct" v-if = "existeUsuario"><!-- icono/foto + nombreUsuario --->
                <UserProfile 
                    :username = "usuario?.name"
                    :avatarUrl = "usuario?.avatarUrl"
                    @cerrar = "cerrarSesion"
                />
            </div>
        </div>
    </header>

    <Buscador :show="showModalb" @close="closeModalb" />
    <ContenidoCarrito :show="showModala" @close="closeModala" />
    <RegisUsuario :show="showModal" @close="closeModal" @submit="handleUserSubmit" />
    <MenuSaltos v-if="existeUsuario"/>
    
    <!-- ********************************************************************************************* -->
    <!-- ********************************************************************************************* -->
</template>
<style scoped>
.header {
    background-color:var(--color2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 30px;
    border-bottom: 1px solid white;
}
.logo {
    display: flex;
    align-items: center;
}
img {/*blanco*/
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(37deg) brightness(103%) contrast(102%); 
}
img:hover {
    filter: var(--color7);
}
.nombreP {
    font-size: 1.5em;
    color: white;
    font-weight: bold;
    margin-left: 10px;
}
.nombreP:hover{
    filter: var(--color7);
}
.varios {
    display: flex;
    align-items: center;
    gap: 20px;
}
/* Buscador ------------------------------------------------------------- */
.bot-buscar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 20px;
    background: var(--color3);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}
.bot-buscar:hover {
    background-color: var(--color6);
    color: black;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
}
.lupa:hover {
    filter: brightness(0);
}
/* icono carrito -------------------------------------------------------- */
.cart {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 1.2rem;
    color: white;
}
.svg-imagen:hover {
    transform: translateY(-4px);
    cursor: pointer;
}
/* Boton ---------------------------------------------------------------- */
.ocultar {
    display: none;
}
</style>