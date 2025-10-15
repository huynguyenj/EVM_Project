import { Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import supabaseConfig from 'src/common/config/supabase.config';

@Injectable()
export class SupabaseFileService {
  private bucketName: string;
  constructor(
    @Inject('SUPABASE_CLIENT')
    private supabaseClient: SupabaseClient,
    @Inject(supabaseConfig.KEY)
    private supabaseSetting: ConfigType<typeof supabaseConfig>,
  ) {
    this.bucketName = supabaseSetting.bucket_name;
  }

  async uploadFile(file: Express.Multer.File, path: string) {
    const { error } = await this.supabaseClient.storage
      .from(this.bucketName)
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });
    if (error)
      throw new Error(
        `Some thing wrong with supabase storage: ${error.message}`,
      );
    const imageUrl = this.supabaseClient.storage
      .from(this.bucketName)
      .getPublicUrl(path);
    return imageUrl.data.publicUrl;
  }

  async deleteFile(path: string) {
    const decodeUrl = decodeURIComponent(path);
    const deletePath = decodeUrl.split(`/${this.bucketName}/`)[1];
    await this.supabaseClient.storage
      .from(this.bucketName)
      .remove([deletePath]);
    return;
  }
  async getSingleFile() {}
}
