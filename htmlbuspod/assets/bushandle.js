import { MessageBus } from '/node_modules/@podium/browser/dist/src/index.js';

const messageBus = new MessageBus();

messageBus.subscribe('internalchannel', 'newMessage', event => {
  console.log('message received on html bus from ' + event.payload.from);
  const message = event.payload.message;
  document.getElementById('htmlbus-message').innerText = message;
});