<script setup lang="ts">
import { ref } from 'vue'
import usuariosT from '../data/usuarios.json'

interface Usuario {
  id: number
  nombre: string
  email: string
  contraseña: string
  tipo: string
}
const verNuevoUsu = ref(true)
const usuarios = ref<Usuario[]>(usuariosT.usuarios)
const nueUsu = ref<Usuario>({
  id: 0,
  nombre: '',
  email: '',
  contraseña: '',
  tipo: ''
})

/*
const mostrarModal = ref(false)
const modoEdicion = ref(false)

const abrirModal = (usuario = null) => {
  mostrarModal.value = true
  if (usuario) {
    modoEdicion.value = true
    formulario.value = { ...usuario }
  } else {
    modoEdicion.value = false
    formulario.value = { id: null, nombre: '', sexo: '' }
  }
}

const cerrarModal = () => {
  mostrarModal.value = false
  formulario.value = { id: null, nombre: '', sexo: '' }
}

const guardarUsuario = () => {
  if (!formulario.value.nombre || !formulario.value.sexo) {
    alert('Por favor completa todos los campos')
    return
  }

  if (modoEdicion.value) {
    const index = usuarios.value.findIndex(u => u.id === formulario.value.id)
    if (index !== -1) {
      usuarios.value[index] = { ...formulario.value }
    }
  } else {
    const nuevoId = usuarios.value.length > 0 
      ? Math.max(...usuarios.value.map(u => u.id)) + 1 
      : 1
    usuarios.value.push({
      id: nuevoId,
      nombre: formulario.value.nombre,
      sexo: formulario.value.sexo
    })
  }
  cerrarModal()
}

const eliminarUsuario = (id) => {
  if (confirm('¿Estás seguro de eliminar este usuario?')) {
    usuarios.value = usuarios.value.filter(u => u.id !== id)
  }
}
*/

</script>

<template>
    <div class="cuerpo">
        <div class="cabeza">
            <h3>Administración de usuarios</h3>
            <div class="barra-busqueda">
                <input 
                    v-model="textoBusqueda"
                    type="text" 
                    placeholder="Buscar usuario..."
                    autocomplete="off"
                    @keyup.enter="buscarUsuario">
                <button @click="buscarUsuario" class="btn-buscar">
                    <img src="../assets/iconos/magnifying.svg" alt="inicia busqueda" class="icono-bus">
                </button>
            </div>
        </div>

        
        <!-- Tabla de usuarios -->
        <table class="tabla-usuarios">
            <thead>
                <tr>
                <th class="w-10">
                    <div class="creanuevo">
                        <button class="btn nuevo" @click="verNuevoUsu = !verNuevoUsu" title="Agregar nuevo usuario">+</button>
                        Nro
                    </div>
                </th>
                <th>Usuario</th>
                <th>Email</th>
                <th class="w-20">Contraseña</th>
                <th class="w-20">Tipo</th>
                <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <!-- Fila para agregar nuevo usuario -->
                <tr v-show="verNuevoUsu">
                <td class="acentro">#</td>
                <td><input type="text"     id="nombre" v-model="nueUsu.nombre"     placeholder="Nombre del usuario"></td>
                <td><input type="email"    id="email"  v-model="nueUsu.email"      placeholder="email"></td>
                <td><input type="password" id="nombre" v-model="nueUsu.contraseña" placeholder="contraseña"></td>
                <td><select id="tipo" v-model="nueUsu.tipo">
                    <option value=""        >Seleccione...</option>
                    <option value="admin"   >Administrador</option>
                    <option value="profesor">Profesor</option>
                    <option value="alumno"  >Alumno</option>
                    </select>
                </td>
                <td class="acciones">
                    <button class="btn guardar" title="Guardar">Guardar</button>
                </td>
                </tr>

                <!-- Filas de usuarios existentes -->
                <tr v-for="(usuario, index) in usuarios" :key="usuario.id">
                <td class="acentro">{{ index + 1 }}</td>
                <td>{{ usuario.nombre }}</td>
                <td>{{ usuario.email }}</td>
                <td class="acentro">{{ usuario.contraseña }}</td>
                <td class="acentro">{{ usuario.tipo }}</td>
                <td class="acciones acentro">
                    <button @click="abrirModal(usuario)"         class="btn editar"   title="Editar">E</button>
                    <button @click="eliminarUsuario(usuario.id)" class="btn eliminar" title="Eliminar">B</button>
                    <!--
                    <button @click="guardarUsuario(usuario.id)" class="btn guardar" title="Guardar">Guardar</button>
                    <button @click="guardarUsuario(usuario.id)" class="btn editar" title="Guardar">SI</button>
                    <button @click="guardarUsuario(usuario.id)" class="btn editar" title="Guardar">NO</button>
                    -->
                  </td>
                </tr>
                

                <tr v-if="usuarios.length == 0">
                <td colspan="6" class="sin-datos">No hay usuarios registrados</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.cuerpo {
    box-sizing: border-box;
    margin: 0px;
    padding: 30px;
    display: flex;
    flex-direction: column;
}
.cabeza {
    display: flex;
    align-content: space-between;
    justify-content: space-between;
    padding-bottom: 10px;
}
h3 {
    margin: 0px;
    margin-bottom: 10px;
    padding: 0px;
}
.barra-busqueda {
  display: flex;
  gap: 10px;
  /*background-color: yellow;*/
}
.barra-busqueda input {
  font-size: 0.8rem;
  padding-left: 10px;
  border-radius: 6px;
  border: none;
}
.barra-busqueda input:focus {
  outline: none;
}
.icono-bus {
  width: 30px;
  height: 30px;
  filter: var(--color10);
}
.icono-bus:hover {
  filter: var(--color7);
  cursor: pointer;
}
.btn-buscar {
  background: none;
  display: flex;
  align-items: center;
  border: solid 1px var(--color3);
  border-radius: 4px;
  cursor: pointer;
}
.btn-buscar:hover {
  transform: translateY(-4px);
  transition: all 0.2s ease;
} 
/*------------------------------------------------------------*/
.tabla-usuarios {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    border-radius: 4px;
    overflow: hidden;
}
.tabla-usuarios thead {
    background-color: var(--color3);
    color: black;
    text-align: center;
}
.tabla-usuarios th,
.tabla-usuarios td {
    padding: 5px;
    border-bottom: 1px solid var(--color3);
}
.acentro {
    text-align: center;
}
.creanuevo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
.w-10 {
    width: 75px;
}
.w-20 {
    width: 120px;
}
.nuevo, .editar, .eliminar {/*boton nuevo*/
    width: 30px;
    height: 30px;
    padding: 0;
    font-size: 20px;
    background-color: var(--color11);
    border-radius: 35%;
    border: solid 1px black;
}
/*------------------------------------------------------------*/
.acciones {
  display: flex;
  gap: 8px;
  justify-content: center;
  
}
.btn:hover {
    background-color: var(--color6);
}

/*
.btn {
    width: 30px;
    height: 30px;
    padding: 0;
    margin-right: 10px;
    margin-left: 10px;
    border-radius: 40%;
    border: none;
    background-color: #4CAF50;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
}
*/

.guardar {
  width: 80%;
  height: 30px;
  padding-top: 7px;
  border-radius: 6px;
  /*  
  background-color: var(--color3);
    font-size: 16px;
    width: 100px;
  */
}
/*------------------------------------------------------------*/
input {
    width: 100%;
    font-size: 1rem;
    padding: 5px;
    padding-left: 8px;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
}
input:focus {
    outline: none;
    background-color: var(--color6);
}
select {
    width: 100%;
    font-size: 1rem;
    padding: 4px;
    padding-left: 8px;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
}
select:focus {
    outline: none;
    background-color: var(--color6);
}
/*------------------------------------------------------------*/
.sin-datos {
    text-align: center;
    color: var(--color6);
    padding: 30px !important;
}
</style>