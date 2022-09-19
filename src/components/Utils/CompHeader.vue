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
                    <!-- If the user is not logged in, the Sign In button will be on the nav bar. -->
                    <li v-if="!authValue"><router-link to="/signin">Sign In</router-link></li>

                    <!-- If the user IS logged in, these two links will show on the nav bar. -->
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
                // This triggers the sign out action where all the stored user data gets wiped so they can completely log out.
                this.$store.dispatch('auth/signOut');
            }
        },
        computed: {
            ...mapGetters({
                // Receiving this auth value to determine which buttons are shown to the user.
                authValue: 'auth/getAuthValue',
                // This value determines other things that are shown only when the user is an admin.
                adminValue: 'auth/getAdminValue'
            })
        }
    }

</script>