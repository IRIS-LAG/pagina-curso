
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import Home from '../views/Home.vue'

const routes : Array<RouteRecordRaw> = [
    {   
        path:'/',
        name:'home',
        component: Home
    },
    {   
        path:'/usuarioDatos',
        name:'usuarioDatos',
        component: () => import('../views/datosUsuario.vue')
    },
    //--------------------------------------------------***
    {   
        path:'/misCursos',
        name:'misCursos',
        component: () => import('../views/misCursos.vue')
    },
    {
        path:'/miEstado',
        name:'miEstado',
        component: () => import('../views/miEstado.vue')  
    },
    {
        path:'/administracion',
        name:'administracion',
        component: () => import('../views/administrac.vue')  
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router  