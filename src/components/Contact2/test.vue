<template>
  <div class="test-container">
    <Contact2/>
  </div>
</template>

<script>
import Contact2 from './index.vue';
export default {
    components: { Contact2 }
}
</script>

<style scoped>
.test-container{
    width: 600px;
    height: 600px;
    border: 2px solid;
    background: rgb(32,32,32);
}
</style>