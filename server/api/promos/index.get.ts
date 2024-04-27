import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client.from('promotions').select('*')

  if (error) {
    throw error
  }

  return data.map((promo) => {
    return {
      ...promo,
      banner: client.storage.from('images').getPublicUrl(promo.banner).data
        .publicUrl,
    }
  })
})
