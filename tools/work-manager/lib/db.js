import 'server-only';
import postgres from 'postgres';
let connection;
export function db() {
  if(!process.env.DATABASE_URL) throw new Error('STORAGE_NOT_CONFIGURED');
  return connection ||= postgres(process.env.DATABASE_URL,{max:1,idle_timeout:20,connect_timeout:10,prepare:false});
}
export function serialize(row) { return {...row.data,id:row.id,revision:row.revision,archived:row.archived,updatedAt:row.updated_at}; }
