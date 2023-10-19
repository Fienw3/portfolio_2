<template>


      <div v-if="projectDetailView" class="projectDetailView">
            <div class="projects-box1">
        <h2>
        {{ project.projectTitle }}
        </h2>
    </div>
    <div class="projects-box2">
      <p>
        Category: {{ project.projectCategory }}
      
        Date: {{ project.projectDate }}
      
        Description: {{ project.projectDescription }}
     
        Team: {{ project.projectTeam }}
      
        Tech: {{ project.projectTech }}
      
        Status: {{ project.projectStatus }}
      
        Link: {{ project.projectLink }}
        </p>
    </div>
     
    <div class="projects-box3">
        <p>
        Process: {{ project.projectProcess }}
      </p>
    </div>
      </div> 
         

</template>



<script setup>
import useProjects from '../modules/useProducts.js';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { defineProps, toRefs, computed } from 'vue';



const { state } = useProducts()

const props = defineProps({
    id: String
})

const { id } = toRefs(props)

// const projectDetailView = computed(
//     () => {
//         return state.value.find(item => item.id == id.value)
//     }
// )

const projectDetailView = computed(() => {
  // Use this to retrieve project details based on route parameters
  // Fetch the details using this.$route.params or other data source
  return {
    projectTitle: $route.params.projectTitle,
    projectCategory: $route.params.projectCategory,
    projectDate: $route.params.projectDate,
    projectDescription: $route.params.projectDescription,
    projectTeam: $route.params.projectTeam,
    projectTech: $route.params.projectTech,
    projectStatus: $route.params.projectStatus,
    projectLink: $route.params.projectLink,
    projectProcess: $route.params.projectProcess,
  };
});

const {
  projects,
  getProjectsData,
  firebaseDeleteSingleItem,
  firebaseUpdateSingleItem,
} = useProjects();

onMounted(() => {
  getProjectsData();
});


</script>

<style scoped>

</style>