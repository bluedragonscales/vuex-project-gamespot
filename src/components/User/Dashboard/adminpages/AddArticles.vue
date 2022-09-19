<template>
    <!-- ADMIN ADD ARTICLE COMPONENT -->

    <!-- This title uses the "title" prop to insert its own customized title. -->
    <dashboard-title title="Add Article"></dashboard-title>

    <!-- This form is imported from "vee-validate" and upon submission, it will call the method "onSubmit". It specifies that the group of inputs in "articleFormSchema" is what needs to be validated. -->
    <Form @submit="onSubmit" :validation-schema="articleSchema">
        <!-- The bootstrap requirement for styling forms. -->
        <div class="form-group">
            <!-- The Field component imported from "vee-validate". -->
            <Field name="game" :v-slot="{field, errors, errorMessage}">
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
                articleSchema: addArticleSchema
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