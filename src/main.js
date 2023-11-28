import uviewPlus from 'uview-plus'
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue';
import config from '@/config.js';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export function createApp() {
	const app = createSSRApp(App);
	// 不推荐挂载在根节点上，因为这样会导致所有组件都能访问到，不安全，我们使用provide/inject来实现，按需访问
	app.provide('$config', config);
	// 创建 Pinia 实例并添加 persistedstate 插件
	const pinia = Pinia.createPinia();
	pinia.use(piniaPluginPersistedstate);

	app.use(pinia);
	app.use(uviewPlus)

	return {
		app,
		Pinia
	}
}
