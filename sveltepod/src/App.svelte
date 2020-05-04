<script>
	let name = '';

	import { MessageBus } from '@podium/browser';
	const messageBus = new MessageBus();

	messageBus.subscribe('internalchannel', 'newMessage', event => {
		if(event.payload.from !== 'svelte left panel') {
			console.log('message received from ' + event.payload.from);
			name = event.payload.message;
		}
	});

	function handleKeyup(e) {
		console.log('fire');
		messageBus.publish('internalchannel', 'newMessage', {message: name, from: 'svelte left panel'});
	}
</script>

<main>
	<p>This is an app using Svelte...</p>
	<label for="busname">Send a message through the bus...</label><br/>
	<input bind:value={name} id="busname" on:keyup={handleKeyup}/>
	<p class="smallText">Message: {name}</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-color: #ff3e00;
		color: #ffffff;
	}

	.smallText {
		font-size: 11px;
		color: #ccc;
	}
	.smallText:hover {
		color: #fff;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>