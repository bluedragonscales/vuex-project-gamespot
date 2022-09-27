<template>
    <!-- DASHBOARD TITLE COMPONENT -->

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <!-- Each different dashboard section will insert its own title because of the prop passed from this component. -->
        <h1 class="h2 dashboard-title">{{title}}</h1>
    </div>

</template>



<script>

    export default {
        // Passing this prop to the other dashboard components so that those components can send customized information back to this component.
        props: ['title']
    }

</script>