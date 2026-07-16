import {createRouter, createWebHistory, type RouteRecordRaw,} from 'vue-router'
import {authRouter} from '@/stores/auth.ts'
import HomeView from '@/views/public/HomeView.vue'
import AboutView from '@/views/public/AboutView.vue'
import ProductListView from '@/views/public/ProductListView.vue'
import ProfileView from '@/views/ProfileView.vue'
import SigninView from '@/views/auth/SigninView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import UsersView from '@/views/admin/users/ListView.vue'
import ProductsView from '@/views/admin/products/ListView.vue'
import AddUserView from "../views/admin/users/AddUserView.vue";
import EditUserView from "../views/admin/users/EditUserView.vue";
import CartView from "../views/public/CartView.vue";
import {useAuthStore} from "../stores/auth";

const routes: Array<RouteRecordRaw> = [
    // Redirect route group
    {
        path: '',
        meta: {requiresAuth: false, roles: ['user']},
        children: [
            {
                path: '/login',
                redirect: '/signin',
            },
            {
                path: '/register',
                redirect: '/signup',
            },
            {
                path: '/admin',
                redirect: '/admin/dashboard',
            },
        ],
    },
    // Auth route group
    {
        path: '/auth',
        component: () => import('@/components/auth/Auth.vue'),
        children: [
            {
                path: '/signin',
                name: 'signin',
                meta: {requiresAuth: false},
                component: SigninView,
            },
            {
                path: '/signup',
                name: 'signup',
                meta: {requiresAuth: false},
                component: SignupView,
            },
        ],
    },
    // Customers route group (no requires)
    {
        path: '',
        meta: {requiresAuth: false},
        children: [
            {
                path: '',
                name: 'home',
                component: HomeView,
            },
            {
                path: '/about',
                name: 'about',
                component: AboutView,
            },
            {
                path: '/test',
                name: 'test',
                component: ProductListView,
            },
            {
                path: '/profile',
                name: 'profile',
                component: ProfileView,
            },
            {
                path: '/cart',
                name: 'cart',
                component: CartView,
            },
        ],
    },
    // Admin route group (required roles owner, admin, moderator)
    {
        path: '/admin',
        component: () => import('../layouts/admin/AdminLayout.vue'),
        meta: {requiresAuth: true, roles: ['admin']},
        children: [
            {
                path: '/admin/dashboard',
                name: 'admin/dashboard',
                meta: {
                    requiresAuth: true,
                    breadcrumbs: 'dashboard',
                    roles: ['owner, admin, moderator'],
                },
                component: DashboardView,
            },
            {
                path: '/admin/users',
                name: 'admin/users',
                meta: {
                    requiresAuth: true,
                    breadcrumbs: 'users',
                    roles: ['owner, admin, moderator'],
                },
                component: UsersView,
            },
            {
                path: '/admin/users/edit/:id',
                name: 'admin/users/edit',
                meta: {
                    requiresAuth: true,
                    breadcrumbs: 'users/edit',
                    roles: ['owner, admin, moderator'],
                },
                component: EditUserView,
            },
            {
                path: '/admin/users/add',
                name: 'admin/users/add',
                meta: {
                    requiresAuth: true,
                    breadcrumbs: 'users',
                    roles: ['owner, admin, moderator'],
                },
                component: AddUserView,
            },
            {
                path: '/admin/products',
                name: 'admin/products',
                meta: {
                    requiresAuth: true,
                    breadcrumbs: 'products',
                    roles: ['owner, admin, moderator'],
                },
                component: ProductsView,
            },
        ],
    },
    // Error route group
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        meta: {
            requiresAuth: false
        },
        component: () => import('@/views/NotFoundView.vue'),
    },
]

/**
 * Create a router instance with the given routes and history mode
 * @param { Array<RouteRecordRaw> } routes - The routes to be used by the router
 * @param { string } history - The history mode to be used by the router
 * @returns { router } The router instance
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router

/**
 * Route guard to verify user login
 * @param { RouteLocationNormalizedGeneric } to - The route to be verified
 * @returns { Promise<boolean> } A promise that resolves to a boolean value
 */
router.beforeEach((to) => {
    return authRouter.verifyUserLogin(to)
})

router.afterEach((to) => {
    if (to.path === '/admin' || to.path.startsWith('/admin/')) {
        document.title = 'Wood&Clay — Admin Panel'
    } else {
        document.title = 'Wood&Clay'
    }
})