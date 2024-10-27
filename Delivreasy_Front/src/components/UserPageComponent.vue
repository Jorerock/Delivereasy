<script setup lang="ts">
//  import { ref } from 'vue';
import * as cookie from './Cookie';
//  import { User } from '../models/user';
import UserComponent from '../components/UserComponent.vue';
import { useRouter } from 'vue-router'


const router = useRouter()



 const onConnectInput = async (event :{email: string  ,password : string  }) => {
    // eslint-disable-next-line no-debugger
  debugger;
  console.log('start')
  console.log('la tentative de connexion est envoyée au serveur');

  const response = await fetch('http://localhost:3000/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: event.email,
            password: event.password,
            Credential:'include'
            // include cookies
          }),
        });
        const data = await response.json();

        if (response.ok) {
            console.log('donne recup =', data);
            console.log('employe_id',data.Employe_ID.Employe_ID)
            cookie.setCookie('Employe_id',data.Employe_ID.Employe_ID,1)
            router.push({ path: "/todos" })
            
        } else {
          console.error(response.status);
          console.log('Erreur creation pour cause de '+ response.status);
        }
};



const test = async () => {
    // eslint-disable-next-line no-debugger
    debugger;
  const todosRequest = await fetch('http://localhost:3000/auth');
  console.log(await todosRequest.json())
};


</script>

<template> 
  <UserComponent @authentification="onConnectInput($event)"/>
  <input
          type="text"
          id="text"
          required
          placeholder="test"
        />
        <button class="button button1" @click="test()">test</button>

</template>
  
<style scoped></style>