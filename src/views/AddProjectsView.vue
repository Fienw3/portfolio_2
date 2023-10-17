<template>
  <div class="add-project">

    <div>
      <h2>Tilføj Projekt</h2>
      <input type="text" placeholder="Project name" v-model="AddProjectData.projectTitle" >
      <input type="text" placeholder="Project category" v-model="AddProjectData.projectCategory" >
      <input type="date" placeholder="Project date" v-model="AddProjectData.projectDate" >
      <input type="text" placeholder="Project description" v-model="AddProjectData.projectDescription" >
      <input type="text" placeholder="Project team" v-model="AddProjectData.projectTeam" >
      <input type="text" placeholder="Project tech" v-model="AddProjectData.projectTech" >
      <input type="text" placeholder="Project status" v-model="AddProjectData.projectStatus" >
      <input type="text" placeholder="Project link" v-model="AddProjectData.projectLink" >
      <button class="btn-add" @click="firebaseAddSingleItem()">Add Item</button>


    </div>
  </div>
</template>

<script setup>
import useProjects from '../modules/useProducts.js';
import { onMounted, ref } from 'vue'

import { auth } from '../firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

let isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      console.log('User logged in', auth.currentUser)

    } else {
      isLoggedIn.value = false
      console.log('User logged out', auth.currentUser)

    }
  })
})


const { 
  projects, 
  getProjectsData, 
  firebaseDeleteSingleItem, 
  firebaseAddSingleItem ,
  AddProjectData,
  firebaseUpdateSingleItem,
  UpdateProductData,

} = useProjects();

onMounted(() => {
  getProjectsData();
})


</script>

<style>
@media (min-width: 1024px) {
  .add-project {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
