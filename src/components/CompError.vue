<template>
    <!-- ERROR PAGE COMPONENT -->

    <div class="container p-top text-center">
        <exclamation-circle-outlined></exclamation-circle-outlined>
        <h2 class="mt-3">Article not found.</h2>
    </div>

</template>



<script>
    import {ExclamationCircleOutlined} from '@ant-design/icons-vue'

    export default {
        components: {
            ExclamationCircleOutlined
        }
    }

</script>


<style scoped>

    .anticon {
        font-size: 11rem;
        color: rgb(255, 72, 72);
    }

    h2 {
        font-size: 3rem;
        font-weight: 100;
    }

</style>