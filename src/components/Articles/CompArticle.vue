<template>
    <!-- ARTICLE PAGE COMPONENT -->

    <!-- This is the content of the individual article for each game. All of the article data comes from the mounted action that requests the article data from the database and then saves it to the data variable "articleData". -->
    <div class="container p-top article-page" v-if="articleData">
        <div><p class="game-tag">{{articleData.game}}</p></div>

        <div class="article-featured" :style="{backgroundImage: `url(${articleData.img})`}"></div>

        <div class="article-content">
            <p class="owner">Article written by <strong>{{articleData.owner.firstname}} {{articleData.owner.lastname}}</strong></p>

            <hr>

            <h1>{{articleData.title}}</h1>

            <div class="editor" v-html="articleData.editor"></div>
        </div>

        <hr>

        <div>
            <p class="article-rating mt-4">Our rating is <strong>{{articleData.rating}}</strong> out of 5</p>
        </div>

    </div>

</template>



<script>

    export default {
        data() {
            return {
                articleData: null
            }
        },
        mounted() {
            // When this route is mounted, dispatch the action to get the single article data and pass in the route's id parameter because it is already available to us through the route params.
            this.$store.dispatch('articles/requestArticle', this.$route.params.id).then((article) => {
                // Then once the request has been fullfilled, if the article exists (the action did not return null) the data returned will be assigned to this component's data variable called "articleData";
                if(article) {
                    this.articleData = article;
                } else {
                    // If null is returned from the dispatch request then push the user to the 404 page.
                    this.$router.push({name: '404'});
                }
            })
        }
    }

</script>