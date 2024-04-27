import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client.from('deal_of_days').select(
    `
      *,
      products(
        *,
        product_images(*),
        categories(*),
        sub_categories(*),
        product_reviews(*)
      )
    `,
  )

  if (error) {
    throw error
  }

  return data.map((item) => {
    return {
      ...item,
      products: {
        ...item.products,
        thumbnail:
          item.products && item.products.product_images.length > 0
            ? client.storage
                .from('images')
                .getPublicUrl(item.products.product_images[0].url).data
                .publicUrl
            : null,
        average_ratings:
          item
            .products!.product_reviews.map((review) => review.ratings)
            .reduce((a, b) => a + b, 0) /
            item.products!.product_reviews.length || 0,
      },
    }
  })
})
