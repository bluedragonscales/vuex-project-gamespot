<template>
    <!-- CAROUSEL COMPONENT -->
    <!-- This carousel item is a npm package called "vue3-carousel". -->
    <carousel class="p-top" :items-to-show="1" :wrap-around="true">
        <slide v-for="slide in slides" :key="slide.id">
            <!-- This div is the background of the slide. -->
            <div class="slider-backg" :style="{background: `url(http://placebeard.it/1080/720?${slide.id})`}">
                <!-- This div is for the content of the slide. -->
                <div class="slide-content">
                    <!-- This div is for styling the title and paragraph box into the bottom left corner of the slide. -->
                    <div class="item">
                        <h3 class="text-white">Title of the article</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quod ea saepe fuga delectus. Expedita nobis deleniti placeat amet, totam molestias natus laboriosam saepe ab impedit, maiores aliquid dignissimos cumque.</p>
                    </div>
                </div>
            </div>
        </slide>

        <template #addons>
            <!-- The pagination tag is for the little buttons under the slides box to move to the next slide. -->
            <pagination></pagination>
        </template>
    </carousel>

</template>



<script>
    import 'vue3-carousel/dist/carousel.css';
    import { Carousel, Slide, Pagination } from 'vue3-carousel';

    export default {
        components: {
            Carousel,
            Slide,
            Pagination
        },
        props: ['slides']
    }

</script>



<style>
/* These classes are from the carousel npm library. */
    .carousel__pagination-button {
        background-color: var(--dark);
    }

    .carousel__pagination-button--active {
        background-color: var(--grape);
    }

</style>