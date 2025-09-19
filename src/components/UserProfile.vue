<script setup lang="ts">
// Definimos la estructura del objeto 'user' que este componente espera recibir
interface User {
  name: string;
  avatarUrl: string;
}

// Recibimos el objeto 'user' como una prop desde el componente padre
defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="user-profile">
    <img :src="user.avatarUrl" :alt="`Avatar de ${user.name}`" class="avatar" />
    <span class="username">{{ user.name }}</span>
  </div>
</template>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 12px; /* Espacio entre la imagen y el nombre */
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* Hace la imagen redonda */
  object-fit: cover;
  border: 2px solid #e2e8f0;
}

.username {
  font-weight: 600;
  color: #2d3748;
}
</style>