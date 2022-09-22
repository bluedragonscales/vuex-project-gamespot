<template>
    <!-- INDIVIDUAL ARTICLE CARD COMPONENT -->

    <a-col :span="6" class="article-card">
        <!-- Making the card clickable to lead to an article. The dynamic router link takes the name of the path (created in the routes.js file) and the parameter called "id" which has a value of the dynamic article id. -->
        <router-link :to="{name: 'article', params: {id: article.id}}">
            <!-- The card will be the full width of the column. -->
            <a-card hoverable style="width: 100%;">
                <template #cover>
                    <!-- Image at the top of the card. -->
                    <img :src="article.img" alt="article image">
                </template>
                <!-- Content of the card. Fake for now. -->
                <h3>{{article.title}}</h3>
                <p>{{article.excerpt}}</p>
            </a-card>
        </router-link>
    </a-col>

</template>



<script>

    export default {
        // Passing these props to the main featured section component.
        props: ['article', 'index']
    }

</script>