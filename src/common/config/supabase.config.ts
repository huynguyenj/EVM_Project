import { registerAs } from '@nestjs/config';

export default registerAs('supabase_motorbike_bucket', () => ({
  bucket_name: process.env.SUPABASE_BUCKET_NAME ?? '',
  role_key: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  url: process.env.SUPABASE_URL ?? '',
}));
