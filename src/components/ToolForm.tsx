import { useState, useEffect } from 'react';
import { X, Upload, Trash2, Plus } from 'lucide-react';
import { toolsApi, categoriesApi } from '../services/api';
import type { Tool, Category } from '../lib/database.types';
import { useAuth } from '../contexts/AuthContext';

interface ToolFormProps {
  tool?: Tool;
  onClose: () => void;
  onSave: () => void;
}

export const ToolForm = ({ tool, onClose, onSave }: ToolFormProps) => {
  const { owner } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: tool?.name || '',
    description: tool?.description || '',
    category_id: tool?.category_id || '',
    images: tool?.images || [],
    industry_standards: tool?.industry_standards || [],
    is_active: tool?.is_active ?? true,
    video_url: (tool?.specifications as any)?.video_url || '',
  });

  const [newStandard, setNewStandard] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoriesApi.getAll();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (formData.images.length >= 4) {
      setError('You can upload a maximum of 4 images');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      setError(null);
      console.log('Uploading file:', file.name, file.size);
      const imageUrl = await toolsApi.uploadImage(file);
      console.log('Upload success:', imageUrl);
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl],
      });
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const addStandard = () => {
    if (newStandard.trim()) {
      setFormData({
        ...formData,
        industry_standards: [...formData.industry_standards, newStandard.trim()],
      });
      setNewStandard('');
    }
  };

  const removeStandard = (index: number) => {
    setFormData({
      ...formData,
      industry_standards: formData.industry_standards.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!owner) {
      setError('You must be logged in as an owner');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Extract video_url from formData and put it into specifications
      const { video_url, ...rest } = formData;
      const toolData = {
        ...rest,
        owner_id: owner.id,
        specifications: {
          ...(tool?.specifications || {}),
          video_url: video_url,
        },
      };

      const token = localStorage.getItem('admin_token');
      if (!token) throw new Error('No admin token found');

      if (tool) {
        await toolsApi.update(tool.id, toolData, token);
      } else {
        await toolsApi.create(toolData, token);
      }

      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save tool');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-900">
            {tool ? 'Edit Tool' : 'Add New Tool'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tool Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kanex-red focus:border-transparent"
              placeholder="Fire Resistant Gloves"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <input
              list="categories-list"
              type="text"
              required
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kanex-red focus:border-transparent"
              placeholder="Select or type a category"
            />
            <datalist id="categories-list">
              {categories.map((category) => (
                <option key={category.id} value={category.name} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              rows={8}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kanex-red focus:border-transparent resize-none"
              placeholder="Detailed description of the tool..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Video URL (Optional)
            </label>
            <input
              type="url"
              value={formData.video_url}
              onChange={(e) =>
                setFormData({ ...formData, video_url: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kanex-red focus:border-transparent"
              placeholder="https://youtube.com/watch?v=..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter a link to a video demonstrating the product.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images (Max 4)
            </label>
            <div className="grid grid-cols-4 gap-3 mb-3">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={img}
                    alt={`Tool ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/150?text=Error';
                      console.error('Failed to load image:', img);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 p-1 bg-kanex-red text-white rounded-full hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {formData.images.length < 4 && (
                <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-400 rounded-lg hover:border-kanex-red hover:bg-red-50 transition-all cursor-pointer aspect-square flex-col text-center justify-center group">
                  {uploadingImage ? (
                    <div className="w-6 h-6 border-2 border-kanex-red border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-gray-600 group-hover:text-kanex-red transition-colors" />
                      <span className="text-gray-700 font-medium text-xs group-hover:text-kanex-red transition-colors">Upload Image</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              )}
            </div>
            {formData.images.length >= 4 && (
              <p className="text-xs text-amber-600 mt-1">
                Maximum 4 images allowed.
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Max file size: 5MB. Supported formats: JPG, PNG, WebP
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry Standards & Certifications
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newStandard}
                onChange={(e) => setNewStandard(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStandard())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kanex-red focus:border-transparent"
                placeholder="e.g., NFPA 1971, EN 659"
              />
              <button
                type="button"
                onClick={addStandard}
                className="px-4 py-2 bg-kanex-red text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.industry_standards.map((standard, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg"
                >
                  {standard}
                  <button
                    type="button"
                    onClick={() => removeStandard(idx)}
                    className="text-gray-500 hover:text-kanex-red"
                  >
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
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="w-4 h-4 text-kanex-red border-gray-300 rounded focus:ring-kanex-red"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700">
              Active (visible to public)
            </label>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-kanex-red text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="flex-1 px-4 py-2 bg-kanex-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : tool ? 'Update Tool' : 'Create Tool'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
