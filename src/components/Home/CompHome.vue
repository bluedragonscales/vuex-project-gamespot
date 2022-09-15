<template>
    <!-- APP HOME COMPONENT -->

    <div class="container">
        <!-- The large carousel slides. -->
        <app-carousel></app-carousel>
        <!-- The feature cards for the articles in columns and rows. It takes the ":articles" prop from the featured section component. -->
        <featured :articles="homeArticles"></featured>
    </div>

</template>



<script>
    import AppCarousel from '../Utils/CompCarousel.vue';
    import Featured from './CompFeatured.vue';

    export default {
        data() {
            return {
                homeArticles: [
                    {id: 1},
                    {id: 2},
                    {id: 3}
                ]
            }
        },
        components: {
            AppCarousel,
            Featured
        }
    }

</script>