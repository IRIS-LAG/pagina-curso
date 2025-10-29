<script setup lang="ts">
import { ref, computed } from 'vue'
import grupo from '../data/agrupacion.json'

const areas = ref(grupo.areas)
const materiasTodas = ref(grupo.materias)
const especializTodas = ref(grupo.especializ)
const subespecializTodas = ref(grupo.subEspecializ)
const descripcion = ref(['','','',''])

const areaSel = ref<number | null>(null)
const materiaSel = ref<number | null>(null)
const especializSel = ref<number | null>(null) 
const subespecializSel = ref<number | null>(null) //ref('Todos')

const materias = computed(() => {
    if (areaSel.value === null) {
        return [{idmateria: 0, nombre: 'Todos'}]
    }
    return materiasTodas.value.filter(m => m.id === areaSel.value)
})
const especializ = computed(() => {
    if (areaSel.value === null || materiaSel.value === null) {
        return [{especializ: 0, nombre: 'Todos'}]
    }
    return especializTodas.value.filter(
        e => e.id === areaSel.value && 
        e.idmateria === materiaSel.value
    )
})
const subespecializ = computed(() => {
    if (areaSel.value === null || materiaSel.value === null || especializSel.value === null) {
        return [{subespecializ: 0, nombre: 'Todos'}]
    }
    return subespecializTodas.value.filter(
        e => e.id === areaSel.value && 
        e.idmateria === materiaSel.value &&
        e.especializ === especializSel.value
    )
})

const handleAreaClick = (areaId: number, descrip: string) => {
    if (areaSel.value === areaId) {
        areaSel.value = null
        descripcion.value[0] = ''
    } else {
        areaSel.value = areaId
        descripcion.value[0] = descrip
    }
    materiaSel.value = null
    especializSel.value = null
    subespecializSel.value = null

    console.log('Descripción actualizada:', descripcion.value[0])
}
const handleMateriaClick = (materiaId: number, descrip: string) => {
    if (materiaSel.value === materiaId) {
        materiaSel.value = null
        descripcion.value[1] = ''
    } else {
        materiaSel.value = materiaId
        descripcion.value[1] = descrip
    }
    especializSel.value = null
    subespecializSel.value = null
}
const handleEspecClick = (especializId: number, descrip: string) => {
    if (especializSel.value === especializId) {
        especializSel.value = null
        descripcion.value[2] = ''
    } else {
        especializSel.value = especializId
        descripcion.value[2] = descrip
    }
    subespecializSel.value = null
}
const handleSubEspClick = (subespecializId: number, descrip: string) => {
    if (subespecializSel.value === subespecializId) {
        subespecializSel.value = null
        descripcion.value[3] = ''
    } else {
        subespecializSel.value = subespecializId
        descripcion.value[3] = descrip
    }
}

/*funcion de seleccionar item y desmarcar los otros del mismo grupo*/
function selectItem(event: Event, nivel: string) {
    const items = document.querySelectorAll(`.item-${nivel}`);
    items.forEach(item => item.classList.remove('active')); 
    (event.target as HTMLElement).classList.add('active'); 
}
</script>

<!--***********************************************************************************-->
<template>
    <div class="search-panel">
        <!-- Areas ----------------------------------------------->
        <div class="areas">
            <h3>Areas</h3>
            <ul>
                <li class="item item-area" v-for="area in areas" :key="area.id"
                    @click="handleAreaClick(area.id, area.nombre); selectItem($event, 'area')">
                    {{ area.nombre }}
                </li>
            </ul>
        </div>

        <!-- Materias  -------------------------------------------->
        <div class="materias">
            <h3>Materías</h3>
            <ul>
                <li class="item item-materia" v-for="materia in materias" :key="materia.idmateria"
                    @click="handleMateriaClick(materia.idmateria, materia.nombre); selectItem($event, 'materia')">
                    {{ materia.nombre }}
                </li>
            </ul>
        </div>

        <!-- Especicalizacion  ------------------------------------->
        <div class="especializ">
            <h3>Especialización</h3>
            <ul>
                <li class="item item-espec" v-for="espec in especializ" :key="espec.especializ"
                    @click="handleEspecClick(espec.especializ, espec.nombre); selectItem($event, 'espec')">
                    {{ espec.nombre }}
                </li>
            </ul>
        </div>

        <!-- Sub Especicalizacion  --------------------------------->
        <div class="subespecializ">
            <h3>Sub Especialización</h3>
            <ul>
                <li class="item item-subesp" v-for="subespec in subespecializ" :key="subespec.subespecializ"
                    @click="handleSubEspClick(subespec.subespecializ, subespec.nombre); selectItem($event, 'subesp')">
                    {{ subespec.nombre }}
                </li>
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