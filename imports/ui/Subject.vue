<template>
  <div className="container">
    <header>
      <h1>Subjects</h1> <a href="/"> Back to Home</a>
    </header>
    <input type="text" placeholder="Add New Subject" v-model="newSubject"/>
    <button @click="addSubject()">Add</button>

    <ul>
      <li v-for="subject in subjectList" v-bind:key="subject._id">
        {{subject.value}} | In {{subject.deptCount}} departments; {{subject.studentCount}} students with this course
        <button className="delete" @click="deleteSubject(subject._id)">Delete</button>
      </li>

    </ul>
  </div>
</template>

<script>

import Vue from "vue";
import { Subjects } from "../api/subjects";
import { Departments } from "../api/departments";
import { Students } from "../api/students";

export default {
  components: {  },

  data() {
    return {newSubject: ''};
  },

  methods: {
		addSubject() {
      Subjects.insert({value: this.newSubject, createTime: new Date()});
      this.newSubject = '';
    },
    deleteSubject(id) {
      Subjects.remove(id);
    }
	},

  meteor: {
    subjectList() {
      const subjectList = Subjects.find({}).fetch();
      return subjectList.map(e => {
        e.studentCount = Students.find({subjects: e.value}).count();
        e.deptCount = Departments.find({subjects: e.value}).count();

        return e;
      });
      // return subjectList;
    },
  },
};
</script>

