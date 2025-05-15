<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import router from '@/router';
import { RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';

const form = reactive({
  type: 'Full-Time',
  code: '',
  name: '',
  occupation: '',
  department: '',
  salary: '',
  startDate: '',
  endDate: '',
  address: {
    suite: '',
    street: '',
    city: '',
    zipcode: ''
  },
  email: '',
  phone: ''
})

const handleSubmit = async () => {
  const formObj = {
    type: form.type,
    code: form.code,
    name: form.name,
    occupation: form.occupation,
    department: form.department,
    salary: form.salary,
    startDate: form.startDate,
    endDate: form.endDate ? form.endDate : '',
    address: {
      suite: form.address.suite,
      street: form.address.street,
      city: form.address.city,
      zipcode: form.address.zipcode
    },
    email: form.email,
    phone: form.phone
  }
  
  const toast = useToast();

  try {
    const response = await axios.post(`/api/employees`, formObj);
    toast.success('Employee added successfully', {
      timeout: 10000,
    });
    router.push(`/employees/view/${response.data.id}`);
  } catch (e) {
    console.log('Error fetching data', e);
    toast.error('Something went wrong', {
      timeout: 10000,
    });
  }
}
</script>

<template>

  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Employee</h2>


          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Code
              <span class="text-red-600">*</span>
            </label>
            <input v-model="form.code" type="text" id="code" name="code" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="A000000" required />
          </div>
          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2">Job Type
              <span class="text-red-600">*</span>
            </label>
            <select v-model="form.type" id="type" name="type" class="border rounded w-full py-2 px-3" required>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Name
              <span class="text-red-600">*</span>
            </label>
            <input v-model="form.name" type="text" id="name" name="name" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="John Doe" required />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Position
              <span class="text-red-600">*</span>
            </label>
            <input v-model="form.occupation" type="text" id="occupation" name="occupation"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Frontend Developer" required />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Department
              <span class="text-red-600">*</span>
            </label>
            <input v-model="form.department" type="text" id="department" name="department"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="IT" required />
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2">Salary
              <span class="text-red-600">*</span>
            </label>
            <input v-model="form.salary" type="number" id="salary" name="salary"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="24000" required />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Start Date
              <span class="text-red-600">*</span>
            </label>
            <input v-model="form.startDate" type="date" id="startDate" name="startDate"
              class="border rounded w-full py-2 px-3 mb-2" required />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Termination Date </label>
            <input v-model="form.endDate" type="date" id="endDate" name="endDate"
              class="border rounded w-full py-2 px-3 mb-2" />
          </div>

          <h3 class="text-2xl mb-5">Personal Info</h3>

          <div class="mb-4">
            <label for="suite" class="block text-gray-700 font-bold mb-2">Address</label>
            <input v-model="form.address.suite" type="text" id="suite" name="suite"
              class="border rounded w-full py-2 px-3 mb-4" placeholder="45, Apt 2" />
            <input v-model="form.address.street" type="text" id="street" name="street"
              class="border rounded w-full py-2 px-3 mb-4" placeholder="Street" />
            <input v-model="form.address.city" type="text" id="city" name="city"
              class="border rounded w-full py-2 px-3 mb-4" placeholder="City" />
            <input v-model="form.address.zipcode" type="text" id="zipcode" name="zipcode"
              class="border rounded w-full py-2 px-3" placeholder="Zip Code" />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Email
              <span class="text-red-600">*</span>
            </label>
            <input v-model="form.email" type="email" id="email" name="email"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="example@company.com" required />
          </div>

          <div class="mb-4">
            <label for="phone" class="block text-gray-700 font-bold mb-2">Phone</label>
            <input v-model="form.phone" type="tel" id="phone" name="phone" class="border rounded w-full py-2 px-3"
              placeholder="Phone" />
          </div>

          <div class="flex gap-2">
            <RouterLink to='/'
              class="text-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="button">
              Cancel
            </RouterLink>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>