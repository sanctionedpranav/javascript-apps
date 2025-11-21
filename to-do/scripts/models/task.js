// import { taskOperation } from "./task_operations";

// function Task(id, name, description, date, url, isMarked = false) {
//   this.id = id;
//   this.name = name;
//   this.description = description;
//   this.date = date;
//   this.url = url;
//   this.isMarked = isMarked;
// }

// Task.prototype.toggle = function (){
//   this.isMarked = !this.isMarked;
// };
// export default Task;

class Task {
  constructor(id, name, description, date, url, isMarked = false) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.url = url;
    this.isMarked = isMarked;
  }
  toggle() {
    this.isMarked = !this.isMarked;
  }
}

export default Task;
