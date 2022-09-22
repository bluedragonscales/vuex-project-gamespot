<template>

    <dashboard-title title="Articles"></dashboard-title>

    <!-- If there are articles, then show this div containing the Ant Design table. -->
    <div v-if="retrieveAdminArticles">
        <!-- This is the Ant Design table, with the columns returned from the data, no pagination, and pulling its source of data from adminArticles. It uses the record id as a row key and is bordered (for style). -->
        <a-table :columns="columns" :pagination="false" :data-source="retrieveAdminArticles" :row-key="record => record.id" bordered>

            <!-- Formatting the rows. -->
            <template #name="{text}">
                <a>{{text}}</a>
            </template>

            <!-- The column for the name of the game. -->
            <template #game="{record}">
                <router-link :to="{name: 'article', params: {id: record.id}}" target="_blank">
                    {{record.game}}
                </router-link>
            </template>

            <!-- The column for the owner information. -->
            <template #owner="{record}">
                <span>{{record.owner.firstname}} {{record.owner.lastname}}</span>
            </template>

            <!-- The column for the timestamp. Using the built in date library to convert the weird timestamp object received from the database to a useable front-end date. -->
            <template #time="{record}">
                <span>{{record.timestamp.toDate().toDateString()}}</span>
            </template>

            <!-- The column for the delete button. Uses an Ant Design popover to confirm whether to delete for sure. -->
            <template #delete="{record}">
                <a-popconfirm title="Are you sure?" 
                    ok-text="Yes" 
                    cancel-text="No" 
                    @confirm="removeById(record.id)">
                    <button class="btn btn-danger btn-sm">Delete</button>
                </a-popconfirm>
            </template>

            <!-- A link to go to the add articles form as a header to the table. -->
            <template #title>
                <router-link :to="{name: 'add_articles'}">
                    <button class="btn btn-secondary">Add Article</button>
                </router-link>
            </template>

            <!-- The footer of the table. -->
            <template #footer></template>

        </a-table>

        <!-- Button to load more articles than the initial limit. -->
        <button class="btn btn-secondary mt-3" @click="loadMoreAdminArticles({limit: 1})">Load More Articles</button>
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
            // Finds and stores the reload param from the route connecting this component.
            const reload = this.$route.params.reload;

            // This will keep the articles page from reloading so all the articles that were loaded (past the initial limit) will stay on the page. It's blocking the store from reloading the request for articles to the front-end. The "or reload" part lets the db information reload.
            if(!this.retrieveAdminArticles || reload) {
                // When the application is mounted firestore will send us three articles through the "getAdminArticles" action we retrieved with "mapActions".
                this.requestAdminArticles({limit:1});
            }
        },
        methods: {
            // "mapActions" retrieves all actions available in the store. Here we've specified just the actions in the articles module and cherry picking the "getAdminArticles" action.
            ...mapActions('articles', [
                'requestAdminArticles',
                'loadMoreAdminArticles',
                'removeById'
            ])
        }
    }


    // Creating the columns for an Ant Design table. Each column is an object.
    const columns = [
        {
            title: 'Game',
            slots: {customRender: 'game'}
        },
        {
            title: 'Owner',
            slots: {customRender: 'owner'}
        },
        {
            title: 'Rating',
            dataIndex: 'rating'
        },
        {
            title: 'Created at',
            slots: {customRender: 'time'}
        },
        {
            title: '',
            slots: {customRender: 'delete'}
        },
    ]

</script>