export type ToDo = {
  id: number;
  description: string;
  isComplete: boolean;
}

export type NewToDo = Omit<ToDo, "id">;
