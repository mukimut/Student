<template>
  <div className="container">
    <header>
      <h1>Subjects</h1> <a href="/"> Back to Home</a>
    </header>
    <input type="text" placeholder="Add New Subject" v-model="newSubject"/>
    <button @click="addSubject()">Add</button>

    <ul>
      <li v-for="subject in subjectList" v-bind:key="subject._id">
        {{subject.value}} <button className="delete" @click="deleteSubject(subject._id)">Delete</button>
      </li>

    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { Subjects } from "../api/subjects";


export default {
  components: {  },

  data() {
    return {newSubject: ''};
  },

  methods: {
		addSubject() {
      Subjects.insert({value: this.newSubject, createTime: new Date()})
    },
    deleteSubject(id) {
      Subjects.remove(id);
    }
	},

  meteor: {
    subjectList() {
      return Subjects.find({}).fetch();
    },
  },
};
</script>

