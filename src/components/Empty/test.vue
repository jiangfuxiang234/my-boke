<template>
    <div class="test-container">
   <Empty/>
    </div>
</template>

<script>
import Empty from './index.vue';
export default {
    components: { Empty }
}
</script>

<style scoped lang="less">
.test-container{
    width: 500px;
    height: 500px;
    border: 2px solid red;
    position: relative;
    margin: 0 auto;
}

</style>