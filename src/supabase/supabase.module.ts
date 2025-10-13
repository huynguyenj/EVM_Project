import { Global, Module } from '@nestjs/common';
import supabaseConfig from 'src/common/config/supabase.config';
import { ConfigType } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { SupabaseFileModule } from './file/supabase.file.module';

@Global() // make it global and any module can use no need to imports
@Module({
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      inject: [supabaseConfig.KEY],
      useFactory: (supabaseSettings: ConfigType<typeof supabaseConfig>) => {
        return createClient(supabaseSettings.url, supabaseSettings.role_key);
      },
    },
  ],
  imports: [SupabaseFileModule],
  exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule {}
