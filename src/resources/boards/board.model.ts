import { v4 as uuid } from 'uuid';
import { IColumn } from '../../common/type';

/**
 * Add in object board new field id equal uuid.
 * If not hand over id argument then field id equal uuid.
 * Otherwise field id qual argument id.
 * @param board -first argument object board
 * @param id -second argument id board
 * @returns void
 */
class Board {
  id: string;
  title: string;
  columns: [IColumn];

  constructor(
    board: {
      title: string;
      columns: [IColumn];
    },
    id: string = uuid()
  ) {
    this.id = id;
    this.title = board.title;
    this.columns = board.columns;
  }
}

export default Board;
