import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [AuthModule],
})
export class RoleModule {}
