export type ToDo = {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export type NewToDo = Omit<ToDo, "id">;
