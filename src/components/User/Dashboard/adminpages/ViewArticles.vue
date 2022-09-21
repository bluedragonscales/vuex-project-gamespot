<template>

    <dashboard-title title="Articles"></dashboard-title>

    <!-- If there are articles, then show this div containing the Ant Design table. -->
    <div v-if="adminArticles">
        <!-- This is the Ant Design table, with the columns returned from the data, no pagination, and pulling its source of data from adminArticles. It uses the record id as a row key and is bordered (for style). -->
        <a-table :columns="columns" 
            :pagination="false" 
            :data-source="adminArticles" 
            :row-key="record => record.id" 
            bordered>
            <template #name="{text}">
                <a>{{text}}</a>
            </template>
        </a-table>
    </div>

</template>


<script>
    import DashboardTitle from '../../../Utils/DashboardTitle.vue';
    import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                // Returning the columns information created at the bottom of the script section.
                columns
            }
        },
        components: {
            DashboardTitle
        },
        computed: {
            retrieveAdminArticles() {
                // Retrieving the articles from the store getter.
                return this.$store.getters['articles/getAdminArticles'];
            }
        },
        mounted() {
            // When the application is mounted firestore will send us three articles through the "getAdminArticles" action we retrieved with "mapActions".
            this.requestAdminArticles({limit:3});
        },
        methods: {
            // "mapActions" retrieves all actions available in the store. Here we've specified just the actions in the articles module and cherry picking the "getAdminArticles" action.
            ...mapActions('articles', [
                'requestAdminArticles'
            ])
        }
    }


    // Creating the columns for an Ant Design table. Each column is an object.
    const columns = [
        {
            title: 'Game',
            dataIndex: 'game',
            slots: {customRender: 'game'}
        },
        {
            title: 'Owner',
            slots: {customRender: 'owner'}
        },
        {
            title: 'Rating',
            dataIndex: 'rating'
        }
    ]

</script>