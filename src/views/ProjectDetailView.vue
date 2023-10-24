<template>


      <div v-if="projectDetailView" class="projectDetailView">
            <div class="projects-box1">
        <h2>
        {{ projectDetailView.projectTitle }}
        </h2>
    </div>
    <div class="projects-box2">
      <p>
        Category: {{ projectDetailView.projectCategory }}
      
        Date: {{ projectDetailView.projectDate }}
      
        Description: {{ projectDetailView.projectDescription }}
     
        Team: {{ projectDetailView.projectTeam }}
      
        Tech: {{ projectDetailView.projectTech }}
      
        Status: {{ projectDetailView.projectStatus }}
      
        Link: {{ projectDetailView.projectLink }}
        </p>
    </div>
     
    <div class="projects-box3">
        <p>
        Process: {{ projectDetailView.projectProcess }}
      </p>
    </div>
      </div> 
         

</template>



<script setup>
import useProjects from '../modules/useProducts.js';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

// const goBack = ( ) => {
//     router.go(-1)
// }

const { projects, getProjectsData } = useProjects()

const props = defineProps({
    id: String
})
 // Get Id from route query
 const id = computed(() => router.currentRoute.value.params.id)

const projectDetailView = computed(() => {
    return projects.value.find(project => project.id === id.value);
});

onMounted(() => {
  getProjectsData();
  console.log(projects, "projects");
  projectDetailView.value = projects.value.find(project => project.id === id.value);
});


</script>

<style scoped>

</style>