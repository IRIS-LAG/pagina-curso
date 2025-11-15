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
  <div v-if="props.show" class="modal-overlay" @click.self="emit('close')">
      
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
            
          <button type="submit" class="btn">Regístrame</button>

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
.modal-container {
  max-width: 520px;
}
.modal-body {
  padding: 1.5rem 2.8rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.form-group input {
  padding: 6px;
  border: 1px solid var(--color3);
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 5px;
}
.form-group input:focus {
  outline: none;
  border: 2px solid var(--color2);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  
}
.btn {
  font-size: 1.2rem;
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