<template>
  <div class="about">

    
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
    <hr>

    <div class="admin_project_card" v-for="project in projects" :key="project">
      <h2>
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
import { onMounted } from 'vue'


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
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
