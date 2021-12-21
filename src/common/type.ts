interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

interface IBoard {
  id: string;
  title: string;
  columns: {
    columnId: string;
    title: string;
    order: number;
  };
}

interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

interface IColumns {
  columnId: string;
  title: string;
  order: number;
}

export { IUser, ITask, IBoard, IColumns };
