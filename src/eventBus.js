import { createApp } from 'vue';

const eventBusApp = createApp({});
const eventBus = eventBusApp.config.globalProperties;

export default eventBus;
