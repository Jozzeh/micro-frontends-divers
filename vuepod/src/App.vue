<template>
  <div id="vue-app">
    <img alt="Vue logo" src="/images/vue.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#vue-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
  padding-top: 5px;
  border: solid 1px #41B883;
}
#vue-app img{
  max-width: 75px;
  height: auto;
}
</style>
