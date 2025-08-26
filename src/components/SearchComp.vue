<script setup lang="ts">
    function selectItem(type: string, event: Event) {
        const items = document.querySelectorAll(`.${type}-item`);
        items.forEach(item => item.classList.remove('active')); // Elimina la clase activa de todos los elementos
        (event.target as HTMLElement).classList.add('active'); // Agrega la clase activa al elemento clicado
    }
</script>

<template>
    <div class="search-panel">
        <!-- Categorías -->
        <div class="categorias">
            <h3>Categorías</h3>
            <ul>
                <li class="categoria-item" @click="selectItem('categoria', $event)">Todos</li>
                <li class="categoria-item" @click="selectItem('categoria', $event)">Educación</li>
                <li class="categoria-item" @click="selectItem('categoria', $event)">Entretenimiento</li>
                <li class="categoria-item" @click="selectItem('categoria', $event)">Tecnología</li>
            </ul>
        </div>

        <!-- Temas -->
        <div class="temas">
            <h3>Temas</h3>
            <ul>
                <li class="tema-item" @click="selectItem('tema', $event)">Todos</li>
                <li class="tema-item" @click="selectItem('tema', $event)">[Aquí aparecerán los temas]</li>
            </ul>
        </div>
    </div>

</template>

<style scoped>
    .search-panel {
        /*width: 300px;*/
        background-color: var(--color5);
        padding: 20px;
        display: flex;
        flex-direction: column;
        flex: 0 0 250px; /* Fija el ancho del panel de búsqueda */
    }
    .categorias ul, .temas ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .categoria-item, .tema-item {
        padding: 8px 12px;
        margin-bottom: 6px;
        background-color: var(--color4);
        border: 1px solid var(--color5);;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    .categoria-item:hover, .tema-item:hover {
        border: none;
        background-color: var(--color6);
        box-shadow: 0 3px 7px rgba(0, 0, 0, 1);
    }
    .categoria-item.active, .tema-item.active {
        color: white;    
        background-color: var(--color1);
    }
</style>