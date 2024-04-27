import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const params = getQuery(event)

  let query = client
    .from('products')
    .select(
      `
        *,
        product_images(*),
        categories(*),
        sub_categories(*),
        product_reviews(*)
      `,
    )
    .eq('featured', params.featured ?? false)
    .not('published_at', 'is', null)

  if (params.random) query = query.order('id', { ascending: false })
  if (params.featured) query = query.eq('featured', true)
  if (params.discount) query = query.gt('discount', 0)
  if (params.top) query = query.order('sold', { ascending: false })
  if (params.limit) query = query.limit(Number(params.limit))

  const { data, error } = await query.order('id', { ascending: false })

  if (error) {
    throw error
  }

  return data.map((item) => {
    return {
      ...item,
      image: item.product_images[0]
        ? client.storage
            .from('images')
            .getPublicUrl(item.product_images[0]!.url).data.publicUrl
        : null,
      // map and calculate average rating from product_reviews at max 5
      average_ratings:
        item.product_reviews
          .map((review) => review.ratings)
          .reduce((a, b) => a + b, 0) / item.product_reviews.length || 0,
    }
  })
})
