// Frontend-only API stubs (no backend)
import type { Tool, Enquiry, Category, ToolWithDetails } from '../lib/database.types';

export const toolsApi = {
  async getAll(category?: string, q?: string, page = 1, limit = 20): Promise<ToolWithDetails[]> {
    // Frontend-only: return empty array
    console.warn('Backend not available - returning empty data');
    return [];
  },

  async getById(id: string): Promise<ToolWithDetails> {
    // Frontend-only: throw error
    throw new Error('Backend not available - cannot fetch product');
  },

  async create(tool: any, token: string): Promise<Tool> {
    throw new Error('Backend not available - cannot create product');
  },

  async update(id: string, tool: any, token: string): Promise<Tool> {
    throw new Error('Backend not available - cannot update product');
  },

  async delete(id: string, token: string) {
    throw new Error('Backend not available - cannot delete product');
  },

  async uploadImage(file: File): Promise<string> {
    throw new Error('Backend not available - cannot upload image');
  },
};

export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    // Frontend-only: return empty array
    console.warn('Backend not available - returning empty data');
    return [];
  },
};

export const enquiriesApi = {
  async submit(enquiry: { tool_id: string; name: string; email: string; phone?: string; message: string }): Promise<Enquiry> {
    throw new Error('Backend not available - cannot submit enquiry');
  },

  async getAll(token?: string): Promise<Enquiry[]> {
    console.warn('Backend not available - returning empty data');
    return [];
  },

  async updateStatus(id: string, status: string, token: string) {
    throw new Error('Backend not available - cannot update enquiry');
  },
};
