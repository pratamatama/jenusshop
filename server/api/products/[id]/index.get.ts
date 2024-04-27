import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)

  if (!params.id) {
    throw createError({
      status: 400,
      message: 'Product ID is required',
    })
  }

  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client
    .from('products')
    .select(
      `
        *,
        product_images(*),
        categories(*),
        sub_categories(*),
        product_reviews(*),
        tags(*),
        brand_officials(*),
        product_infos(*)
      `,
    )
    .eq('id', params.id)
    .order('id', {
      referencedTable: 'product_infos',
      ascending: true,
    })
    .single()

  if (error) {
    throw error
  }

  if (!data) {
    throw createError({
      status: 404,
      message: 'Product not found',
    })
  }

  return {
    ...data,
    brand_officials: {
      ...(data.brand_officials || {}),
      logo: data.brand_officials
        ? client.storage.from('images').getPublicUrl(data.brand_officials.logo)
            .data.publicUrl
        : null,
    },
    images: data.product_images!.map((image) => {
      return {
        id: image.id,
        url: client.storage.from('images').getPublicUrl(image.url).data
          .publicUrl,
      }
    }),
    image: data.product_images[0]
      ? client.storage.from('images').getPublicUrl(data.product_images[0]!.url)
          .data.publicUrl
      : null,
    // map and calculate average rating from product_reviews at max 5
    average_ratings:
      data.product_reviews
        ?.slice(0, 5)
        .reduce((acc, review) => acc + review.ratings, 0) / 5,
  }
})
