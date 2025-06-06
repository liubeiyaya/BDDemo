<template>
  <div id="app">
    <answer/>
    <NoteBook></NoteBook>
  </div>
</template>

<script>
import answer from './components/answer.vue'
import NoteBook from './components/NoteBook.vue'

export default {
  name: 'App',
  components: {
    answer,
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
