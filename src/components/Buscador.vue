
<script setup lang="ts">
import { ref } from 'vue'
import cursosT from '../data/datosCursos.json'
type Curso = typeof cursosT.cursos[number]
const todosLosCursos  = ref<Curso[]>(cursosT.cursos)
const textoBusqueda = ref('')
const cursosEncontrados = ref<Curso[]>([])
const buscando = ref(false)
const busquedaRealizada = ref(false)

// -------------------------recibe del padre
const props = defineProps<{
    show: boolean
}>()
// -------------------------envia al padre
const emit = defineEmits<{
    (e: 'close'): void
}>()
// -------------------------busqueda de cursos
const buscarCursos = () => {
    if (!textoBusqueda.value.trim()) {
        return
    }
    buscando.value = true
    busquedaRealizada.value = true
    // Simular búsqueda con delay (reemplazar con llamada API real)
    setTimeout(() => {
        const busqueda = textoBusqueda.value.toLowerCase()
        cursosEncontrados.value = todosLosCursos.value.filter(curso => {
            return (
                curso.title.toLowerCase().includes(busqueda) ||
                curso.instructor.toLowerCase().includes(busqueda)
            )
        })
    buscando.value = false
    }, 500)
}
const verCurso = (curso: Curso) => {
    // console.log('Ver curso:', curso)
    // Aquí puedes navegar a la página del curso o abrir un modal
    // Ejemplo con Vue Router:
    // router.push({ name: 'DetalleCurso', params: { id: curso.id } })
    alert(`Abriendo curso: ${curso.title}`)
}
</script>

<template>
    <Transition name="modal-fade">
        <div v-if="props.show" class="modal-overlay" @click.self="emit('close')">
            <div class="modal-container">
                
                <header class="modal-header">
                    <h3>Buscador</h3>
                    <button class="close-button" @click="emit('close')">&times;</button>
                </header>

                <main class="modal-body">
                    <div class="barra-busqueda">
                        <input 
                            v-model="textoBusqueda"
                            type="text" 
                            placeholder="Buscar cursos por nombre, área o instructor..."
                            autocomplete="off"
                            @keyup.enter="buscarCursos"
                        >
                        <button @click="buscarCursos" class="btn-buscar">
                            <img src="../assets/iconos/magnifying.svg" alt="inicia busqueda" class="icono-bus">
                        </button>
                    </div>

                    <div v-if="buscando" class="mensaje-carga">
                        <p>Buscando cursos...</p>
                    </div>
                    <div v-if="!buscando && busquedaRealizada && cursosEncontrados.length === 0" class="sin-resultados">
                        <p>No se encontraron cursos para "{{ textoBusqueda }}"</p>
                    </div>
                    <!-- ----------------------------- Resultados -->
                    <div v-if="cursosEncontrados.length > 0" class="resultados" title="Para VER, Click">
                        <p class="contador-resultados">
                            Se encontraron {{ cursosEncontrados.length }} curso(s)
                        </p>

                        <div class="lista-cursos">
                            <div v-for="curso in cursosEncontrados" :key="curso.id" 
                                class="curso-item"
                                @click="verCurso(curso)"
                                >
                                <div class="contendor-imagen">
                                  <img :src="curso.imageUrl" :alt="curso.title" class="curso-imagen">
                                </div>
                                <div class="curso-info">
                                    <p class="curso-titulo">{{ curso.title }}</p>
                                    <p class="curso-instructor"> {{ curso.instructor }}</p>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </main>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-container {
  max-width: 60vw;
  height: 85vh;
}
.modal-body {
  padding: 1.5rem 2.5rem;
  scrollbar-width: thin;
  overflow-y: auto;
}
.barra-busqueda {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
}
.barra-busqueda input {
  flex: 1;
  padding: 15px 20px;
  border: 1px solid var(--color3);
  border-radius: 4px;
  font-size: 1rem;
  transition: border 0.3s ease;
}
.barra-busqueda input:focus {
  outline: none;
  border: 2px solid var(--color2);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
}
.icono-bus {
  width: 40px;
  height: 40px;
  filter: var(--color9);
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
/* Mensajes--------------------- */
.mensaje-carga, .sin-resultados {
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 40px;
  color: var(--color2)
}
.contador-resultados {
  color: var(--color3);
  margin-bottom: 15px;
  font-size: 0.9rem;
}
/* Resultados-------------------- */
.lista-cursos {
  display: grid;
  gap: 14px;
}
.curso-item {
  display: flex;
  background: white;
  border-radius: 8px;
  gap: 12px;
  transition: all 0.3s ease;
}
.curso-item:hover {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  transform: translateY(-4px);
}
.contendor-imagen {
  width: 40px;
  height: 100%;
  overflow: hidden;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.curso-imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
p {
  padding: 0;
  margin: 0;
  color: var(--color2);
}
.curso-titulo {
  font-size: 1rem;
  font-weight: 600;
}
.curso-instructor {
  font-size: 0.9rem;
  color: var(--color1);
}
</style>