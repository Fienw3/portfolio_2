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
        <button class="btn-edit" @click="openEditModal(project)" v-if="isLoggedIn">Edit item</button>
    </div>

    <div class="modal" v-if="isEditModalOpen && isLoggedIn">
      <div class="modal-content">
      
        <p> New Project Title:
          <input type="text" placeholder="New project title" v-model="project.projectTitle" />
        </p>
        <p> New Project Category:
          <input type="text" placeholder="New project category" v-model="project.projectCategory" />
       </p>
        <p> New Project Date:
          <input type="date" placeholder="New project date" v-model="project.projectDate" />
        </p>
        <p> New Project Description:
          <input type="text" placeholder="New project description" v-model="project.projectDescription" />
        </p>
        <p> New Project Team:
          <input type="text" placeholder="New project team" v-model="project.projectTeam" />
        </p>
        <p> New Project Tech:
          <input type="text" placeholder="New project tech" v-model="project.projectTech" />
        </p>
        <p> New Project Status:
          <input type="text" placeholder="New project status" v-model="project.projectStatus" />
        </p>
        <p> New Project Link:
          <input type="text" placeholder="New project link" v-model="project.projectLink" />
        </p>
        <p> New Project Process:
          <input type="text" placeholder="New project process" v-model="project.projectProcess" />
        </p>
      
        <button class="btn-update" @click="firebaseUpdateSingleItem(project.id)" v-if="isLoggedIn">Update Item</button>
        <button class="btn-delete" @click="firebaseDeleteSingleItem(project.id)" v-if="isLoggedIn">Delete item</button>
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
const router = useRouter()

const goBack = ( ) => {
    router.go(-1)
}

const { projects, getProjectsData } = useProjects()
const isEditModalOpen = ref(false);
const project = ref({});

const props = defineProps({
    id: String
})
 // Get Id from route query
 const id = computed(() => router.currentRoute.value.params.id)

const projectDetailView = computed(() => {
    return projects.value.find(project => project.id === id.value);
});

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