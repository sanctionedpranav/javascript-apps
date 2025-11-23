class Task {
  constructor(id, name, description, date, isMarked = false) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.isMarked = isMarked;
  }
  toggle() {
    this.isMarked = !this.isMarked;
  }
}

export default Task;
