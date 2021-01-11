import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'

// Create router instance
const routerFactory = new RouterFactory({
  mode: 'history',
  scrollBehavior: nativeScrollBehavior
});

// Not found
import NotFound from '/imports/ui/NotFound.vue';
import Home from '/imports/ui/Home.vue';

RouterFactory.configure(router => {
  router.addRoutes([
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    }
  ]);
}, -1);

export default routerFactory;