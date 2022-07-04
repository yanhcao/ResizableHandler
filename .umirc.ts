import { defineConfig } from 'dumi';
import ResizeHandler from './src/ResizeHandler/index';

export default defineConfig({
  title: 'ResizableHandler',
  routes: [{ exact: true, path: '/', component: ResizeHandler }]
});
