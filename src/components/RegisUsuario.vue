<script setup lang="ts">
import { ref } from 'vue';

// 1. DEFINIR PROPS Y EMITS (El "contrato" del componente)
// El componente no se muestra por sí mismo, el padre lo decide con la prop 'show'.
defineProps<{
    show: boolean;
    
}>();

// El componente notifica al padre cuando debe cerrarse o cuando el formulario se envía.
const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit', payload: { username: string; email: string; password: string }): void;
}>();

// 2. ESTADO LOCAL PARA EL FORMULARIO
// 'refs' para vincular los datos de los inputs del formulario.
const username = ref('');
const email = ref('');
const password = ref('');

// 3. LÓGICA DE ENVÍO
const handleSubmit = () => {
    // Validación básica (en una app real usarías Vuelidate o Zod)
    if (!username.value || !email.value || !password.value) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Emitimos el evento 'submit' con los datos del formulario.
    // El componente padre se encargará de la lógica de registro (ej. llamar a una API).
    emit('submit', {
        username: username.value,
        email: email.value,
        password: password.value,
    });
};
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="emit('close')">
      <div class="modal-container">

        <header class="modal-header">
          <h3>Registro de Usuario</h3>
          <button class="close-button" @click="emit('close')">&times;</button>
        </header>

        <main class="modal-body">
          <form @submit.prevent="handleSubmit">
          
            <div class="form-group">
              <label for="username">Nombre de Usuario</label>
              <input type="text" id="username" v-model="username" placeholder="ej: juanperez" required />
            </div>

            <div class="form-group">
              <label for="email">Correo Electrónico</label>
              <input type="email" id="email" v-model="email" placeholder="tu@correo.com" required />
            </div>

            <div class="form-group">
              <label for="password">Contraseña</label>
              <input type="password" id="password" v-model="password" placeholder="Mínimo 8 caracteres" required />
            </div>
            
            <button type="submit" class="submit-button">Regístrate</button>
            <br/>
          
          </form>
        </main>
                
        <footer class="modal-footer">
          <p>Al hacer click, aceptas los términos de uso.</p>  
          <p>¿Ya tienes una cuenta? <a href="#">Ingresa aquí</a></p>
        </footer>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 5. ESTILOS PARA EL MODAL Y LA SUPERPOSICIÓN */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(36, 35, 35, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-container {
  background-color: var(--color3);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
  width: 90%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-top: 10px;
  border-bottom: 4px solid white;
}
.modal-header h3 {
  margin: 0;
  font-size: 1.6rem;
  color: white;
  width: 100%;
  text-align: center;
}
.close-button {
  border: none;
  background: none;
  font-size: 3.4rem;
  font-weight: 300;
  cursor: pointer;
  color: #34383f;
  height: 40px;
  margin-top: -35px;
  transition: color 0.2s;
}
.close-button:hover {
  color: var(--color6);
}
.modal-body {
  padding: 1.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.3rem;
  color: black
}
.form-group input {
  /*width: 100%;*/
  padding: 0.75rem;
  margin-top: 0.65rem;
  border: 1px solid var(--color2);
  outline: none;
  border-radius: 6px;
  font-size: 1.2rem;
}
.form-group input:focus {
  background-color: var(--color6-rgb);
}
  .submit-button {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  background-color: var(--color2);
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}
.submit-button:hover {
  background-color: var(--color6);
  color: black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
  font-weight: bold;
}
.modal-footer {
  background-color: var(--color4);
  text-align: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
/*
.modal-footer p {
  margin: 0;
  color: #4a5568;
}

.modal-footer a {
  color: #4299e1;
  text-decoration: none;
  font-weight: 600;
}

/* Estilos para la transición 
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
*/
</style>