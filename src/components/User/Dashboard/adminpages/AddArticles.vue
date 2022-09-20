<template>
    <!-- ADMIN ADD ARTICLE COMPONENT -->

    <!-- This title uses the "title" prop to insert its own customized title. -->
    <dashboard-title title="Add Article"></dashboard-title>

    <!-- This form is imported from "vee-validate" and upon submission, it will call the method "onSubmit". It specifies that the group of inputs in "articleFormSchema" is what needs to be validated. -->
    <Form @submit="onSubmit" :validation-schema="articleSchema">
        <!-- NAME INPUT -->
        <!-- The bootstrap requirement for styling forms. -->
        <div class="form-group">
            <!-- The Field component imported from "vee-validate". -->
            <Field name="game" v-slot="{field, errors, errorMessage}">
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
            <Field name="title" v-slot="{field, errors, errorMessage}">
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
            <Field name="excerpt" v-slot="{field, errors, errorMessage}">
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

        <!-- RATING SELECT -->
        <div class="form-group">
            <Field name="rating" v-slot="{field, errors, errorMessage}" value="Select a rating">
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
            <Field name="img" v-slot="{field, errors, errorMessage}">
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
        <button type="submit" class="btn btn-primary m-3">Add Article</button>

    </Form>

</template>


<script>
    /* eslint-disable */
    import DashboardTitle from '../../../Utils/DashboardTitle.vue';
    import {Form, Field} from 'vee-validate';
    import {addArticleSchema} from '../../../../tools/schemas.js';
    import FormElement from '../../../Utils/FormElement.vue';

    export default {
        data() {
            return {
                articleSchema: addArticleSchema,
                ratings: [1, 2, 3, 4, 5]
            }
        },
        components: {
            DashboardTitle,
            Form,
            Field,
            FormElement
        },
        methods: {
            onSubmit(values) {
                console.log(values);
            }
        }
    }

</script>