<template>

    <div class="container p-top not-found">
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
        font-size: 174px;
        color: rgb(220, 60, 60);
    }

    h2 {
        font-size: 4rem;
        font-weight: 100;
    }

</style>