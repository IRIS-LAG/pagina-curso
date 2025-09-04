<script setup lang="ts">
import { ref, computed } from 'vue'
import grupo from '../data/agrupacion.json'

const areas = ref(grupo.areas)

const areaSel = ref('Todos')
const materiaSel = ref('Todos')
const especializSel = ref('Todos')
const subespecializSel = ref('Todos')

const materias = computed(() => {
    if (areaSel.value === 'Todos') 
    {
        materiaSel.value = 'Todos'
        especializSel.value = 'Todos'
        subespecializSel.value = 'Todos'
        return [{ nombre: 'Todos' }]
    }
    const area = areas.value.find(a => a.nombre === areaSel.value)
    return area?.materias ?? [{ nombre: 'Todos' }]
})
const especializs = computed(() => {
    if (materiaSel.value === 'Todos') 
    {
        especializSel.value = 'Todos'
        subespecializSel.value = 'Todos'
        return [{ nombre: 'Todos' }]
    }
    /*
    const materia = materias.value.find(m => m.nombre === materiaSel.value)
    return materia?.especializ ?? [{ nombre: 'Todos' }]
    */
})
/*
const subespecializs = computed(() => {
    if (especializSel.value === 'Todos') 
    {
        subespecializSel.value = 'Todos'
        return [{ nombre: 'Todos' }]
    }
    const espec = especializs.value.find(e => e.nombre === especializSel.value)
    return espec?.subespecializ ?? [{ nombre: 'Todos' }]
})
*/

/*funcion de seleccionar item y desmarcar los otros del mismo grupo*/
    function selectItem(event: Event) {
        const items = document.querySelectorAll(`.item`);
        items.forEach(item => item.classList.remove('active')); // Elimina la clase activa de todos los elementos
        (event.target as HTMLElement).classList.add('active'); // Agrega la clase activa al elemento clicado
    }
</script>

<!--***********************************************************************************-->
<template>
    <div class="search-panel">
        <!-- Areas ----------------------------------------------->
        <div class="areas">
            <h3>Areas</h3>
            <ul>
                <li class="item" v-for="area in areas" :key="area.nombre"
                    @click="selectItem($event); areaSel = area.nombre">
                    {{ area.nombre }}
                </li>
            </ul>
        </div>

        <!-- Temas  ----------------------------------------------->
        <div class="materias">
            <h3>Materías</h3>
            <ul>
                <li class="item" v-for="materia in materias" :key="materia.nombre"
                    @click="selectItem($event); materiaSel = materia.nombre">
                    {{ materia.nombre }}
                </li>
            </ul>
        </div>

        <!-- Especicalizacion  ------------------------------------->
        <div class="especializ">
            <h3>Especialización</h3>
            <ul>
                <li class="item" v-for="especializ in especializs" :key="especializ.nombre"
                    @click="selectItem($event); especializSel = especializ.nombre">
                    {{ especializ.nombre }}
                </li>
            </ul>
        </div>

        <!-- Especicalizacion  ------------------------------------->
        <div class="subespecializ">
            <h3>Sub Especialización</h3>
            <ul>
                <li class="item" @click="selectItem($event)">Todos</li>
            </ul>
        </div>

    </div>

</template>

<style scoped>
    .search-panel {
        /*width: 300px;*/
        background-color: var(--color5);
        padding: 20px 0px 0px 15px;
        margin: 0px;
        display: flex;
        flex-direction: column;
        flex: 0 0 250px; /* Fija el ancho del panel de búsqueda */
    }
    h3 {
        margin: 0px;
        padding: 0px;
    }
    ul {
        list-style: none;
        margin: 0px;
        padding: 10px 15px;
    }
    .item {
        padding: 4px 12px;
        margin-bottom: 6px;
        background-color: var(--color4);
        /*border: 1px solid var(--color5);*/
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    .item:hover {
        /*border: none;*/
        background-color: var(--color6);
        box-shadow: 0 3px 7px rgba(0, 0, 0, 1);
    }
    .item.active {
        color: white;    
        background-color: var(--color1);
    }
</style>