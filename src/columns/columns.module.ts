import { forwardRef, Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ColumnBoard } from './entities/column.entity';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService],
  imports: [
    TypeOrmModule.forFeature([ColumnBoard]),
    forwardRef(() => AuthModule),
  ],
})
export class ColumnsModule {}
