<script setup lang="ts">
</script>

<template>
    <div class="contenedor">
    <section class="textured-section">
        <div class="content-box">
            <h2>Sobre Nosotros</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusantium consequatur nihil atque facilis corrupti ratione, libero maxime beatae ipsam sapiente nostrum, ea illum quis non numquam explicabo et voluptas..
            </p>
        </div>
    </section>
    </div>
</template>

<style scoped>
    .contendor {
        width: 100%;
    }
    .textured-section {
        position: relative;
        background: 
            /* Capa de ruido fino */
            repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.03) 2px,
                rgba(0, 0, 0, 0.03) 4px
            ),
            repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.03) 2px,
                rgba(0, 0, 0, 0.03) 4px
            ),
            /* Capa de granulado */
            repeating-linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.02) 0px,
                transparent 1px,
                transparent 2px,
                rgba(0, 0, 0, 0.04) 3px
            ),
            repeating-linear-gradient(
                -45deg,
                rgba(255, 255, 255, 0.02) 0px,
                transparent 1px,
                transparent 2px,
                rgba(0, 0, 0, 0.04) 3px
            ),
            /* Variación de color para simular irregularidades */
            radial-gradient(
                circle at 20% 30%,
                rgba(255, 255, 255, 0.03) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 80% 70%,
                rgba(0, 0, 0, 0.05) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 50% 50%,
                rgba(255, 255, 255, 0.02) 0%,
                transparent 70%
            ),
            /* Color base verde oscuro */
            linear-gradient(
                135deg,
                    var(--color2) 0%,
                    var(--color3) 50%,
                    var(--color6) 100%
                );
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
        }

        .content-box {
            padding: 20px;
            /*border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 1);*/
            max-width: 800px;
            text-align: center;
        }

        h2 {
            padding: 0;
            margin: 0;
            color: var(--color1);
            margin-bottom: 10px;
            font-size: 1.8em;
        }

        p {
            color: white;
            line-height: 1.2;
            font-size: 1.1rem;
        }

        
</style>