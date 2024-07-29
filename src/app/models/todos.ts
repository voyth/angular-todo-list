export type ToDo = {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  createdAt: Date;
}

export type NewToDo = Omit<ToDo, "id">;
