<script setup lang="ts">
import { ref } from 'vue';

// import { ref } from 'vue';
// import { User } from '../models/user';

const emit = defineEmits(['authentification'])


const form = ref({
  email: '',
  password: ''
});

const authentification = () => {
    emit('authentification', { email : form.value.email , password : form.value.password })
}
</script>
<template>
  <div class="login">
    <h1>Connexion</h1>
    <!-- <form @submit.prevent="authentification($event)"> -->
      <form @submit.prevent="authentification()">
      <div class="form-group">
        <label for="email">Adresse e-mail</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          placeholder="Entrez votre adresse e-mail"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          required
          placeholder="Entrez votre mot de passe"
        />
      </div>

      <button type="submit" class="btn">Se connecter</button>

      <!-- <p v-if="errorMessage" class="error">{{ errorMessage }}</p> -->
    </form>
  </div>
</template>