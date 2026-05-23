<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div>
        <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">Set Semula Kata Laluan</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleReset">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Kata Laluan Baharu</label>
            <input v-model="newPassword" type="password" required class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm mt-1">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Sahkan Kata Laluan</label>
            <input v-model="confirmPassword" type="password" required class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm mt-1">
          </div>
        </div>

        <div v-if="message" :class="isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'" class="text-sm text-center p-3 rounded">
          {{ message }}
        </div>

        <button type="submit" :disabled="isLoading" class="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-700 hover:bg-green-800 disabled:opacity-50 transition-colors">
          {{ isLoading ? 'Menyimpan...' : 'Simpan Kata Laluan' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const newPassword = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const message = ref('');
const isSuccess = ref(false);

const handleReset = async () => {
  if (newPassword.value !== confirmPassword.value) {
    isSuccess.value = false;
    message.value = "Kata laluan tidak sepadan.";
    return;
  }

  isLoading.value = true;
  message.value = '';
  
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${route.params.token}`, { newPassword: newPassword.value });
    isSuccess.value = true;
    message.value = response.data.message;
    setTimeout(() => router.push('/login'), 2000);
  } catch (error) {
    isSuccess.value = false;
    message.value = error.response?.data?.message || 'Token tidak sah atau telah luput.';
  } finally {
    isLoading.value = false;
  }
};
</script>