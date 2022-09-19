<template>
    <!-- ADD ARTICLE FORM INPUT COMPONENT -->

    <!-- This input will show if the prop "element" is "input". -->
    <div v-if="element === 'input'">
        <!-- The input box. -->
        <input 
            class="form-control" 
            :type="type" 
            v-bind="field" 
            :placeholder="placeholder">

        <!-- The error message. -->
        <p class="alert alert-danger">{{errorMessage}}</p>
    </div>


    <!-- This input will show if the prop "element" is "select". -->
    <div v-if="element === 'select'">
        <input 
            class="form-control" 
            :type="type" 
            v-bind="field" 
            :placeholder="placeholder" 
            :class="{'is-invalid': errorList.length !== 0}">

        <div v-if="errorList.length !== 0">
            <p class="alert alert-danger">{{errorMsg}}</p>
        </div>
    </div>

</template>



<script>

    export default {
        props: ['field', 'errorList', 'errorMsg', 'element', 'type', 'placeholder']
    }

</script>