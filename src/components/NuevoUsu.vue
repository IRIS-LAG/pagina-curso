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
                    <h3>Crear una Nueva Cuenta</h3>
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
            
                        <button type="submit" class="submit-button">Registrarse</button>
                    </form>
                </main>
                
                <footer class="modal-footer">
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
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #1a202c;
}

.close-button {
  border: none;
  background: none;
  font-size: 2rem;
  font-weight: 300;
  cursor: pointer;
  color: #718096;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4a5568;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
}

.submit-button {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  background-color: #4299e1;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #3182ce;
}

.modal-footer {
  background-color: #f7fafc;
  padding: 1rem 1.5rem;
  text-align: center;
  border-top: 1px solid #e2e8f0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.modal-footer p {
  margin: 0;
  color: #4a5568;
}

.modal-footer a {
  color: #4299e1;
  text-decoration: none;
  font-weight: 600;
}

/* Estilos para la transición */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>