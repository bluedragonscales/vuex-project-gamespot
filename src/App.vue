<template>
	<!-- MAIN APP FILE -->

	<!-- The header imported from the components file. -->
	<app-header></app-header>
	<!-- The router view brings in all of the different application paths. -->
	<router-view></router-view>
    
</template>



<script>
	import AppHeader from './components/CompHeader.vue';

	export default {
		data() {
			return {

			}
		},
		components: {
			AppHeader
		}
	}

</script>



<style>
	@import './assets/style.css';
</style>