<script setup lang="ts">
import { ref } from 'vue';
import { Utilisateur } from '../models/Utilisateur';


const props = defineProps<{ user: Utilisateur }>();
const editMode = ref(false);
const newValue = ref(props.user.Utilisateur_Email);
const emit = defineEmits(['onInput'])
const onInput = (value: boolean) => {
    console.log('TodoComponent a détecté un changement ', value);
    emit('onInput', { ...props.user, Todo_end: value })
}
const onConfirmText = () => {
    editMode.value = false;
    emit('onInput', { ...props.user, Todo_name: newValue.value });
}
const onCancelText = () => {
    editMode.value = false;
    newValue.value = props.user.Utilisateur_Email;
}
</script>

<template>

  <tbody>
    <tr>
      <td>   
        <span v-if="!editMode">
            <span @click="editMode = !editMode">
                {{ props.user.Utilisateur_Email }} 
            </span>
        </span>
        <span v-else>
            <!-- mode edition -->
            <input type="text" v-model="newValue" />
            <button @click="onConfirmText">Confirmer</button>
            <button @click="onCancelText">Annuler</button>
        </span>
    </td>
        <td>
            <input type="checkbox" :checked="props.user.Utilisateur_Admin" @click="(event: any) => onInput(event.target?.checked)" />
        </td>
    </tr>
  </tbody>

      <!-- <element :class="{ checked: props.user.Utilisateur_Admin }">
    <span v-if="!editMode">
        <span @click="editMode = !editMode">
            {{ props.user.Utilisateur_Email }} |
            {{ props.user.Utilisateur_Admin}}

        </span>
        <input type="checkbox" :checked="props.user.Utilisateur_Admin" @click="(event: any) => onInput(event.target?.checked)" />
        <br />
    </span>
    <span v-else> -->
        <!-- mode edition -->
        <!-- <input type="text" v-model="newValue" />
        <button @click="onConfirmText">Confirmer</button>
        <button @click="onCancelText">Annuler</button>
        <br />
    </span>
</element> -->
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
