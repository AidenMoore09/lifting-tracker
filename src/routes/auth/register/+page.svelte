<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<form method="POST">
	<label>
		Email
		<input name="email" type="email" />
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	{#if form?.error}
		<p>{form.error}</p>
	{/if}

	{#if form?.success}
		<p>{form.message}</p>
	{/if}

	<button>Create Account</button>
</form>