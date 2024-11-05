<script setup lang="ts">
import * as cookie from './Cookie';
import LoginComponent from '../components/LoginComponent.vue';
import { useRouter } from 'vue-router'

function delete_cookie(name : any) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

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
            // cookie.setCookie('isAdmin',data.,1)

            router.push({ path: "/Welcome" })
            
        } else {
          console.error(response.status);
          console.log('Erreur creation pour cause de '+ response.status);
        }
};



const onDisconnectInput = async () => {
  //   // eslint-disable-next-line no-debugger
  // debugger;
  console.log('la tentative de connexion est envoyée au serveur');

  const response = await fetch('http://localhost:3000/auth/logout', {
    
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          }),
        });
        cookie.setCookie('token','null',-1)
        delete_cookie('token')
        const data = await response.json();
        router.push({ path: "/login" })

        if (response.ok) {
            router.push({ path: "/login" })
 
        } else {
          console.error(response.status);
          console.log('Erreur creation pour cause de '+ response.status);
        }
};


</script>

<template>
    <h1>Connexion</h1>

  <div  v-if="!cookie.getCookie('token')">
  <LoginComponent @authentification="onConnectInput($event)"/>
  </div>
  <div v-if="cookie.getCookie('token')">
    <button class="button button1" @click="onDisconnectInput()">Deconnexion</button>
  </div>
</template>
  
<style scoped></style>