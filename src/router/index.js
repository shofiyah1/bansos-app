import { createRouter, createWebHistory } from 'vue-router';
import BansosForm from '../components/BansosForm.vue';
import BansosPreview from '../components/BansosPreview.vue';

const routes = [
  {
    path: '/',
    name: 'Form',
    component: BansosForm,
  },
  {
    path: '/preview',
    name: 'Preview',
    component: BansosPreview,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
