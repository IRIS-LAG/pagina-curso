<template>
  <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
    <div v-if="message" :class="messageClass" class="mb-4 p-4 text-center rounded-lg" role="alert">
      {{ message }}
    </div>
    <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">Iniciar Sesión</h1>
    
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Nombre de usuario</label>
        <input 
          v-model="username"
          type="text" 
          id="username" 
          name="username" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Ingresa tu nombre de usuario" 
          required
        >
      </div>
      
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
        <input 
          v-model="password"
          type="password" 
          id="password" 
          name="password" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Ingresa tu contraseña" 
          required
        >
      </div>
      
      <button 
        type="submit" 
        class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Entrar
      </button>
    </form>
    
    <div class="mt-4">
      <button 
        @click="loginWithFacebook"
        class="w-full flex items-center justify-center bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="mr-2">
            <path d="M12 2.049c-5.462 0-9.913 4.452-9.913 9.914 0 5.093 3.737 9.324 8.604 9.835v-6.953h-2.583v-2.882h2.583v-2.203c0-2.553 1.547-3.951 3.834-3.951 1.096 0 2.036.082 2.302.119v2.671h-1.571c-1.246 0-1.488.593-1.488 1.465v1.939h2.955l-.478 2.882h-2.477v6.953c4.867-.511 8.604-4.742 8.604-9.835.001-5.462-4.451-9.914-9.913-9.914z"/>
        </svg>
        <span>Iniciar con Facebook</span>
      </button>
    </div>
    
    <div class="mt-6 text-center">
      <a href="#" class="text-blue-600 hover:underline text-sm">¿Olvidaste tu contraseña?</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const username = ref('');
const password = ref('');
const message = ref('');
const messageType = ref('');

const messageClass = computed(() => {
  return messageType.value === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
});

const handleLogin = () => {
  // Lógica de autenticación del formulario
  if (username.value === 'test' && password.value === '1234') {
    showMessage('Inicio de sesión exitoso.', 'success');
    // Aquí podrías emitir un evento, redirigir al usuario, etc.
  } else {
    showMessage('Nombre de usuario o contraseña incorrectos.', 'error');
  }
};

const loginWithFacebook = () => {
  // Lógica para iniciar sesión con Facebook
  showMessage('Iniciando sesión con Facebook...', 'success');
  // Aquí iría la integración con la API de Facebook
};

const showMessage = (text, type) => {
  message.value = text;
  messageType.value = type;
  // Ocultar el mensaje después de 3 segundos
  setTimeout(() => {
    message.value = '';
    messageType.value = '';
  }, 3000);
};
</script>

<style scoped>
/* No se necesitan estilos CSS adicionales gracias a Tailwind */
</style>
