<template>

    <div class="featured-home">
        <!-- In the grid system the gutter attribute of 16 is small spacing. -->
        <a-row :gutter="16">
            <!-- For every article that is rendered with the "v-for" directive, it will call the id, the index of the array, and the article information. The "article" and the "index" attributes are props from the feature card component giving it all the information from that card component. -->
            <article-card 
                v-for="(article, index) in articles" 
                :key="article.id" 
                :index="index"
                :article="article">
            </article-card>
        </a-row>
    </div>

</template>



<script>
    import ArticleCard from '../Utils/FeatureCard.vue';

    export default {
        components: {
            ArticleCard
        },
        // Passing props from this component to the Home component.
        props: ['articles']
    }

</script>