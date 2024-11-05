<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UserComponent from './GestionsUserComponent.vue';
import { Utilisateur } from '../models/Utilisateur';
import * as cookie from './Cookie';

const user :Utilisateur =  {Utilisateur_Email:'' ,Utilisateur_Password: '', Utilisateur_ID:1 ,Utilisateur_Nom:'',Utilisateur_Prenom:'',Utilisateur_Admin:false};

const monTableau = ref<any[]>([]);

onMounted(async () => {
  const usersRequest = await fetch('http://localhost:3000/admin/users/all', {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      'Content-Type': 'application/json',
    }
  });
  const users = await usersRequest.json();
  monTableau.value = [...users]
});

// Modif user
const onUserInput = async (newUserValue: Utilisateur, index: number) => {
  monTableau.value[index] = newUserValue;
  await fetch(`http://localhost:3000/admin/users`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
            Utilisateur_Email: newUserValue.Utilisateur_Email,
            Utilisateur_Password: newUserValue.Utilisateur_Password,
            Utilisateur_ID: newUserValue.Utilisateur_ID,
            Utilisateur_Nom: newUserValue.Utilisateur_Nom,
            Utilisateur_Prenom: newUserValue.Utilisateur_Prenom,
            Utilisateur_Admin: newUserValue.Utilisateur_Admin,
          }),
  });
  console.log( newUserValue.Utilisateur_Email +'a ete mis à jour et la modification est envoyée au serveur');
};



const deleteUser = async (ID: number, index: number) => {
  await fetch(`http://localhost:3000/admin/users`, {
    method: 'DELETE',
    credentials: 'include',
    
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
            Utilisateur_ID: ID,
          }),
  });
  monTableau.value.splice(index, 1);
  console.log('User supprimé');
};


// create user
const createUser = async () => {
  await fetch(`http://localhost:3000/admin/users`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Utilisateur_Email: user.Utilisateur_Email,
            Utilisateur_Password: user.Utilisateur_Password,
            Utilisateur_ID: user.Utilisateur_ID,
            Utilisateur_Nom: user.Utilisateur_Nom,
            Utilisateur_Prenom: user.Utilisateur_Prenom,
            Utilisateur_Admin: user.Utilisateur_Admin,
          }),
  });
  console.log( user.Utilisateur_Email +'a ete cree');
  
};




// // ceate  user
// const createUser = async () => {
//   // POST request using fetch with async/await
//    // eslint-disable-next-line no-debugger
//    debugger;
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json", },
//     body: JSON.stringify({
//             Utilisateur_Email: user.Utilisateur_Email,
//             Utilisateur_Password: user.Utilisateur_Password,
//             Utilisateur_ID: user.Utilisateur_ID,
//             Utilisateur_Nom: user.Utilisateur_Nom,
//             Utilisateur_Prenom: user.Utilisateur_Prenom,
//             Utilisateur_Admin: user.Utilisateur_Admin,
//           }),
//   };
//   const response = await fetch(`http://localhost:3000/admin/users`, requestOptions);
//   // const data = await response.json();
//   if (!response.ok) {
//     console.error(response.status);
//     console.log('Erreur creation pour cause de '+ response.status);
//   } else {
//     monTableau.value.push( await response.json());
//     console.log('User Ajoute');
//   }
// };
</script>

<template>
  <h1>Utilisateur :</h1>
  <table>
    <tbody>
      <tr>
        <th scope="col">Utilisateur_Email</th>
        <th scope="col">Utilisateur_Nom</th>
        <th scope="col">Utilisateur_Prenom</th>
        <th scope="col">Utilisateur_Admin</th>

      </tr>
   
    <div class="users" v-for="(element, index) in monTableau" :key="element.List_ID">
    <UserComponent :user="element" @onInput="onUserInput($event, index)" />

    <!-- <UserComponent :User="element" @onInput="onUserInput($event, index)" /> -->
    <button class="button button1" @click="deleteUser(element.Utilisateur_ID , index)">Supprimer</button>
    
    </div>
     </tbody>
  </table>

  <div class="container">
    <form @submit.prevent="createUser">
      <input v-model="user.Utilisateur_Email" type="email" placeholder="Utilisateur_Email"  required />
      <input v-model="user.Utilisateur_Password" type="password" placeholder="Utilisateur_Password" required />
      <input v-model="user.Utilisateur_Nom" type="text" placeholder="Utilisateur_Nom" required />
      <input v-model="user.Utilisateur_Prenom" type="text" placeholder="Utilisateur_Prenom" required />
      <input v-model="user.Utilisateur_Admin" type="checkbox" placeholder="Utilisateur_Admin" />
      <button type="submit">Nouvel Utilisateur</button>
    </form>
  </div>
</template>
  
<style scoped>
table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

caption {
  caption-side: bottom;
  padding: 10px;
  font-weight: bold;
}

thead,
tfoot {
  background-color: rgb(228 240 245);
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

td:last-of-type {
  text-align: center;
}

tbody > tr:nth-of-type(even) {
  background-color: rgb(237 238 242);
}

tfoot th {
  text-align: right;
}

tfoot td {
  font-weight: bold;
}



</style>