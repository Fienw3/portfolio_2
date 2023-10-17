<template>
  <div class="project-view">

    <div class="admin_project_card" v-for="project in projects" :key="project">
      <h2 class="font-extrabold">
        {{ project.projectTitle }}
      </h2>
      <p>
        Category: {{ project.projectCategory }}
      </p>
      <p>
        Date: {{ project.projectDate }}
      </p>
      <p>
        Description: {{ project.projectDescription }}
      </p>
      <p>
        Team: {{ project.projectTeam }}
      </p>
      <p>
        Tech: {{ project.projectTech }}
      </p>
      <p>
        Status: {{ project.projectStatus }}
      </p>
      <p>
        Link: <a href="{{ project.projectLink }}" target="_blank">{{ project.projectLink }}</a>
      </p>

      <button class="btn-delete" @click="firebaseDeleteSingleItem(project.id)" v-if="isLoggedIn">Delete item</button>
    
      <!-- <p>
        <input type="text" placeholder="New project name" v-model="project.projectTitle" />
      </p> -->
      <button class="btn-edit" @click="firebaseUpdateSingleItem(project.id)" v-if="isLoggedIn">Edit item</button>
      <hr>
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
  .project-view {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
