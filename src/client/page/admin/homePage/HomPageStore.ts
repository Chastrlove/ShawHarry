import { action, observable } from "mobx";

export class HomPageStore {
  @observable
  public todo;

  @action
  public changeTodo = (todo) => {
    this.todo = todo;
  };
}
