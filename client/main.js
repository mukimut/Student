

import { Meteor } from 'meteor/meteor';
import routerFactory from '/imports/routes';

import Vue from 'vue';
import AppLayout from '/imports/ui/AppLayout.vue';







Meteor.startup(() => {

  const router = routerFactory.create();

	new Vue({
		router,
		el: '#app',
		render: h => h(AppLayout)

  });


});

