// CRUD
import Task from "./task.js";
export const taskOperation = {
  tasks: [],
  add(id, name, description, date, url) {
    let task = new Task(id, name, description, date, url);
    this.tasks.push(task);
    console.log("Task Added", this.tasks);
    return task;
  },
  getAllTask() {
    return this.tasks;
  },
  deleteMark() {
    this.tasks = this.tasks.filter((task) => !task.isMarked);
    return this.tasks;
  },
  mark(id) {
    let task = this.tasks.find((task) => task.id == id);
    if (task) {
      task.toggle();
    }
    // for (let i = 0; i < this.tasks.length; i++) {
    //   if (this.tasks[i].id == id) {
    //     let taskObject = this.tasks[i];
    //     taskObject.isMarked = !taskObject.isMarked;
    //   }
    // }
  },
  countMark() {
    return this.tasks.filter((task) => task.isMarked).length;
    // let count = 0;
    // for (let i = 0; i < this.tasks.length; i++) {
    //   if (this.tasks[i].isMarked) {
    //     count++;
    //   }
    // }
    // return count;
  },
  countUnMarked() {
    return this.tasks.length - this.countMark();
  },
};
