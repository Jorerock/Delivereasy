<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UserComponent from './UserComponent.vue';
import { Utilisateur } from '../models/Utilisateur';
import * as cookie from './Cookie';

const monTableau = ref<any[]>([]);

onMounted(async () => {
  const usersRequest = await fetch('http://localhost:3000/admin/users/all');
  const users = await usersRequest.json();
  monTableau.value = [...users]
});



// Modif user
const onUserInput = async (newUserValue: Utilisateur, index: number) => {
  monTableau.value[index] = newUserValue;
  await fetch(`http://localhost:3000/admin/users`, {
    method: 'PUT',
    headers: {
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

// delete user
const deleteUser = async (newUserValue: Utilisateur, index: number) => {
  monTableau.value[index] = newUserValue;
  await fetch(`http://localhost:3000/admin/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
            Utilisateur_ID: newUserValue.Utilisateur_ID,
          }),
  });
  console.log( newUserValue.Utilisateur_Email +'a ete mis à jour et la modification est envoyée au serveur');
};

// const deleteUser = async (List_ID: number, index: number) => {
//   await fetch(`http://localhost:3000/admin/users`, {
//     method: 'DELETE',
//   });
//   monTableau.value.splice(index, 1);
//   console.log('User supprimé');
// };

// ceate  user
const PostUser = async (newUserValue: Utilisateur) => {
  // POST request using fetch with async/await
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
            Utilisateur_Email: newUserValue.Utilisateur_Email,
            Utilisateur_Password: newUserValue.Utilisateur_Password,
            Utilisateur_ID: newUserValue.Utilisateur_ID,
            Utilisateur_Nom: newUserValue.Utilisateur_Nom,
            Utilisateur_Prenom: newUserValue.Utilisateur_Prenom,
            Utilisateur_Admin: newUserValue.Utilisateur_Admin,
          }),
  };
  const response = await fetch(`http://localhost:3000/users`, requestOptions);
  // const data = await response.json();
  if (!response.ok) {
    console.error(response.status);
    console.log('Erreur creation pour cause de '+ response.status);
  } else {
    monTableau.value.push( await response.json());
    console.log('User Ajoute');
  }
};
</script>

<template>
  <p>Hello World !</p>
  <span v-if="monTableau.length % 2 === 0">Mon tableau est
  pair</span>
  <span v-else>Mon tableau est impair</span>
  <br/>
  <!-- <UserComponent v-for="(element,index) in monTableau" :User="element" v-bind:key="index"/> -->
  <div class="users" v-for="(element, index) in monTableau" :key="element.List_ID">
  <UserComponent :User="element" @onInput="onUserInput($event, index)" />
  <button class="button button1" @click="deleteUser(element.id, index)">Supprimer</button>
  </div>
  <button @click="PostUser()">Ajouter un User</button>
</template>
  
<style scoped></style>