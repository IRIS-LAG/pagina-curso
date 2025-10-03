
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import Home from '../views/Home.vue'

const routes : Array<RouteRecordRaw> = [
    {   
        path:'/',
        name:'home',
        component: Home
    },
    {   
        path:'/registros',
        name:'registros',
        component: () => import('../views/registros.vue')
    },
    {
        path:'/formulario',
        name:'formulario',
        component: () => import('../views/Formulario.vue')  
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router  