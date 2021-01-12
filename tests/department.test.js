import Vue from "vue";
import { expect } from 'chai'
import DepartmentUi from '../imports/ui/Department.vue'

describe('Department Test', () => {
  const Constructor = Vue.extend(DepartmentUi);
  const comp = new Constructor().$mount();

  it ('Subject List to Change Correctly', () => {
    comp.subjectList = ['Bangla', 'English'];
    comp.addSubject(0);
    expect(comp.selectedSubjects[0]).to.equal('Bangla');
    comp.addSubject(0);
    expect(comp.selectedSubjects[1]).to.equal('English');
    expect(comp.subjectList.length).to.equal(0);
    comp.removeSubject(1);
    expect(comp.subjectList[0]).to.equal('English');
  });


  it ('Reset', () => {
    comp.newDept = 'new dept name';
		comp.selectedSubjects = ['this', 'that'];
    comp.subjectList = ['Bangla', 'English'];
    comp.tempSubjectStore = ['sub1', 'sub2', 'sub3'];
    comp.reset();

    expect(comp.newDept).to.equal('');
    expect(comp.selectedSubjects.length).to.equal(0);
    comp.tempSubjectStore.forEach((e, index) => expect(e).to.equal(comp.subjectList[index]));
  });

  it ('Sets edited data', () => {
    comp.newDept = 'some dept name';
    comp.subjectList = ['Bangla', 'English', 'Onko', 'Biggan'];
    comp.selectedSubjects = ['this', 'that'];
    comp.tempSubjectStore = null;
    
    comp.edit({_id: 19, value: 'subject_to_edit', subjects: ['English']})

    expect(comp.deptToEdit._id).to.equal(19);
    expect(comp.newDept).to.equal('subject_to_edit');
    expect(comp.selectedSubjects[0]).to.equal('English');
    expect(comp.selectedSubjects.length).to.equal(1);
    ['Bangla', 'Onko', 'Biggan'].forEach((e, index) => expect(comp.subjectList[index]).to.equal(e));  
  });



    
});