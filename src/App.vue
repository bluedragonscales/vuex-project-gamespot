<template>
	<!-- MAIN APP FILE -->

	<!-- The header imported from the components file. -->
	<app-header></app-header>
	<!-- The router view brings in all of the different application paths. -->
	<router-view></router-view>
    
</template>



<script>
	import AppHeader from './components/Utils/CompHeader.vue';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			AppHeader
		},
		computed: {
			// This mapGetters import is an import of ALL of the getters on the vuex app.
			...mapGetters({
				toastMsg: 'notify/getToastMsg'
			})
		},
		// This watch section is for everything we want to watch for changes.
		watch: {
			watchToast(toastMsg) {
				console.log(toastMsg);
			}
		}
	}

</script>



<style>
	@import './assets/style.css';
</style>