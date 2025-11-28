<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
// -------------------------recibe del padre
interface Props {
  username?: string
  avatarUrl?: string
}
const props = withDefaults(defineProps<Props>(), {
  avatarUrl: '', // Valor por defecto si no se proporciona
})
// -------------------------envia al padre
const emit = defineEmits<{
    (e: 'cerrar'): void
}>();
const CerrarSesion = () => {
  emit('cerrar')
};

const isDropdownOpen = ref(false)

// 3. PROPIEDADES COMPUTADAS
// Una propiedad computada para obtener la inicial del usuario.
// Se usará si no hay `avatarUrl`.
const userInitials = computed(() => {
  if (props.username) {
    return props.username.charAt(0).toUpperCase()
  }
  return '?'
})
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

// lógica para cerrar el menú si se hace clic fuera.
const userProfileComponent = ref(null)
onClickOutside(userProfileComponent, () => {
  isDropdownOpen.value = false
})
/******************************************************************************************/
/******************************************************************************************/
/*
      */
</script>

<template>
  <div class="user-profile" @click="toggleDropdown" ref="userProfileComponent">
    
    <div class="avatar-container">
      <img class="avatar-image"    v-if="avatarUrl" :src="avatarUrl" :alt="'Avatar de ' + username">
      <div class="avatar-initials" v-else >
        <span>{{ userInitials }}</span>
      </div>
    </div>

    <span class="username">{{ username }}</span>

    <svg 
      xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"     
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="chevron-icon" 
      :class="{ 'rotated': isDropdownOpen }">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>

    <Transition name="fade">
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <ul>
          <RouterLink to="/usuarioDatos" class="drop-link">Mi Perfil</RouterLink>
          <li class="separator"></li>
          <RouterLink to="/" class="drop-link" @click="CerrarSesion">Cerrar Sesión</RouterLink>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.user-profile {
  background-color: var(--color1);
  color: var(--color6);
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 10px; 
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.user-profile:hover {
  background-color: var(--color3);
  color: white;
}
.avatar-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden; 
  background-color: var(--color3);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color1);
}
.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-initials {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Icono de flecha */
.chevron-icon {
  color: var(--color-text-soft);
  transition: transform 0.3s ease;
}
.chevron-icon.rotated {
  transform: rotate(180deg);
}

/* Menú desplegable */
.dropdown-menu {
  position: absolute;
  text-align: center;
  /*top: calc(100% + 100px); */
  top: 80px;
  right: 30px;
  background-color: var(--color3);
  border: 1px solid var(--color1);
  border-radius: 12px;
  width: 180px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
  z-index: 1000;
  overflow: hidden;
}
.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dropdown-menu li a, .dropdown-menu .drop-link {
  display: block;
  padding: 10px 20px;
  color: var(--color6);
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.dropdown-menu li a:hover, .dropdown-menu .drop-link:hover {
  background-color: var(--color6);
  color: white;
}
.dropdown-menu .separator {
  height: 0.5px;
  background-color: var(--color2);
  margin: 0;
}

/* Transición para el menú */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

</style>