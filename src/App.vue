<template>
  <div id="app">
    <NoteBook></NoteBook>
  </div>
</template>

<script>
import NoteBook from './components/NoteBook.vue'

export default {
  name: 'App',
  components: {
    NoteBook
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
