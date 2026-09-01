<script setup lang="ts">
    import { selectHome } from '../utils/request';
    import { onMounted } from 'vue';
    onMounted(async()=>{
        let token:string=sessionStorage.getItem('token')
        await selectHome(token)
    })
</script>
<template>
    <div>
        aaas
    </div>
</template>
<style scoped >

</style>