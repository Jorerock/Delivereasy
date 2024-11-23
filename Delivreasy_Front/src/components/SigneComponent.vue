<template>

  <div class="container mx-auto p-6">
    <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-6 text-center">Digital Signature</h2>

      <!-- Signature Pad -->
      <div 
        class="border-2 border-gray-300 rounded-lg mb-4"
        :class="{ 'border-red-500': !isSignatureValid }"
      >
        <canvas 
          ref="signatureCanvas" 
          @mousedown="startDrawing" 
          @mousemove="draw" 
          @mouseup="stopDrawing"
          @mouseout="stopDrawing"
          class="w-full h-48 cursor-crosshair"
        ></canvas>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-4 mb-4">
        <button 
          @click="clearSignature"
          class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Clear
        </button>
        <button 
          @click="saveSignature"
          :disabled="!isSignatureValid"
          class="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          Save Signature
        </button>
      </div>

      <!-- Status Message -->
      <div 
        v-if="statusMessage"
        :class="[
          'p-4 rounded-md text-center mt-4',
          statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        ]"
      >
        {{ statusMessage.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'


const props = defineProps<{
  Livraison_ID: number
  }>()


interface StatusMessage {
  type: 'success' | 'error'
  message: string
}

const signatureCanvas = ref<HTMLCanvasElement | null>(null)
const isDrawing = ref(false)
const lastX = ref(0)
const lastY = ref(0)
const statusMessage = ref<StatusMessage | null>(null)
const isSignatureValid = ref(false)

onMounted(() => {
  const canvas = signatureCanvas.value
  if (canvas) {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    const context = canvas.getContext('2d')
    if (context) {
      context.strokeStyle = 'black'
      context.lineWidth = 2
      context.lineCap = 'round'
    }
  }
})

const startDrawing = (e: MouseEvent) => {
  if (!signatureCanvas.value) return
  const canvas = signatureCanvas.value
  const rect = canvas.getBoundingClientRect()
  isDrawing.value = true
  lastX.value = e.clientX - rect.left
  lastY.value = e.clientY - rect.top
}

const draw = (e: MouseEvent) => {
  if (!isDrawing.value || !signatureCanvas.value) return
  
  const canvas = signatureCanvas.value
  const ctx = canvas.getContext('2d')
  const rect = canvas.getBoundingClientRect()
  
  if (ctx) {
    ctx.beginPath()
    ctx.moveTo(lastX.value, lastY.value)
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()

    lastX.value = e.clientX - rect.left
    lastY.value = e.clientY - rect.top
    
    isSignatureValid.value = true
  }
}

const stopDrawing = () => {
  isDrawing.value = false
}

const clearSignature = () => {
  const canvas = signatureCanvas.value
  const ctx = canvas?.getContext('2d')
  
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    isSignatureValid.value = false
    statusMessage.value = null
  }
}

const saveSignature = async () => {
  const canvas = signatureCanvas.value
  if (!canvas || !isSignatureValid.value) return

  try {
    // Convert canvas to base64 image
    const signatureImage = canvas.toDataURL('image/png')
    const response = await fetch('http://localhost:3000/livraisons/signatures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signature: signatureImage,
        Livraison_ID: props.Livraison_ID
      })
    })

    if (response.ok) {
      statusMessage.value = {
        type: 'success',
        message: 'Signature saved successfully!'
      }
      // clearSignature()
    } else {
      throw new Error('Failed to save signature')
    }
  } catch (error) {
    statusMessage.value = {
      type: 'error',
      message: 'Error saving signature. Please try again.'
    }
    console.error('Signature save error:', error)
  }
}




</script>