<script>
	let { data } = $props();
</script>

<h1>Users</h1>

<ul>
	{#each data.users as { id, name }}
		<li><a href="/users/{id}">{name}</a></li>
	{/each}
</ul>
