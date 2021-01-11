import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'

// Create router instance
const routerFactory = new RouterFactory({
  mode: 'history',
  scrollBehavior: nativeScrollBehavior
});

// Not found
import NotFound from '/imports/ui/NotFound.vue';
import Home from '/imports/ui/Home.vue';
import Subject from '/imports/ui/Subject.vue';
import Department from '/imports/ui/Department.vue';
import Student from '/imports/ui/Student.vue';

RouterFactory.configure(router => {
  router.addRoutes([
    {path: '/', name: 'home', component: Home},
    {path: '/subject', name: 'subject', component: Subject},
    {path: '/department', name: 'department', component: Department},
    {path: '/student', name: 'student', component: Student},
    {path: '*', name: 'not-found', component: NotFound }
  ]);
}, -1);

export default routerFactory;