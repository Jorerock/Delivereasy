<script setup lang="ts">
import * as cookie from './Cookie';
import LoginComponent from '../components/LoginComponent.vue';
import { useRouter } from 'vue-router'

const router = useRouter()
  
 const onConnectInput = async (event :{email: string  ,password : string  }) => {
  //   // eslint-disable-next-line no-debugger
  // debugger;
  console.log('la tentative de connexion est envoyée au serveur');

  const response = await fetch('http://localhost:3000/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Utilisateur_Email: event.email,
            Utilisateur_Password: event.password,
            Credential:'include'
            // include cookies
          }),
        });
        const data = await response.json();

        if (response.ok) {
            console.log('donne recup =', data);
            console.log('token',data.token)
            cookie.setCookie('token',data.token,1)
            router.push({ path: "/Welcome" })
            
        } else {
          console.error(response.status);
          console.log('Erreur creation pour cause de '+ response.status);
        }
};

</script>

<template>
  <h1>Hello World !</h1>
  <LoginComponent @authentification="onConnectInput($event)"/>
</template>
  
<style scoped></style>