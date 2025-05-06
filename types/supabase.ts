export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {
          id: number
          url: string
          title: string
          description: string | null
          path: string
          screenshot_url: string | null
          crawl_time: string
          has_screenshot: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          url: string
          title: string
          description?: string | null
          path: string
          screenshot_url?: string | null
          crawl_time?: string
          has_screenshot?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          url?: string
          title?: string
          description?: string | null
          path?: string
          screenshot_url?: string | null
          crawl_time?: string
          has_screenshot?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      links: {
        Row: {
          id: number
          source_url: string
          target_url: string
          text: string | null
          created_at: string
        }
        Insert: {
          id?: number
          source_url: string
          target_url: string
          text?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          source_url?: string
          target_url?: string
          text?: string | null
          created_at?: string
        }
        Relationships: []
      }
      images: {
        Row: {
          id: number
          url: string
          page_url: string
          alt: string | null
          width: number | null
          height: number | null
          created_at: string
        }
        Insert: {
          id?: number
          url: string
          page_url: string
          alt?: string | null
          width?: number | null
          height?: number | null
          created_at?: string
        }
        Update: {
          id?: number
          url?: string
          page_url?: string
          alt?: string | null
          width?: number | null
          height?: number | null
          created_at?: string
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
}
