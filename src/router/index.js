import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home/Home.vue';
import EmployeesView from '@/views/employees/Employees.vue';
import NotFoundView from '@/views/404/NotFound.vue';  
import EmployeeView from '@/views/employee/Employee.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/employees',
            name: 'employees',
            component: EmployeesView,
        },
        {
            path: '/employees/view/:id',
            name: 'employee',
            component: EmployeeView,
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView
        }
    ],
});

export default router;