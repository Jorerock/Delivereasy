<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Main Content -->
      <div class="max-w-md mx-auto">
        <!-- Auth Status Messages -->
        <div 
          v-if="statusMessage"
          :class="[
            'mb-6 p-4 rounded-md',
            statusMessage.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          ]"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <!-- Success Icon -->
              <svg
                v-if="statusMessage.type === 'success'"
                class="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <!-- Error Icon -->
              <svg
                v-else
                class="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium">{{ statusMessage.message }}</p>
            </div>
          </div>
        </div>

        <!-- Login Form -->
        <div v-if="!isAuthenticated">
          <LoginComponent 
            @authentification="handleLogin"
            :isLoading="isLoading"
          />
        </div>

        <!-- Logout Section -->
        <div v-else class="text-center">
          <button
            @click="handleLogout"
            :disabled="isLoading"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Signing out...' : 'Me deconnecter' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as cookie from './Cookie'
import LoginComponent from '../components/LoginComponent.vue'

interface AuthResponse {
  token: string
  admin: string
  message?: string
}

interface StatusMessage {
  type: 'success' | 'error'
  message: string
}

const router = useRouter()
const isLoading = ref(false)
const statusMessage = ref<StatusMessage | null>(null)

const isAuthenticated = computed(() => !!cookie.getCookie('token'))

const showStatus = (message: string, type: 'success' | 'error') => {
  statusMessage.value = { message, type }
  setTimeout(() => {
    statusMessage.value = null
  }, 5000)
}

const handleLogin = async (credentials: { email: string, password: string }) => {
  isLoading.value = true
  statusMessage.value = null

  try {
    const response = await fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Utilisateur_Email: credentials.email,
        Utilisateur_Password: credentials.password,
        Credential: 'include'
      }),
    })

    const data: AuthResponse = await response.json()

    if (response.ok) {
      cookie.setCookie('token', data.token, 1)
      cookie.setCookie('isAdmin', data.admin, 1)
      showStatus('Successfully signed in!', 'success')
      router.push({ path: '/Welcome' })
      window.location.reload(); // Reloads the current page

    } else {
      throw new Error(data.message || 'Authentication failed')
    }
  } catch (error) {
    console.error('Login error:', error)
    showStatus(
      error instanceof Error ? error.message : 'An error occurred during sign in',
      'error'
    )
  } finally {
    isLoading.value = false
  }
}

const handleLogout = async () => {
  isLoading.value = true
  statusMessage.value = null

  try {
    const response = await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    if (response.ok) {
      // Clear cookies
      cookie.setCookie('token', 'null', -1)
      document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      cookie.setCookie('isAdmin', 'null', -1)
      document.cookie = 'isAdmin=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      showStatus('Successfully signed out', 'success')
      router.push({ path: '/login' })
      window.location.reload(); // Reloads the current page
    } else {
      throw new Error('Logout failed')
    }
  } catch (error) {
    console.error('Logout error:', error)
    showStatus(
      error instanceof Error ? error.message : 'An error occurred during sign out',
      'error'
    )
  } finally {
    isLoading.value = false
  }
}
</script>