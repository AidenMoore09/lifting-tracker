<script lang="ts">
	let { children } = $props();
</script>

<nav>
	<a href="/home">Home</a>
	<a href="/users">Users</a>
	<a href="/auth/reset-password">Reset Password</a>
</nav>

{@render children()}
