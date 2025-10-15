<script setup lang="ts"></script>

<template>
    <footer class="piePagina">
        <div class="pieizquierda">
            <h2>Aprende +</h2>
        </div>
    
        <div class="piecentro">Santa Cruz - Bolivia <br> © Copyright 2025</div>    

        <div class="piederecha">
            <nav class="menulogospie">
                <a class="redsoc" target="_blank"><img src="../assets/iconos/facebook.svg"  alt="Facebook"></a>
                <a class="redsoc" target="_blank"><img src="../assets/iconos/tiktok.svg"    alt="TikTok"></a>
                <a class="redsoc" target="_blank"><img src="../assets/iconos/instagram.svg" alt="Instagram"></a>
            </nav>
        </div>
    </footer>
</template>

<style scoped>
    .piePagina {
        background-color:var(--color2);
        padding: 5px 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        border-top: 1px solid white;
    }
    .menulogospie {
        display: flex;
        gap: 15px;
    }
    img {
        width: 50px;
        height: 50px;
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(37deg) brightness(103%) contrast(102%);   
    }
    img:hover {
        filter: var(--color7);
        width: 60px;
        height: 60px;
        cursor: pointer;
    }
</style>