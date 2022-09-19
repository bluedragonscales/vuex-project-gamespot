<template>

    <div class="container-fluid p-top">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'dashboard'}">Dashboard</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'user_profile'}">Profile</router-link>
                        </li>
                    </ul>
                </div>
            </nav>

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div>
                    <router-view></router-view>
                </div>
            </main>
        </div>
    </div>

</template>