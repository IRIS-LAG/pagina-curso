<script setup lang="ts">
import UserProfile from './UserProfile.vue'
import UnUsuario from './RegisUsuario.vue'
import { ref, onMounted } from 'vue'

// ------------para manejo del usuario en el header
interface User {
    name: string
    avatarUrl: string
}
const usuario = ref<User | null>(null)
const existeUsuario = ref(false)
const cargarUsuario = () => {
    const userData = localStorage.getItem('usuario')
    if (userData) {
        usuario.value = JSON.parse(userData) // Restaura el usuario
        existeUsuario.value = true
    }
}
const guardarUsuario = (user: User) => {
    localStorage.setItem('usuario', JSON.stringify(user)) 
}
// ------------para toda la carga del modal de registro de usuario
const showModal = ref(false)
const openModal = () => {showModal.value = true;}
const closeModal = () => {showModal.value = false;}
const handleUserSubmit = (payload: { username: string; email: string; password: string }) => {
    //console.log('Nuevo usuario registrado:', payload) 
    const nuevoUsuario: User = {
        name: payload.username,
        avatarUrl: 'https://i.pravatar.cc/150?u=anagarcia' 
    }
    usuario.value = nuevoUsuario
    guardarUsuario(nuevoUsuario) //en memoria
    existeUsuario.value = true
    closeModal()   
    
    // Aquí iría la lógica para manejar el nuevo usuario, como llamar a una API.
    
}
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
            <p class="nombreP">LosC4rS0s</p>
        </div>
        
        <div class="varios">
            <div class="group"><!-- Buscador ------------------------------------>
                <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                </svg>
                <input id="query" class="input" type="search" placeholder="Buscar curso..." name="searchbar"/>
            </div>
        
            <div class="cart"><!-- Icono de compra ------------------------------>
                <img class="svg-imagen" src="../assets/iconos/carito.svg" alt="carrito" width="30" height="30"/>
                <p class="numeroP">8</p>
            </div>

            <div class="sesibutton" v-if = "!existeUsuario"><!-- Boton de sesión --->
                <button @click="openModal">Registrarse</button>
            </div>

            <div class="usuarioAct" v-if = "existeUsuario"><!-- icono/foto + nombreUsuario --->
                <UserProfile 
                    :username = "usuario?.name"
                    :avatarUrl = "usuario?.avatarUrl"
                />
            </div>
        </div>
    </header>
    
    <UnUsuario :show="showModal" @close="closeModal" @submit="handleUserSubmit" />
    
    <!-- ********************************************************************************************* -->
    <!-- ********************************************************************************************* -->
</template>

<style scoped>
    .header {
        background-color:var(--color2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 30px;
        border-bottom: 1px solid white;
    }
    .varios {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    /* logo y titulo -------------------------------------------------------- */
    img {
        /*blanco*/
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(37deg) brightness(103%) contrast(102%); 
    }
    .logo {
        display: flex;
        align-items: center;
    }
    .nombreP {
        font-size: 1.5em;
        color: white;
        font-weight: bold;
        margin-left: 10px;
    }
    img:hover {
        filter: var(--color7);
    }
    .nombreP:hover{
        filter: var(--color7);
    }

    /* Buscador ------------------------------------------------------------- */
    .group {
        display: flex;
        align-items: center;
        position: relative;
    }
    .search-icon {
        position: absolute;
        left: 1rem;
        fill: white;
        width: 1.6rem;
        height: 1.6rem;
        pointer-events: none;
        z-index: 1;
    }
    .input {
        height: 45px;
        padding-left: 3.2rem;
        border: 0;
        border-radius: 8px;
        background-color: var(--color3);
        outline: none;
        color: white;
        cursor: text;
        z-index: 0;
        font-size: 1.2rem;
    }
    .input::placeholder {
        color: whitesmoke;
    }
    .input:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    }
        
    /* icono carrito -------------------------------------------------------- */
    .cart {
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: 1.4rem;
        color: white;
    }
    .svg-imagen:hover {
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
    
    /* Boton ---------------------------------------------------------------- */
    button {
        font-size: 1.2rem;
        background-color: var(--color3);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    button:hover {
        background-color: var(--color6);
        color: black;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    }
    .ocultar {
        display: none;
    }
</style>