export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      brand_officials: {
        Row: {
          created_at: string
          id: number
          logo: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          logo: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          logo?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          id: number
          image: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          image: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          image?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      deal_of_days: {
        Row: {
          created_at: string
          discount: number
          expired_at: string
          id: number
          product_id: number
          published_at: string | null
        }
        Insert: {
          created_at?: string
          discount: number
          expired_at: string
          id?: number
          product_id: number
          published_at?: string | null
        }
        Update: {
          created_at?: string
          discount?: number
          expired_at?: string
          id?: number
          product_id?: number
          published_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'deal_of_days_product_id_fkey'
            columns: ['product_id']
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
        ]
      }
      marketplaces: {
        Row: {
          created_at: string
          icon_url: string
          id: number
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon_url: string
          id?: number
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon_url?: string
          id?: number
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          created_at: string
          id: number
          is_thumbnail: boolean
          product_id: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_thumbnail?: boolean
          product_id: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          is_thumbnail?: boolean
          product_id?: number
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: 'product_images_product_id_fkey'
            columns: ['product_id']
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
        ]
      }
      product_infos: {
        Row: {
          created_at: string
          id: number
          info: string
          label: string
          product_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          info: string
          label: string
          product_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          info?: string
          label?: string
          product_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'product_infos_product_id_fkey'
            columns: ['product_id']
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
        ]
      }
      product_marketplaces: {
        Row: {
          click: number
          created_at: string
          id: number
          link: string
          marketplace_id: number
          updated_at: string
        }
        Insert: {
          click?: number
          created_at?: string
          id?: number
          link: string
          marketplace_id: number
          updated_at?: string
        }
        Update: {
          click?: number
          created_at?: string
          id?: number
          link?: string
          marketplace_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'product_marketplaces_marketplace_id_fkey'
            columns: ['marketplace_id']
            referencedRelation: 'marketplaces'
            referencedColumns: ['id']
          },
        ]
      }
      product_reviews: {
        Row: {
          created_at: string
          id: number
          product_id: number
          ratings: number
          review: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          ratings?: number
          review: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          ratings?: number
          review?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'product_reviews_product_id_fkey'
            columns: ['product_id']
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'product_reviews_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      product_tags: {
        Row: {
          id: number
          product_id: number
          tag_id: number
        }
        Insert: {
          id?: number
          product_id: number
          tag_id: number
        }
        Update: {
          id?: number
          product_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'product_tags_product_id_fkey'
            columns: ['product_id']
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'product_tags_tag_id_fkey'
            columns: ['tag_id']
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
        ]
      }
      products: {
        Row: {
          brand_official_id: number | null
          category_id: number
          created_at: string
          description: string
          discount: number
          featured: boolean
          id: number
          name: string
          price: number
          published_at: string | null
          sku: string
          slug: string
          sold: number
          stock: number
          sub_category_id: number
          updated_at: string
        }
        Insert: {
          brand_official_id?: number | null
          category_id: number
          created_at?: string
          description: string
          discount?: number
          featured?: boolean
          id?: number
          name: string
          price: number
          published_at?: string | null
          sku: string
          slug: string
          sold?: number
          stock?: number
          sub_category_id: number
          updated_at?: string
        }
        Update: {
          brand_official_id?: number | null
          category_id?: number
          created_at?: string
          description?: string
          discount?: number
          featured?: boolean
          id?: number
          name?: string
          price?: number
          published_at?: string | null
          sku?: string
          slug?: string
          sold?: number
          stock?: number
          sub_category_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'products_brand_official_id_fkey'
            columns: ['brand_official_id']
            referencedRelation: 'brand_officials'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'products_category_id_fkey'
            columns: ['category_id']
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'products_sub_category_id_fkey'
            columns: ['sub_category_id']
            referencedRelation: 'sub_categories'
            referencedColumns: ['id']
          },
        ]
      }
      promotions: {
        Row: {
          banner: string
          created_at: string
          description: string
          id: number
          slug: string
          title: string
          tnc: string
          updated_at: string
        }
        Insert: {
          banner: string
          created_at?: string
          description: string
          id?: number
          slug: string
          title: string
          tnc: string
          updated_at?: string
        }
        Update: {
          banner?: string
          created_at?: string
          description?: string
          id?: number
          slug?: string
          title?: string
          tnc?: string
          updated_at?: string
        }
        Relationships: []
      }
      sub_categories: {
        Row: {
          category_id: number
          created_at: string
          id: number
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          category_id: number
          created_at?: string
          id?: number
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          category_id?: number
          created_at?: string
          id?: number
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sub_categories_category_id_fkey'
            columns: ['category_id']
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'buckets_owner_fkey'
            columns: ['owner']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey'
            columns: ['bucket_id']
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
