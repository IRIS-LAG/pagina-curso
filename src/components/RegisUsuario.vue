<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
// -------------------------recibe del padre
const props = defineProps<{
  show: boolean
}>()
// -------------------------envia al padre
const emit = defineEmits<{
    (e: 'close'): void
    (e: 'submit', payload: { email: string; username: string; password: string }): void
}>();
// -------------------------para vincular los datos de los inputs del formulario.
const email = ref('')
const username = ref('')
const password = ref('')
// -------------------------crear usuario
watch(email, (newEmail) => {
  const atIndex = newEmail.indexOf('@')
  if (atIndex > 0) {
    username.value = newEmail.slice(0, atIndex) // Extrae la parte izquierda del email
  } else {
    username.value = '' // Limpia el username si el email no es válido
  }
})
// -------------------------LÓGICA DE ENVÍO
const handleSubmit = () => {
    // Validación básica (en una app real usarías Vuelidate o Zod)
    if (!username.value || !email.value || !password.value) {
        alert('Por favor, completa todos los campos')
        return
    }
    emit('submit', {
        email: email.value,
        username: username.value,
        password: password.value,
    })
    email.value = ''
    username.value = ''
    password.value = ''
}
// -------------------------enfocar el campo email al abrir el modal
//no esta funcionando
const emailInput = ref<HTMLInputElement | null>(null)
onMounted(() => {
  nextTick(() => {
    if (emailInput.value) {
      emailInput.value.focus()
      console.log('Input enfocado')
    }
  })
})
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
              <label for="email">Correo Electrónico</label>
              <input type="email" id="email" v-model="email" placeholder="tu@correo.com" ref="emailInput" required/>
            </div>

            <div class="form-group">
              <label for="username">Nombre de Usuario</label>
              <input type="text" id="username" v-model="username" placeholder="ej: juanperez" required />
            </div>

            <div class="form-group">
              <label for="password">Contraseña</label>
              <input type="password" id="password" v-model="password" placeholder="Mínimo 8 caracteres" required />
            </div>
            
            <button type="submit" class="btn btnb">Regístrame</button>
            <br/>
          
          </form>
        </main>
                
        <footer class="modal-footer">
          <p>Al hacer click, aceptas los términos de uso.</p>  
        </footer>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(36, 35, 35, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-container {
  background-color: var(--color5);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
  border-radius: 10px;
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;

}
.modal-header {
  background-color: var(--color2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  /*margin-top: 10px;*/
  border-bottom: 4px solid white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
  color:white;
  height: 40px;
  margin-top: -35px;
  transition: color 0.2s;
}
.close-button:hover {
  color: var(--color6);
}
.modal-body {
  padding: 1.5rem 2.8rem;
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
/*
.form-group input:focus {
  background-color: var(--color6-rgb);
}
  */
.btnb {
  font-size: 1.5rem;
  margin-top: 20px;
}
.modal-footer {
  margin-top: 20px;
  background-color: var(--color2);
  color: white;
  text-align: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>