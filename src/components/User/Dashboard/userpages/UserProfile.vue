<template>
    <!-- USER PROFILE COMPONENT -->

    <dashboard-title title="Profile"></dashboard-title>

    <!-- These inputs are used to update the first and last name of the user. We draw from the form inputs component instead of recreating the inputs. -->
    <div v-if="userData">
        <Form @submit="onSubmit" :validation-schema="profileSchema">
            <!-- FIRSTNAME INPUT -->
            <div class="form-group">
                <Field name="firstname" v-model="userData.firstname" v-slot="{field, errors, errorMessage}">
                    <form-element
                        :field="field"
                        :errorList="errors" 
                        :errorMsg="errorMessage" 
                        element="input"
                        type="text"
                        placeholder="Your first name">
                    </form-element>
                </Field>
            </div>


            <!-- LASTNAME INPUT -->
            <div class="form-group">
                <Field name="lastname" v-model="userData.lastname" v-slot="{field, errors, errorMessage}">
                    <form-element
                        :field="field"
                        :errorList="errors" 
                        :errorMsg="errorMessage" 
                        element="input"
                        type="text"
                        placeholder="Your last name">
                    </form-element>
                </Field>
            </div>


            <!-- SUBMIT BUTTON -->
            <button type="submit" class="btn btn-primary m-3">Update User</button>
        </Form>
    </div>

</template>


<script>
    import DashboardTitle from '../../../Utils/DashboardTitle.vue';
    import { Field, Form } from 'vee-validate';
    import FormElement from '../../../Utils/FormElement.vue';
    import * as yup from 'yup';

    export default {
        data() {
            return {
                profileSchema: {
                    firstname: yup.string(),
                    lastname: yup.string()
                }
            }
        },
        components: {
            DashboardTitle,
            Field,
            Form,
            FormElement
        },
        computed: {
            userData() {
                // Returning the stringified user data to show the updated first and last names.
                return JSON.parse(JSON.stringify(this.$store.getters['auth/getUserData']));
            }
        },
        methods: {
            onSubmit(values) {
                // Dispatching the action to update the profile first and last names.
                this.$store.dispatch('auth/updateProfile', values);
            }
        }
    }

</script>