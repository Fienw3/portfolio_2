<template>

      <div v-if="projectDetailView" class="projectDetailView">

            <button @click="goBack()">Back</button>
        <div class="projects-box1">
          <h2>
            {{ projectDetailView.projectTitle }}
          </h2>
      </div>
        <div class="projects-box2">
          <ul>
            <li><span>Category:</span> {{ projectDetailView.projectCategory }}</li>
          
            <li><span>Date:</span> {{ projectDetailView.projectDate }}</li>
          
            <li><span>Description:</span> {{ projectDetailView.projectDescription }}</li>
        
            <li><span>Team:</span> {{ projectDetailView.projectTeam }}</li>
          
            <li><span>Tech:</span> {{ projectDetailView.projectTech }}</li>
          
            <li><span>Status:</span> {{ projectDetailView.projectStatus }}</li>
          
            <li><span>Link: </span><a href="projectDetailView.projectLink">Link to project folder</a></li>
        </ul>
      </div>
     
      <div class="projects-box3">
        <p>
          <span>Process:</span> {{ projectDetailView.projectProcess }}
        </p>
        <button class="btn-edit" @click="openEditModal(projectDetailView)" v-if="isLoggedIn">Edit item</button>
        <button class="btn-delete" @click="firebaseDeleteSingleItem(projectDetailView.id)" v-if="isLoggedIn">Delete item</button>
      </div>

    <!-- Edit Modal (delete + edit) -->
    <div class="modal" v-if="isEditModalOpen && isLoggedIn">
      <div class="modal-content">
      
        <p> New Project Title:
          <input type="text" placeholder="New project title" v-model="projectDetailView.projectTitle" />
        </p>
        <p> New Project Category:
          <input type="text" placeholder="New project category" v-model="projectDetailView.projectCategory" />
       </p>
        <p> New Project Date:
          <input type="date" placeholder="New project date" v-model="projectDetailView.projectDate" />
        </p>
        <p> New Project Description:
          <input type="text" placeholder="New project description" v-model="projectDetailView.projectDescription" />
        </p>
        <p> New Project Team:
          <input type="text" placeholder="New project team" v-model="projectDetailView.projectTeam" />
        </p>
        <p> New Project Tech:
          <input type="text" placeholder="New project tech" v-model="projectDetailView.projectTech" />
        </p>
        <p> New Project Status:
          <input type="text" placeholder="New project status" v-model="projectDetailView.projectStatus" />
        </p>
        <p> New Project Link:
          <input type="text" placeholder="New project link" v-model="projectDetailView.projectLink" />
        </p>
        <p> New Project Process:
          <input type="text" placeholder="New project process" v-model="projectDetailView.projectProcess" />
        </p>

        <button class="btn-update" @click="firebaseUpdateSingleItem(projectDetailView)" v-if="isLoggedIn">Update Item</button>
        

        <button class="btn-close" @click="closeEditModal">Close</button>
      <hr>
    </div>
  </div>

  </div> 
         

</template>



<script setup>
import useProjects from '../modules/useProducts.js';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
const router = useRouter()


// Check if user is logged in or not.
const isLoggedIn = ref(false);

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

const goBack = ( ) => {
    router.go(-1)
}

const { projects, getProjectsData } = useProjects()
const isEditModalOpen = ref(false);
const project = ref({});


//Import projectDetailView from ProjectsView via router and computed, using id as a parameter.
const props = defineProps({
    id: String
})

 const id = computed(() => router.currentRoute.value.params.id)

const projectDetailView = computed(() => {
    return projects.value.find(project => project.id === id.value);
});


// Modal functions with open and close, and update and delete functions from useProjects.
const {
  firebaseDeleteSingleItem,
  firebaseUpdateSingleItem,
} = useProjects();

const openEditModal = (selectedProject) => {
  project.value = { ...selectedProject };
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

onMounted(() => {
  firebaseDeleteSingleItem,
  isEditModalOpen,
  firebaseUpdateSingleItem,
  getProjectsData();
  console.log(projects, "projects");
  projectDetailView.value = projects.value.find(project => project.id === id.value);
});


</script>

<style scoped>

span {
  font-weight: bold;
}

</style>