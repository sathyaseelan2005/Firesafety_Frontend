import { useState } from 'react';
import { X, Upload, Trash2, Plus } from 'lucide-react';
import type { Product, Category } from '../../types/product';

interface ProductFormProps {
  product?: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
}

export interface ProductFormData {
  name: string;
  sku: string;
  categoryId: string;
  description: string;
  isActive: boolean;
  images: string[];
  industryStandards: string[];
}

export function ProductForm({ product, categories, onClose, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name ?? '',
    sku: product?.sku ?? '',
    categoryId: product?.categoryId ?? '',
    description: product?.description ?? '',
    isActive: product?.isActive ?? true,
    images: product?.images?.length ? product.images : [],
    industryStandards: product?.industryStandards ?? [],
  });
  const [newStandard, setNewStandard] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (formData.images.length >= 4) {
      setError('Maximum 4 images');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setFormData((prev) => ({ ...prev, images: [...prev.images, dataUrl] }));
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addStandard = () => {
    if (newStandard.trim()) {
      setFormData((prev) => ({
        ...prev,
        industryStandards: [...prev.industryStandards, newStandard.trim()],
      }));
      setNewStandard('');
    }
  };

  const removeStandard = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      industryStandards: prev.industryStandards.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-theme-surface rounded-lg shadow-xl max-w-3xl w-full my-8">
        <div className="sticky top-0 bg-theme-surface border-b border-theme-surface-hover px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-bold text-theme-text">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-theme-text-muted hover:text-theme-text transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-2 border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent focus:border-transparent"
              placeholder="Product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">SKU *</label>
            <input
              type="text"
              required
              value={formData.sku}
              onChange={(e) => setFormData((p) => ({ ...p, sku: e.target.value }))}
              className="w-full px-4 py-2 border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent focus:border-transparent"
              placeholder="e.g. KSE-EXT-01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">Category *</label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData((p) => ({ ...p, categoryId: e.target.value }))}
              className="w-full px-4 py-2 border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">Description *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              className="w-full px-4 py-2 border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent focus:border-transparent resize-none"
              placeholder="Product description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-text mb-2">Images (preview only, max 4)</label>
            <div className="grid grid-cols-4 gap-3">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative aspect-square bg-theme-bg rounded-lg overflow-hidden border border-theme-surface-hover">
                  <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 p-1 bg-theme-accent text-white rounded-full hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {formData.images.length < 4 && (
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-theme-surface-hover rounded-lg hover:border-theme-accent cursor-pointer aspect-square text-theme-text-muted hover:text-theme-accent transition-colors">
                  <Upload className="w-6 h-6" />
                  <span className="text-xs">Add image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-theme-text-muted mt-1">Fake Cloudinary placeholder — preview only, no upload.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-text mb-2">Industry standards</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newStandard}
                onChange={(e) => setNewStandard(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStandard())}
                className="flex-1 px-4 py-2 border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent"
                placeholder="e.g. NFPA 1971"
              />
              <button type="button" onClick={addStandard} className="px-4 py-2 bg-theme-accent text-white rounded-lg hover:bg-red-700">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.industryStandards.map((s, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-theme-bg rounded-lg text-sm">
                  {s}
                  <button type="button" onClick={() => removeStandard(idx)} className="text-theme-text-muted hover:text-theme-accent">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.isActive}
              onChange={(e) => setFormData((p) => ({ ...p, isActive: e.target.checked }))}
              className="w-4 h-4 text-theme-accent border-theme-surface-hover rounded focus:ring-theme-accent"
            />
            <label htmlFor="is_active" className="text-sm text-theme-text">
              Active (visible on public site)
            </label>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-theme-accent text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-theme-surface-hover">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-theme-surface-hover text-theme-text rounded-lg hover:bg-theme-surface-hover"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-theme-accent text-white rounded-lg hover:bg-red-700"
            >
              {product ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
