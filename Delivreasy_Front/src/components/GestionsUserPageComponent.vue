<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UserComponent from './GestionsUserComponent.vue';
import { Utilisateur } from '../models/Utilisateur';
import * as cookie from './Cookie';
import ReusableTables from './ReusableTableComponent.vue'


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

console.log(monTableau)
</script>

<template>
  <h1>Utilisateur :</h1>
  <!-- <table>
    <tbody>
      <tr>
        <th scope="col">Utilisateur_Email</th>
        <th scope="col">Utilisateur_Nom</th>
        <th scope="col">Utilisateur_Prenom</th>
        <th scope="col">Utilisateur_Admin</th>
      </tr>
    <div class="users" v-for="(element, index) in monTableau" :key="element.List_ID">
    <UserComponent :user="element" @onInput="onUserInput($event, index)" />
    <button class="button button1" @click="deleteUser(element.Utilisateur_ID , index)">Supprimer</button>
    </div>
     </tbody>
  </table> -->

  <ReusableTables
    :headers="headers"
    :items="tableData"
    rowKey="id"
    :apiUrl="apiUrl"
    @itemCreated="handleItemCreated"
    @itemUpdated="handleItemUpdated"
  />
<!-- 
  <div class="container">
    <form @submit.prevent="createUser">
      <input v-model="user.Utilisateur_Email" type="email" placeholder="Utilisateur_Email"  required />
      <input v-model="user.Utilisateur_Password" type="password" placeholder="Utilisateur_Password" required />
      <input v-model="user.Utilisateur_Nom" type="text" placeholder="Utilisateur_Nom" required />
      <input v-model="user.Utilisateur_Prenom" type="text" placeholder="Utilisateur_Prenom" required />
      <input v-model="user.Utilisateur_Admin" type="checkbox" placeholder="Utilisateur_Admin" />
      <button type="submit">Nouvel Utilisateur</button>
    </form>
  </div> -->
</template>
  
<style scoped></style>


