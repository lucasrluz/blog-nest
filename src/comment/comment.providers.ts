import { Connection } from 'typeorm';
import { Comment } from './entity/comment.entity';

export const commentProviders = [
  {
    provide: 'COMMENT_REPOSITOTY',
    useFactory: (connection: Connection) => connection.getRepository(Comment),
    inject: ['DATABASE_CONNECTION'],
  },
];
