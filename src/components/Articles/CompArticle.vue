<template>
    <!-- ARTICLE PAGE COMPONENT -->

    <!-- This is the content of the individual article for each game. -->
    <div class="container p-top article-page" v-if="articleData">
        <div><p class="game-tag">{{articleData.game}}</p></div>

        <div class="article-featured" :style="{backgroundImage: `url(${articleData.img})`}"></div>

        <div class="article-content">
            <p class="owner">Article written by <strong>{{articleData.owner.firstname}} {{articleData.owner.lastname}}</strong></p>

            <hr>

            <h1>{{articleData.title}}</h1>

            <div class="editor" v-html="articleData.editor"></div>
        </div>

        <div>
            <p class="article-rating">Our rating: <strong>{{articleData.rating}}</strong></p>
        </div>

    </div>

</template>



<script>

    export default {
        data() {
            return {
                articleData: {
                    id: '123456',
                    owner: {
                        firstname: 'Fred',
                        lastname: 'Dean',
                        uid: 'wavwori948r27480v'
                    },
                    game: 'The Last Of Us 2',
                    title: 'Lorem Title',
                    rating: 5,
                    timestamp: '01/01/01',
                    img: 'http://placebeard.it/1080/720',
                    excerpt: 'Magnam maiores ratione fugit delectus culpa, porro id possimus soluta assumenda alias vitae temporibus error! Quas deleniti provident beatae sit assumenda quam.',
                    editor: '<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus et excepturi, impedit cum molestias eveniet laudantium, iste dignissimos consequuntur doloribus minima rem provident quo quia enim? Deleniti dolorum quas laudantium!</p><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus et excepturi, impedit cum molestias eveniet laudantium, iste dignissimos consequuntur doloribus minima rem provident quo quia enim? Deleniti dolorum quas laudantium!</p><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus et excepturi, impedit cum molestias eveniet laudantium, iste dignissimos consequuntur doloribus minima rem provident quo quia enim? Deleniti dolorum quas laudantium!</p>'
                }
            }
        }
    }

</script>