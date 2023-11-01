import { db } from '../firebase.js'

import { ref } from 'vue'
import { collection, onSnapshot, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref as fbref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import router from '../router'

const useProjects = () => {

  const projects = ref([]); // to store data from firebase
  const projectDataRef = collection(db, 'projects');

  const AddProjectData = ref({
    projectTitle: '',
    projectCategory: [],
    projectDate: '',
    projectDescription: '',
    projectTeam: '',
    projectTech: '',
    projectStatus: '',
    projectLink: '',
    projectProcess: '',
    projectImg: '',
  })

  const UpdateProjectData = ref({
    projectTitle: '',
    projectCategory: [],
    projectDate: '',
    projectDescription: '',
    projectTeam: '',
    projectTech: '',
    projectStatus: '',
    projectLink: '',
    projectProcess: '',
    projectImg: '',
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
      router.push('/projects')
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
        projectImg: AddProjectData.value.projectImg
      });

      // Clear the form data if needed
      AddProjectData.value.projectTitle = '';
      AddProjectData.value.projectCategory = [];
      AddProjectData.value.projectDate = '';
      AddProjectData.value.projectDescription = '';
      AddProjectData.value.projectTeam = '';
      AddProjectData.value.projectTech = '';
      AddProjectData.value.projectStatus = '';
      AddProjectData.value.projectLink = '';
      AddProjectData.value.projectProcess = '';
      AddProjectData.value.projectImg = '';
    
      console.log("is added");
    };

    const firebaseUpdateSingleItem = async (project) => {
      const projectRef = doc(projectDataRef, project.id); // Assuming project.id is the document ID
    
      await updateDoc(projectRef, {
        projectTitle: project.projectTitle,
        projectCategory: project.projectCategory,
        projectDate: project.projectDate,
        projectDescription: project.projectDescription,
        projectTeam: project.projectTeam,
        projectTech: project.projectTech,
        projectStatus: project.projectStatus,
        projectLink: project.projectLink,
        projectProcess: project.projectProcess,
        projectImg: project.projectImg // Use the new image URL from the update form
      }).then(() => {
        // Clear the form data if needed
        UpdateProjectData.value.projectTitle = '';
        UpdateProjectData.value.projectCategory = [];
        UpdateProjectData.value.projectDate = '';
        UpdateProjectData.value.projectDescription = '';
        UpdateProjectData.value.projectTeam = '';
        UpdateProjectData.value.projectTech = '';
        UpdateProjectData.value.projectStatus = '';
        UpdateProjectData.value.projectLink = '';
        UpdateProjectData.value.projectProcess = '';
        UpdateProjectData.value.projectImg = ''; // Optionally, clear the image URL field if needed
      });
    };
    

  // IMG UPLOAD

  const storage = getStorage();
 
  // Firebase storage upload image + get download URL + enable button after image uploaded
  const uploadImg = async(event) => {
    let file = event.target.files[0]; // get the file
    console.log("file", file)
  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
  };
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = fbref(storage, 'images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');       
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
  
        AddProjectData.value.projectImg = downloadURL;
        console.log("AddProjectData.value.projectImg ", AddProjectData.value.projectImg)
       // addItemData.uploadBtnDisabled = false // enable button after image uploaded is complete
      });
    }  
  );
  }
  

  
  return {
    getProjectsData,
    projects,
    firebaseDeleteSingleItem,
    firebaseAddSingleItem,
    AddProjectData,
    firebaseUpdateSingleItem,
    UpdateProjectData,
    uploadImg
  }
 }

  export default useProjects;