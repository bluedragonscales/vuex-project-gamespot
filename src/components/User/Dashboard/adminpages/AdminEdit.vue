<template>
    <!-- ADMIN EDIT ARTICLE COMPONENT -->

    <!-- This title uses the "title" prop to insert its own customized title. -->
    <dashboard-title title="Edit Article"></dashboard-title>

    <div v-if="article">
        <!-- This form is imported from "vee-validate" and upon submission, it will call the method "onSubmit". It specifies that the group of inputs in "articleFormSchema" is what needs to be validated. -->
        <Form @submit="onSubmit" :validation-schema="articleSchema">
            <!-- NAME INPUT -->
            <!-- The bootstrap requirement for styling forms. -->
            <div class="form-group">
                <!-- The Field component imported from "vee-validate". -->
                <Field name="game" v-model="article.game" v-slot="{field, errors, errorMessage}">
                    <!-- This is the form element component we created. It passes in customized props for each type of input needed. -->
                    <form-element
                        :field="field"
                        :errorList="errors" 
                        :errorMsg="errorMessage" 
                        element="input"
                        type="text"
                        placeholder="Name of the game">
                    </form-element>
                </Field>
            </div>

            <!-- TITLE INPUT -->
            <div class="form-group">
                <Field name="title" v-model="article.title" v-slot="{field, errors, errorMessage}">
                    <form-element
                        :field="field"
                        :errorList="errors" 
                        :errorMsg="errorMessage" 
                        element="input"
                        type="text"
                        placeholder="Title of the article">
                    </form-element>
                </Field>
            </div>

            <!-- EXCERPT TEXTAREA -->
            <div class="form-group">
                <Field name="excerpt" v-model="article.excerpt" v-slot="{field, errors, errorMessage}">
                    <form-element
                        :field="field"
                        :errorList="errors" 
                        :errorMsg="errorMessage" 
                        element="textarea" 
                        :rows="3"
                        placeholder="Excerpt of the game">
                    </form-element>
                </Field>
            </div>

            <!-- WYSIWYG TIPTAP EDITOR -->
            <!-- the "@update" is listening for changes from the editor/child component and then calling the method "updateEditor" with those changes. -->
            <w-y-s-i-w-y-g @update="updateEditor" :content="article.editor"></w-y-s-i-w-y-g>
            <Field name="editor" v-model="veditor" v-slot="{field, errors, errorMessage}">
                <!-- Created a hidden input so that we can do the same validation as the rest of the inputs. The input here will be hidden, but the error message will pop up if the editor is not populated. -->
                <input type="hidden"
                    v-bind="field">
                <div v-if="errors.length !== 0">
                    <p class="alert alert-danger">{{errorMessage}}</p>
                </div>
            </Field>

            <!-- RATING SELECT -->
            <div class="form-group">
                <Field name="rating" v-model="article.rating" v-slot="{field, errors, errorMessage}" value="Select a rating">
                    <form-element
                        :field="field"
                        :errorList="errors" 
                        :errorMsg="errorMessage" 
                        element="select">
                        <option value="Select a rating" selected>Select a rating</option>
                        <option v-for="rating in ratings" :key="rating" :value="rating">{{rating}}</option>
                    </form-element>
                </Field>
            </div>

            <!-- GAME IMAGE INPUT -->
            <div class="form-group">
                <Field name="img" v-model="article.img" v-slot="{field, errors, errorMessage}">
                    <form-element
                        :field="field"
                        :errorList="errors" 
                        :errorMsg="errorMessage" 
                        element="input"
                        type="text"
                        placeholder="Add an image source">
                    </form-element>
                </Field>
            </div>


            <!-- SUBMIT BUTTON -->
            <button type="submit" class="btn btn-primary m-3" :disabled="loading">Edit Article</button>

        </Form>
    </div>

</template>


<script>
    /* eslint-disable */
    import DashboardTitle from '../../../Utils/DashboardTitle.vue';
    import {Form, Field} from 'vee-validate';
    import {addArticleSchema} from '../../../../tools/schemas.js';
    import FormElement from '../../../Utils/FormElement.vue';
    import WYSIWYG from '../../../Utils/WhatYouSeeIWYG.vue';

    export default {
        data() {
            return {
                // The fields to be validated.
                articleSchema: addArticleSchema,
                // The ratings to add to the form.
                ratings: [1, 2, 3, 4, 5],
                // The content typed into the wysiwyg editor.
                veditor: '',
                loading: false,
                article: null
            }
        },
        components: {
            DashboardTitle,
            Form,
            Field,
            FormElement,
            WYSIWYG
        },
        methods: {
            onSubmit(values) {
                // this.loading = true;
                // this.$store.dispatch('articles/addArticle', values).finally(() => {
                //     this.loading = false;
                // });

                // When the form is submitted, all the values will be console logged.
                console.log(values);
            },
            updateEditor(value) {
                // Receiving all the editor text emmited by the child editor component.
                this.veditor = value;
            }
        },
        mounted() {
            // Using the already created action "requestArticle" to get the article to edit. If the article exists then set it to the data variable "article". If it comes back as null then push the user to the 404 page.
            this.$store.dispatch('articles/requestArticle', this.$route.params.id).then((article) => {
                if(article) {
                    this.article = article;
                } else {
                    this.$router.push({name: '404'});
                }
            });
        }
    }

</script>