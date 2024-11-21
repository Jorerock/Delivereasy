<template>
  <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Bienvenue</h2>

      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <!-- Email Field -->
        <div>
          <label 
            for="email" 
            class="block text-sm font-medium text-gray-700"
          >
            Email :
          </label>
          <div class="mt-1 relative">
            <input
              id="email"
              type="email"
              v-model="form.email"
              :class="[
                'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                errors.email ? 'border-red-300' : 'border-gray-300'
              ]"
              placeholder="email@delivreasy.fr"
              @blur="validateEmail"
            />
            <p 
              v-if="errors.email" 
              class="mt-1 text-sm text-red-600"
            >
              {{ errors.email }}
            </p>
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <label 
            for="password" 
            class="block text-sm font-medium text-gray-700"
          >
            Mot de passe :
          </label>
          <div class="mt-1 relative">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              :class="[
                'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10',
                errors.password ? 'border-red-300' : 'border-gray-300'
              ]"
              placeholder="Entrer votre mot de passe"
              @blur="validatePassword"
            />
            <!-- Password visibility toggle -->
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                :class="{ 'hidden': showPassword }"
                
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
              <svg
                class="h-5 w-5 text-gray-400"
                :class="{ 'hidden': !showPassword }"
                
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            </button>
            <p 
              v-if="errors.password" 
              class="mt-1 text-sm text-red-600"
            >
              {{ errors.password }}
            </p>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg
              v-if="isSubmitting"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isSubmitting ? 'Signing in...' : 'Connexion' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

const emit = defineEmits(['authentification'])

const form = reactive<FormData>({
  email: '',
  password: ''
})

const errors = reactive<FormErrors>({})
const isSubmitting = ref(false)
const showPassword = ref(false)

const validateEmail = () => {
  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
  } else {
    delete errors.email
  }
}

const validatePassword = () => {
  if (!form.password) {
    errors.password = 'Password is required'
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  } else {
    delete errors.password
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
  // Validate all fields
  validateEmail()
  validatePassword()

  // Check if there are any errors
  if (Object.keys(errors).length > 0) {
    return
  }

  try {
    isSubmitting.value = true
    await emit('authentification', {
      email: form.email,
      password: form.password
    })
  } catch (error) {
    console.error('Authentication error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>