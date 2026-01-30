export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          slug?: string;
          created_at?: string;
        };
      };
      owners: {
        Row: {
          id: string;
          user_id: string | null;
          company_name: string;
          contact_person: string;
          email: string;
          phone: string;
          address: string;
          website: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          company_name: string;
          contact_person: string;
          email: string;
          phone?: string;
          address?: string;
          website?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          company_name?: string;
          contact_person?: string;
          email?: string;
          phone?: string;
          address?: string;
          website?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tools: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          category_id: string | null;
          owner_id: string;
          images: string[];
          specifications: Record<string, unknown>;
          industry_standards: string[];
          is_active: boolean;
          mrp?: number;
          rating?: number;
          reviewsCount?: number;
          size?: string;
          dimensions?: {
            height?: string;
            length?: string;
            width?: string;
            weight?: string;
          };
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price?: number;
          category_id?: string | null;
          owner_id: string;
          images?: string[];
          specifications?: Record<string, unknown>;
          industry_standards?: string[];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          dimensions?: {
            height?: string;
            length?: string;
            width?: string;
            weight?: string;
          };
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          category_id?: string | null;
          owner_id?: string;
          images?: string[];
          specifications?: Record<string, unknown>;
          industry_standards: string[];
          is_active: boolean;
          mrp?: number;
          rating?: number;
          reviewsCount?: number;
          size?: string;
          created_at: string;
          updated_at: string;
          dimensions?: {
            height?: string;
            length?: string;
            width?: string;
            weight?: string;
          };
        };
      };
      enquiries: {
        Row: {
          id: string;
          tool_id: string;
          name: string;
          email: string;
          phone: string;
          message: string;
          status: 'new' | 'read' | 'responded';
          created_at: string;
        };
        Insert: {
          id?: string;
          tool_id: string;
          name: string;
          email: string;
          phone?: string;
          message: string;
          status?: 'new' | 'read' | 'responded';
          created_at?: string;
        };
        Update: {
          id?: string;
          tool_id?: string;
          name?: string;
          email?: string;
          phone?: string;
          message?: string;
          status?: 'new' | 'read' | 'responded';
          created_at?: string;
        };
      };
    };
  };
}

export type Category = Database['public']['Tables']['categories']['Row'];
export type Owner = Database['public']['Tables']['owners']['Row'];
export type Tool = Database['public']['Tables']['tools']['Row'];
export type Enquiry = Database['public']['Tables']['enquiries']['Row'];

export interface ToolWithDetails extends Tool {
  category: Category | string | null;
  owner: Owner | any;
}
