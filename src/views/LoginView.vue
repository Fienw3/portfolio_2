<template>
<div class="2xl:px-32 2xl:py-12 xl:px-32 xl:py-12 lg:px-28 lg:py-8 md:px-24 md:py-6 sm:px-8 sm:py-5">

  <h1>Login</h1> 
  <div class="flex flex-col"> 
        <label for="email">Email: </label>
          <input id="email" type="text" v-model="email" />
        <label for="password">Password: </label>
          <input id="password" type="password" v-model="password" @keyup.enter="logIn"/>
      
      <p v-if="errMsg"> {{ errMsg }}</p>
      <button @click="logIn">Login</button>
  </div>

</div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '../firebase.js'
import { signInWithEmailAndPassword } from 'firebase/auth';

import router from '../router'

let email = ref ('')
let password = ref ('')
const errMsg = ref ('')

let logIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((data) => {
    console.log("test data", data)
    router.push('/home')
  })
  .catch((error) => {
    switch(error.code) {
      case "auth/invalid-email":
        errMsg.value = "Invalid email address format."
        break;
      case "auth/user-disabled":
        errMsg.value = "This user has been disabled."
        break;
      case "auth/user-not-found":
        errMsg.value = "User not found."
        break;
      case "auth/wrong-password":
        errMsg.value = "Invalid password."
        break;
      default:
        errMsg.value = "An undefined error occured."
    }
  })
}


</script>

<style lang="scss" scoped>

</style>