<template>
    <!-- ADD ARTICLE FORM INPUT COMPONENT -->

    <!-- This input will show if the prop "element" is "input". -->
    <div v-if="element === 'input'">
        <!-- The input box. -->
        <input 
            class="form-control mt-3" 
            :type="type" 
            v-bind="field" 
            :placeholder="placeholder" 
            :class="{'is-invalid': errorList.length !== 0}">

        <!-- The error message. -->
        <div v-if="errorList.length !== 0">
            <p class="alert alert-danger">{{errorMsg}}</p>
        </div>
    </div>


    <!-- This input will show if the prop "element" is "textarea". -->
    <div v-if="element === 'textarea'">
        <textarea
            class="form-control mt-3" 
            :class="{'is-invalid': errorList.length !== 0}" 
            :rows="rows" 
            v-bind="field" 
            :placeholder="placeholder"></textarea>

        <div v-if="errorList.length !== 0">
            <p class="alert alert-danger">{{errorMsg}}</p>
        </div>
    </div>


    <!-- This input will show if the prop "element" is "select". -->
    <div v-if="element === 'select'">
        <!-- The input box. -->
        <select 
            class="form-select mt-3" 
            v-bind="field" 
            :class="{'is-invalid': errorList.length !== 0}">
            <slot></slot>
        </select>

        <!-- The error message. -->
        <div v-if="errorList.length !== 0">
            <p class="alert alert-danger">{{errorMsg}}</p>
        </div>
    </div>

</template>



<script>

    export default {
        props: ['field', 'errorList', 'errorMsg', 'element', 'type', 'placeholder', 'rows']
    }

</script>