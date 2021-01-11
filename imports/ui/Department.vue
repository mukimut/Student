<template>
  <div className="container">
    <header>
      <h1>Department</h1> <a href="/"> Back to Home</a><br>
    
      <input type="text" placeholder="Add New Department" v-model="newDept"/>
      <table>
        <tr><th>Selected Subjects</th><th>All Subjects</th></tr>
        <tr>
          <td>
            <ul><li class="pointer" v-for="(subject, i) in selectedSubjects" v-bind:key="subject._id" @click="removeSubject(i)">
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
      <button @click="addDepartment()" v-if="!deptToEdit">Add</button>
      <button @click="submitEdit()" v-if="deptToEdit">Update</button>
			<button @click="reset()" >Reset</button>
    </header>

    <ul>
      <li v-for="dept in departmentList" v-bind:key="dept._id">
        {{dept.value}} 
        <button className="delete" @click="deleteDepartment(dept._id)">Delete</button>
        <button @click="edit(dept)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script>

import Vue from "vue";
import { Departments } from "../api/departments";
import { Subjects } from "../api/subjects";

function sendToArray(fromArray, toArray, index) {
  toArray.push(fromArray[index]);
  fromArray.splice(index, 1);
}

export default {
  components: {  },

  data() {
    return {newDept: '', subjectList: [], selectedSubjects: [], tempSubjectStore: null, deptToEdit: null};
  },
  methods: {
		addDepartment() {
			Departments.insert({value: this.newDept, createTime: new Date(), subjects: this.selectedSubjects});
			this.reset();
		},
		
    deleteDepartment(id) {
			Departments.remove(id);
			this.reset();
		},
		
    addSubject(index) {
      sendToArray(this.subjectList, this.selectedSubjects, index);
		},
		
    removeSubject(index) {
      sendToArray(this.selectedSubjects, this.subjectList, index);
		},
		
    edit(dept) {
			this.deptToEdit = dept
			this.newDept = dept.value;
      if(!this.tempSubjectStore) this.tempSubjectStore = this.subjectList.slice();

      if(dept.subjects) this.selectedSubjects = dept.subjects;
      else this.selectedSubjects = [];
      
      this.subjectList = this.tempSubjectStore.filter(e => !this.selectedSubjects.includes(e));
		},

		reset(){
			this.deptToEdit = null;
			if(this.tempSubjectStore) this.subjectList = this.tempSubjectStore.slice();
			this.newDept = '';
			this.selectedSubjects = [];
		},

		submitEdit() {
			Departments.update(this.deptToEdit._id, {$set: { value: this.newDept, subjects: this.selectedSubjects }});
			this.reset();
		}
	},

  meteor: {
    departmentList() {
      const deptList = Departments.find({}).fetch();
			this.subjectList = Subjects.find({}).fetch().map(e => e.value);
      return deptList
    }
  },
};
</script>

