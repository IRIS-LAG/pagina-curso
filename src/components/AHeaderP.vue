<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { UsuarioGeneral } from '../data/Types.ts' 
import AUserProfile from './AUserProfile.vue'

//import avatar from '../assets/iconos/faceUsu.svg'
//import Buscador from './ABuscador.vue/index.ts'
//import ContenidoCarrito from './ContenidoCarrito.vue/index.ts'
//import RegisUsuario from './ARegisUsuario.vue/index.ts'
//import UserProfile from './AUserProfile.vue/index.ts'
//import MenuSaltos from './AMenuSaltos.vue/index.ts'

//-----------------------------
const nroItems = ref(5) //nro de items en el carrito
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
        <!-- Logo --------------------------------------------->
        <div class="logo">
            <img class="logoIm" src="../assets/iconos/LogoApre3.png" alt="Logo" width="100" height="60" style="margin: 7px;"/>
        </div>
        
        <!-- Buscar/carrito/iniciar sesion -------------------->
        <div class="varios">
            <div class="buscador">
                <button class="btn bot-buscar" @click="openModalb">
                    <span>Buscar</span>
                    <i class="fa-solid fa-magnifying-glass" alt="Buscar"></i>
                </button>
            </div>

            <!-- Icono de compra ------------------------------>
            <div class="cart" @click="openModala">
                <i class="fa-solid fa-cart-shopping" alt="carrito"></i>
                <p>{{ nroItems }}</p>
            </div>

            <!-- Boton de sesión ------------------------------>
            <div v-if = "!existeUsuario">
                <button class="btn" @click="openModal">Iniciar sesión</button>
            </div>

            <!-- icono/foto + nombreUsuario ------------------->
            <div v-if = "!existeUsuario">
                <AUserProfile 
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
    
    <!-- ********************************************************************************** -->
    <!-- ********************************************************************************** -->
</template>
<style scoped>
.header {
    background-color:var(--color2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    border-bottom: 1px solid white;
}
.varios {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-right: 20px;
}
/* Buscador ------------------------------------------------------------- */
.bot-buscar {
    display: flex;
    align-items: center;
    gap: 10px;
}
.fa-magnifying-glass {
    font-size: 1.3rem;
}
/* icono carrito -------------------------------------------------------- */
.cart {
    height: 38px;
    display: flex;
    align-items: center;
    color: white;
    gap: 8px;
    font-size: 1rem;
    border-bottom: 2px solid white;
    transition: transform 0.2s ease;
}
.fa-cart-shopping{
    font-size: 1.5rem;
}
.cart:hover {
    color: var(--color6);
    transform: scale(1.1);
    cursor: pointer;
}
</style>