<template>

  <div v-if="projectDetailView" class="projectDetailView 2xl:px-32 2xl:py-12 xl:px-32 xl:py-12 lg:px-28 lg:py-8 md:px-24 md:py-6 sm:px-8 sm:py-5">

      <button @click="goBack()">Back</button> <!--Back to previous page button-->
      

      <div class="projects-box1 flex grid grid-cols-2 sm:grid-cols-1">
          <div class="projects-box2">
            <h1>
              {{ projectDetailView.projectTitle }}
            </h1>
              <ul>
                <li><span>Category:</span> {{ projectDetailView.projectCategory.join(', ') }}</li>
              
                <li><span>Date:</span> {{ projectDetailView.projectDate }}</li>
              
                <li><span>Description:</span> {{ projectDetailView.projectDescription }}</li>
            
                <li><span>Team:</span> {{ projectDetailView.projectTeam }}</li>
              
                <li><span>Tech:</span> {{ projectDetailView.projectTech }}</li>
              
                <li><span>Status:</span> {{ projectDetailView.projectStatus }}</li>
              
                <li><span>Link: </span>{{ projectDetailView.projectLink}}</li>
            </ul>
          </div>

          <!--Image-->
        <div class="projects-box-img flex justify-end">
          <img :src="projectDetailView.projectImg" alt="Project Image"/>
        </div>
      </div>
     
      <div class="projects-box3 py-10">
        <p>
          <span>Process:</span> {{ projectDetailView.projectProcess }}
        </p>
        <div class="flex gap-8 sm:gap-4">
        <button class="btn-edit" @click="openEditModal(projectDetailView)" v-if="isLoggedIn">Edit item</button>
        <button class="btn-delete" @click="firebaseDeleteSingleItem(projectDetailView.id)" v-if="isLoggedIn">Delete item</button>
      </div>
      </div>

    <!-- Edit Modal (delete + edit buttons) -->
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
        <div> New Image:
        <input id="projectImg" type="file" @change="uploadImg" accept="image/*">
        </div>

        <div class="flex gap-8 sm:gap-4">
        <button class="btn-update" @click="firebaseUpdateSingleItem(projectDetailView)" v-if="isLoggedIn">Update Item</button>

        <button class="btn-close" @click="closeEditModal">Close</button>
      </div>
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

// Go back to previous page.
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

const {
  firebaseDeleteSingleItem,
  firebaseUpdateSingleItem,
} = useProjects();

// Open and close edit modal of the selected project.
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

.projects-box-img {
  display: flex;
  max-width: 400px;
  width: 100%;
  align-self: flex-end;
}

</style>