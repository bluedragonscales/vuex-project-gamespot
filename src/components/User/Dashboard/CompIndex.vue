<template>
    <!-- MAIN DASHBOARD COMPONENT -->

    <div class="container-fluid p-top">
        <div class="row">
            <!-- This is the sidebar nav element on the left. -->
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse ms-2">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <!-- The link to the user's dashboard. -->
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'dashboard'}">Dashboard</router-link>
                        </li>
                        <!-- The link to the user's profile. -->
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'user_profile'}">Profile</router-link>
                        </li>
                    </ul>

                    <!-- This section will only be viewable to admins. -->
                    <div>
                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-5 mb-1 text-muted">Admin</h6>

                        <ul class="nav flex-column mb-2">
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{name: 'admin_articles'}">Articles</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{name: 'add_articles'}">Add Articles</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <!-- This is the main content shown on the right. -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div>
                    <!-- This is the router view we need for the child paths of the dashboard route. -->
                    <router-view></router-view>
                </div>
            </main>
        </div>
    </div>

</template>