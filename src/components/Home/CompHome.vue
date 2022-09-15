<template>
    <!-- APP HOME COMPONENT -->

    <div class="container">
        <!-- The large carousel slides. It takes the prop from the carousel component, which allows this home component to send the "homeArticles" data back to the carousel component. -->
        <app-carousel :slides="homeArticles"></app-carousel>
        <!-- The feature cards for the articles in columns and rows. It takes the ":articles" prop from the featured section component, which allows this home component to pass the "homeArticles" data back to the featured section component. -->
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
                    {id: 3},
                    {id: 4},
                    {id: 5},
                    {id: 6},
                    {id: 7},
                    {id: 8}
                ]
            }
        },
        components: {
            AppCarousel,
            Featured
        }
    }

</script>