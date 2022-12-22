<template>
    <div class="test-tainer">
        <SiteAside/>
    </div>
  
</template>

<script>
import SiteAside from './index.vue';
export default {
    components: { SiteAside }
}
</script>

<style>
.test-tainer{
    width: 250px;
  height: 600px;
  border: 2px solid;
  margin: 0 auto;
}
</style>