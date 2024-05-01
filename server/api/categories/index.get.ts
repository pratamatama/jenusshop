import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client
    .from('categories')
    .select('*, products(*), sub_categories(*)')

  if (error) {
    throw error
  }

  return data.map((category) => {
    return {
      ...category,
      image: client.storage.from('images').getPublicUrl(category.image).data
        .publicUrl,
    }
  })
})
