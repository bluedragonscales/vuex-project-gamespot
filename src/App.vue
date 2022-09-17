<template>
	<!-- MAIN APP FILE -->

	<!-- The header imported from the components file. -->
	<app-header></app-header>
	<!-- The router view brings in all of the different application paths. If the application is not loading then show the application. Otherwise show the loader icon. -->
	<router-view v-if="!isLoading"></router-view>

	<div v-else class="page-loader">
		LOADING
	</div>
    
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
				toastMsg: 'notify/getToastMsg',
				isLoading: 'notify/getLoadingValue'
			})
		},
		// This watch section is for everything we want to watch for changes in mapGetters. The names of the watch methods have to match the names of the mapGetters' keys.
		watch: {
			toastMsg(toastMsg) {
				if(toastMsg[0]) {
					// If the first index of the toast message array is true.
					if(toastMsg[2] === 'error') {
						// If the third index of the toast message array is "error" then use the error toast with the message in the second index.
						this.$toast.error(toastMsg[1]);
					} else if(toastMsg[2] === 'success') {
						// Else if the third index of the toast message array is "success" then use the success toast with the message in the second index.
						this.$toast.success(toastMsg[1]);
					}
				}
			}
		}
	}

</script>



<style>
	@import './assets/style.css';
</style>