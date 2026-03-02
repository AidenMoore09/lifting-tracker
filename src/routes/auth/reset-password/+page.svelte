<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<form method="POST" use:enhance>
	<label>
		Email
		<input name="email" type="email" />
	</label>

	{#if form?.error}
		<p>{form.error}</p>
	{/if}

	{#if form?.success}
		<p>Check your email for a reset link.</p>
	{/if}

	<button>Send</button>
</form>
