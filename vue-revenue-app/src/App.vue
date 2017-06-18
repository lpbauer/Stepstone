<template>
  <div id="app">
    <companies></companies>
  </div>
</template>

<script>
import Companies from './components/companies'
export default {
  name: 'app',
  components: {
    Companies
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
