<template>
    <!-- APP HEADER COMPONENT -->
    <header>
        <div class="container header-container p-4 nav">
            <!-- The lefthand logo at the top. -->
            <div class="logo">
                <router-link to="/" class="text-white">
                    GameSpot
                </router-link>
            </div>

            <!-- The navigation section. -->
            <nav>
                <ul class="text-white mt-3">
                    <li v-if="!authValue"><router-link to="/signin">Sign In</router-link></li>
                    <li @click="signOut" v-else-if="authValue"><span>Log Out</span></li>
                    <li v-if="authValue"><router-link to="/user/dashboard">Dashboard</router-link></li>
                </ul>
            </nav>
        </div>
    </header>

</template>



<script>
    import { mapGetters } from 'vuex';

    export default {
        methods: {
            signOut() {
                this.$store.dispatch('auth/signOut');
            }
        },
        computed: {
            ...mapGetters({
                authValue: 'auth/getAuthValue',
                adminValue: 'auth/getAdminValue'
            })
        }
    }

</script>