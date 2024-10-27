<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TodoComponent from './TodoComponent.vue';
import { Todo } from '../models/todo';
import * as cookie from './Cookie';

// const monTableau = ref<Todo[]>([]);
const monTableau = ref<any[]>([]);
const Employe_id = cookie.getCookie("Employe_id")

onMounted(async () => {
  const todosRequest = await fetch('http://localhost:3000/todos/'+Employe_id+'');
  const todos = await todosRequest.json();
  monTableau.value = [...todos]
});

// onMounted(async () => {
//   const todosRequest = await fetch('http://localhost:3000/todos/'+Employe_id+'');
// const todos:Todo[] = await todosRequest.json();
//   const todo = await todosRequest.json();
// if (todo.ok) {
//     // console.log('donne recup =', todo);
//     console.log('List_ID',todo.List_ID.List_ID)
//      monTableau.value.List_ID
// }
//   monTableau.value = [...todo];
// });
// // const monTableau = [1, 2, 3];
const onTodoInput = async (newTodoValue: Todo, index: number) => {
  monTableau.value[index] = newTodoValue;
  await fetch(`http://localhost:3000/todos/${newTodoValue.List_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodoValue),
  });
  console.log('monTableau est mis à jour et la modification est envoyée au serveur');
};

const deleteTodo = async (List_ID: number, index: number) => {
  await fetch(`http://localhost:3000/todos/${List_ID}`, {
    method: 'DELETE',
  });
  monTableau.value.splice(index, 1);
  console.log('Todo supprimé');
};

const PostTodo = async () => {
  // POST request using fetch with async/await
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label: 'Nouvelle tâche', done: false })
  };
  const response = await fetch(`http://localhost:3000/todos`, requestOptions);
  // const data = await response.json();
  if (!response.ok) {
    console.error(response.status);
    console.log('Erreur creation pour cause de '+ response.status);
  } else {
    monTableau.value.push( await response.json());
    console.log('Todo Ajoute');
  }
};



// monTableau.value= [
//     { Todo_name: "apprendre Vue Js" },
//     { List_ID: 2, Todo_name: "apprendre à faire des boucles", Todo_end: false },
//     { List_ID: 3, Todo_name: "apprendre à griller des saucisses", Todo_end: true, Todo_Echeance_date: new Date("2024-12-31") },
//   ];
</script>

<template>
  <p>Hello World !</p>
  <span v-if="monTableau.length % 2 === 0">Mon tableau est
  pair</span>
  <span v-else>Mon tableau est impair</span>
  <br/>
  
  <!-- <TodoComponent v-for="(element,index) in monTableau" :todo="element" v-bind:key="index"/> -->

  <div class="todos" v-for="(element, index) in monTableau" :key="element.List_ID">
  <TodoComponent :todo="element" @onInput="onTodoInput($event, index)" />
  <button class="button button1" @click="deleteTodo(element.id, index)">Supprimer</button>
  </div>
  <button @click="PostTodo()">Ajouter un todo</button>
</template>
  
<style scoped></style>