import { Module } from '@nestjs/common';
import { SupabaseFileService } from './supabase.file.service';
@Module({
  providers: [SupabaseFileService],
  exports: [SupabaseFileService],
})
export class SupabaseFileModule {}
