<script lang="ts">
	let { children } = $props();
</script>

<div style="margin-bottom: 1rem;">
	<nav>
		<a href="/home">Home</a>
		<a href="/users">Users</a>
		<a href="/auth/login">Login</a>
	</nav>
</div>

{@render children()}
