import { extname } from 'path';

export const editFileName = (_, file, callback) => {
  const name = file.originalname.split('.').slice(0, -1).join('_');
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
