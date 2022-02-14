interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

interface IColumn {
  columnId: string;
  title: string;
  order: number;
}

interface IBoard {
  id: string;
  title: string;
  columns: [IColumn];
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

interface ILevelLog {
  [key: string]: string;
}

export { IUser, ITask, IBoard, IColumn, ILevelLog };
