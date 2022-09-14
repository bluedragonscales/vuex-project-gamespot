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
                    <li><router-link to="/signin">Sign In</router-link></li>
                    <li><span>Log Out</span></li>
                    <li><router-link to="/user/dashboard">Dashboard</router-link></li>
                </ul>
            </nav>
        </div>
    </header>

</template>