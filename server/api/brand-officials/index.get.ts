import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client.from('brand_officials').select('*')

  if (error) {
    return error
  }

  return data.map((item) => {
    return {
      ...item,
      logo: item.logo
        ? client.storage.from('images').getPublicUrl(item.logo).data.publicUrl
        : null,
    }
  })
})
