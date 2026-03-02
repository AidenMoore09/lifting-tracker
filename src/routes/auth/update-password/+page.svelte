<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<form method="POST" use:enhance>
	<label>
		New Password:
		<input name="password" type="password" />
	</label>
	<label>
		Confirm Password:
		<input name="confirmPassword" type="password" />
	</label>

	{#if form?.error}
		<p>{form.error}</p>
	{/if}

	{#if form?.success}
		<p>{form.message}</p>
	{/if}

	<button>Update Password</button>
</form>
