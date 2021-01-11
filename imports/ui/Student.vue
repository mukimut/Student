<template>
  <div className="container">
    <header>
      <h1>Students</h1> <a href="/"> Back to Home</a><br>
    
      Name: <input type="text" placeholder="Enter Name of New Student" v-model="newStudent"/>
      Department: <select v-model="selectedDept" @change="deptSelected()">
        <option v-for="department in deptList" :value="department" :key="department._id">{{ department.value }}</option>
      </select>
      <table>
        <tr><th>Selected Subjects</th><th>All Subjects</th></tr>
        <tr>
          <td>
            <ul><li class="pointer" v-for="(subject, i) in selectedSubjects" v-bind:key="subject" @click="removeSubject(i)">
              {{subject}} <span class="redArrow">&#62;</span>
            </li></ul>
          </td>
          <td>
            <ul><li class="pointer" v-for="(subject, i) in subjectList" v-bind:key="subject" @click="addSubject(i)"> 
                <span class="greenArrow">&#60;</span>  {{subject}}
            </li> </ul>
          </td>
        </tr>
      </table>
      <button @click="addStudent()" v-if="!studentToEdit">Add</button>
      <button @click="submitEdit()" v-if="studentToEdit">Update</button>
			<button @click="reset()" >Reset</button>
    </header>

    <ul>
      <li v-for="student in studentList" v-bind:key="student._id">
        {{student.name}} (Dept: {{student.department.value}})
        <button className="delete" @click="deleteStudent(student._id)">Delete</button>
        <button @click="edit(student)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script>

import Vue from "vue";
import { Departments } from "../api/departments";
import { Students } from "../api/students";

function sendToArray(fromArray, toArray, index) {
  toArray.push(fromArray[index]);
  fromArray.splice(index, 1);
}

export default {
  components: {  },

  data() {
    return {newStudent: '', selectedDept: null, subjectList: [], selectedSubjects: [], studentToEdit: null, deptList: []};
  },
  methods: {
		addStudent() {
			Students.insert({name: this.newStudent, createTime: new Date(), subjects: this.selectedSubjects, department: this.selectedDept});
			this.reset();
		},
		
    deleteStudent(id) {
			Students.remove(id);
			this.reset();
		},
		
    addSubject(index) {
      sendToArray(this.subjectList, this.selectedSubjects, index);
		},
		
    removeSubject(index) {
      sendToArray(this.selectedSubjects, this.subjectList, index);
		},
		
    edit(student) {
			this.studentToEdit = student
			this.newStudent = student.name;

      if(student.subjects) this.selectedSubjects = student.subjects;
      else this.selectedSubjects = [];

      if(student.department) {
        this.selectedDept = student.department;
        this.subjectList = student.department.subjects.filter(e => !this.selectedSubjects.includes(e));
      }
		},

		reset(){
			this.studentToEdit = null;
			this.newStudent = '';
      this.selectedSubjects = [];
      this.subjectList = [];
      this.selectedDept = null
		},

		submitEdit() {
			Students.update(this.studentToEdit._id, {$set: { name: this.newStudent, subjects: this.selectedSubjects, department: this.selectedDept }});
			this.reset();
    },
    
    deptSelected() {
      this.selectedSubjects = [];
      this.subjectList = this.selectedDept.subjects;
    }
	},

  meteor: {
    studentList() {
      this.deptList = Departments.find({}).fetch();
			const studentList = Students.find({}).fetch();
      return studentList
    }
  }
};
</script>

