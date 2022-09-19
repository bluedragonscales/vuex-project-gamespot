<template>
    <!-- ADD ARTICLE FORM INPUT COMPONENT -->

    <div v-if="element === 'input'">
        <!-- A regular input form element. -->
        <input 
            class="form-control"
            :type="type"
            v-bind="field"
            :class="{'is-invalid': errors.length !== 0}"
            :placeholder="placeholder">

        <!-- The error message. -->
        <div v-if="errors.length !== 0">
            <p class="alert alert-danger">{{errorMessage}}</p>
        </div>
    </div>

</template>



<script>

    export default {
        props: ['field', 'errors', 'errorMessage', 'element', 'type', 'placeholder']
    }

</script>