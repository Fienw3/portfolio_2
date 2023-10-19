import { db } from '../firebase.js'

import { ref } from 'vue'
import { collection, onSnapshot, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';

const useProjects = () => {

  const projects = ref([]); // to store data from firebase
  const projectDataRef = collection(db, 'projects');

  const AddProjectData = ref({
    projectTitle: '',
    projectCategory: '',
    projectDate: '',
    projectDescription: '',
    projectTeam: '',
    projectTech: '',
    projectStatus: '',
    projectLink: '',
    projectProcess: '',
  })

  const UpdateProjectData = ref({
    projectTitle: '',
    projectCategory: '',
    projectDate: '',
    projectDescription: '',
    projectTeam: '',
    projectTech: '',
    projectStatus: '',
    projectLink: '',
    projectProcess: '',
  })

  const getProjectsData = () => {
    onSnapshot(projectDataRef, (snapshot) => {
      projects.value = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
          //productName: doc.data().productName,
          //productPrice: doc.data().productPrice
        }
      })
    })
    console.log("test", projects)
  }

  const firebaseDeleteSingleItem = async(id) => {
    await deleteDoc(doc(db, "projects", id));
    console.log("is deleted", id)
  }

  const firebaseAddSingleItem = async() => {
    await addDoc(collection(db, "projects"),
      {
        projectTitle: AddProjectData.value.projectTitle,
        projectCategory: AddProjectData.value.projectCategory,
        projectDate: AddProjectData.value.projectDate,
        projectDescription: AddProjectData.value.projectDescription,
        projectTeam: AddProjectData.value.projectTeam,
        projectTech: AddProjectData.value.projectTech,
        projectStatus: AddProjectData.value.projectStatus,
        projectLink: AddProjectData.value.projectLink,
        projectProcess: AddProjectData.value.projectProcess,
      }
    );
      
    console.log("is added") 

  }

  const firebaseUpdateSingleItem = async(project) => { 
    await updateDoc(doc(projectDataRef, project), {
        projectTitle: project.value.find(project => project.id === project.id).projectTitle, 
        projectCategory: project.value.find(project => project.id === project.id).projectCategory,
        projectDate: project.value.find(project => project.id === project.id).projectDate,
        projectDescription: project.value.find(project => project.id === project.id).projectDescription,
        projectTeam: project.value.find(project => project.id === project.id).projectTeam,
        projectTech: project.value.find(project => project.id === project.id).projectTech,
        projectStatus: project.value.find(project => project.id === project.id).projectStatus,
        projectLink: project.value.find(project => project.id === project.id).projectLink,
        projectProcess: project.value.find(project => project.id === project.id).projectProcess,
    }).then(() => {
      UpdatePojectData.value.projectTitle = ''
      UpdatePojectData.value.projectCategory = ''
      UpdatePojectData.value.projectDate = ''
      UpdatePojectData.value.projectDescription = ''
      UpdatePojectData.value.projectTeam = ''
      UpdatePojectData.value.projectTech = ''
      UpdatePojectData.value.projectStatus = ''
      UpdatePojectData.value.projectLink = ''
      UpdatePojectData.value.projectProcess = ''
    })
  }


  
  return {
    getProjectsData,
    projects,
    firebaseDeleteSingleItem,
    firebaseAddSingleItem,
    AddProjectData,
    firebaseUpdateSingleItem,
    UpdateProjectData
  }
 }

  export default useProjects;