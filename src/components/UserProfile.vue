<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  username: string;
  avatarUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {
  avatarUrl: '', // Valor por defecto si no se proporciona
})

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

// Podrías añadir lógica aquí para cerrar el menú si se hace clic fuera.
// Por ahora, lo mantenemos simple.


</script>

<template>
  <div class="user-profile" @click="toggleDropdown">
    
    <div class="avatar-container">
      <img class="avatar-image"    v-if="avatarUrl" :src="avatarUrl" :alt="'Avatar de ' + username">
      <div class="avatar-initials" v-else >
        <span>{{ userInitials }}</span>
      </div>
    </div>

    <span class="username">{{ username }}</span>

    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      class="chevron-icon" 
      :class="{ 'rotated': isDropdownOpen }">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>

    <Transition name="fade">
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <ul>
          <li><a href="/mis datos">Mi Perfil</a></li>
          <li class="separator"></li>
          <li><a href="/salir">Cerrar Sesión</a></li>
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
  width: 50px;
  height: 50px;
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
  font-size: 1.3rem;
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
  top: calc(100% + 100px); 
  right: 0;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  width: 180px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 8px 0;
}

.dropdown-menu li a {
  display: block;
  padding: 10px 20px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown-menu li a:hover {
  background-color: #42b983;
  color: white;
}

.dropdown-menu .separator {
  height: 1px;
  background-color: var(--color-border);
  margin: 8px 0;
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