<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
@import url("//at.alicdn.com/t/font_456469_jnycso0dbh2gldi.css");
html,
body {
  height: 100%;
  width: 100%;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  background-color: #f8f8f8;
}
</style>
