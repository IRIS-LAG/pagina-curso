<script setup lang="ts">
import ListaUsu from '../components/AdmListaUsu.vue'
import ListaArea from '../components/AdmListaArea.vue'
import { ref } from 'vue'
//LISTA DE PANTALLAS DE CONFIGURACION
const items = ref([
    { nombre: 'USUARIOS' },
    { nombre: 'Areas..' },
    { nombre: 'Otros mas' },
    { nombre: '....' }
])
const pantallas = ref([
    ListaUsu,
    ListaArea,
    ListaUsu,
    ListaArea,
])
const itemSelecc = ref(-1)
const seleccionar = (index: number) => {
    //if (index == -1) return
    if (itemSelecc.value == index) {
        itemSelecc.value = -1 // Deseleccionar
    } else {
        itemSelecc.value = index // Seleccionar
    }

    
}
</script>

<template>
    <div class="cuerpo">
        <div class="barra-lateral">
            <h3>Configuración</h3>
            <div v-for="(item, index) in items" 
                :key="index"
                @click="seleccionar(index)"
                :class="{ 'seleccionado': itemSelecc === index }"
                class="item"
            >{{ item.nombre }}
            </div>    
        </div>
        <div class="cuerpoderecho"
            v-if="itemSelecc !== -1">
            <component :is="pantallas[itemSelecc]" />
        </div>  
    </div>
</template>

<style scoped>
.cuerpo {
    color: white;
    display: flex;
    width: 100%;
}
h3 {
    padding: 0;
    margin: 0 0 10px 0;
}
.barra-lateral {
    padding-left: 20px;
    padding-top: 10px;
    width: 240px;
    background-color: var(--color3);
}
.item {
    padding-left: 15px;
    padding-bottom: 3px;
    margin-bottom: 5px;
    cursor: pointer;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    border-bottom: 2px solid var(--color2);
    transition: background-color 0.3s;
}
.item:hover {
    background-color: var(--color6);
    color: var(--color1);
    font-weight: bold;
    border-bottom: 2px solid var(--color2);
}
.seleccionado {
    background-color: var(--color2);
    border-bottom: 2px solid var(--color6);
}
.cuerpoderecho {
    flex-grow: 1;
}
</style>