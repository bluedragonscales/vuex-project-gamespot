<template>
    <!-- APP HOME COMPONENT -->

    <div class="container">
        <!-- The large carousel slides. It takes the prop from the carousel component, which allows this home component to send the "homeArticles" data back to the carousel component. -->
        <app-carousel :slides="articleSlider"></app-carousel>
        <!-- The feature cards for the articles in columns and rows. It takes the ":articles" prop from the featured section component, which allows this home component to pass the "homeArticles" data back to the featured section component. -->
        <featured :articles="homeArticles"></featured>
    </div>

</template>



<script>
    import AppCarousel from '../Utils/CompCarousel.vue';
    import Featured from './CompFeatured.vue';

    export default {
        components: {
            AppCarousel,
            Featured
        },
        computed: {
            homeArticles() {
                // Returing all the information needed to show the articles on the home page.
                return this.$store.getters['articles/getHomeArticles'];
            },
            articleSlider() {
                // Limiting the home screen slider to only four articles.
                const articles = this.$store.getters['articles/getHomeArticles'];
                const slicedArray = articles.slice(0, 4);
                return slicedArray;
            }
        },
        mounted() {
            // When the app loads (is mounted) dispatch the action to show 8 articles to show on the home page.
            this.$store.dispatch('articles/mainGetArticles', {limit: 8});
        }
    }

</script>