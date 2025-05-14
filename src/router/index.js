import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home/Home.vue';
import EmployeesView from '@/views/employees/Employees.vue';
import NotFoundView from '@/views/404/NotFound.vue';  
import EmployeeView from '@/views/employee/Employee.vue';
import AddEmployeeView from '@/views/addEmployee/AddEmployee.vue';
import EditEmployeeView from '@/views/editEmployee/EditEmployee.vue'

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
            name: 'view-employee',
            component: EmployeeView,
        },
        {
            path: '/employees/edit/:id',
            name: 'edit-employee',
            component: EditEmployeeView,
        },
        {
            path: '/employees/add',
            name: 'add-employee',
            component: AddEmployeeView,
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView
        }
    ],
});

export default router;