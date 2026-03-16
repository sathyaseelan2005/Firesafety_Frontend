import { useState, useEffect } from 'react';
import { X, Upload, Trash2, Plus, ArrowLeft } from 'lucide-react';
//import { toolsApi, categoriesApi } from '../services/api';
import { categoriesApi } from '../services/api';
import type { Tool, Category } from '../lib/database.types';
import { useAuth } from '../contexts/AuthContext';
import { createProduct, uploadProductImage } from "../services/productsApi";


interface AddToolPageProps {
    onBack: () => void;
    onSave?: () => void;
    initialTool?: Tool;
}

export const AddToolPage = ({ onBack, onSave, initialTool }: AddToolPageProps) => {
    const { owner } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [formData, setFormData] = useState({
        name: initialTool?.name || '',
        description: initialTool?.description || '',
        category_id: initialTool?.category_id || '',
        images: [] as File[],
        industry_standards: initialTool?.industry_standards || [],
        is_active: initialTool?.is_active ?? true,
        video_url: (initialTool?.specifications as any)?.video_url || '',
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        setFormData({
            ...formData,
            images: [...formData.images, file],
        });
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
            const token = localStorage.getItem("admin_token");
            if (!token) throw new Error("No admin token found");

            const product = await createProduct(
                {
                    name: formData.name,
                    sku: formData.name.replace(/\s+/g, "-").toUpperCase(),
                    category: String(formData.category_id),
                    description: formData.description
                },
                token
            );

            // Upload first image if exists
            if (formData.images.length > 0) {
                await uploadProductImage(product.id, formData.images[0], token);
            }

            if (onSave) onSave();
            onBack();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save tool');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-theme-bg py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-theme-surface-hover rounded-full transition-colors text-theme-text-muted hover:text-theme-text"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold text-theme-text">
                            {initialTool ? 'Edit Tool' : 'Add New Tool'}
                        </h1>
                    </div>
                </div>

                <div className="bg-theme-surface rounded-xl shadow-xl border border-theme-surface-hover">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-theme-text-muted mb-2">
                                Tool Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent transition-all placeholder-gray-600"
                                placeholder="Fire Resistant Gloves"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-theme-text-muted mb-2">
                                Category *
                            </label>
                            <select
                                required
                                value={formData.category_id}
                                onChange={(e) =>
                                    setFormData({ ...formData, category_id: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent transition-all appearance-none"
                            >
                                <option value="" className="bg-theme-bg">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id} className="bg-theme-bg">
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-theme-text-muted mb-2">
                                Description *
                            </label>
                            <textarea
                                required
                                rows={8}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent transition-all resize-none placeholder-gray-600"
                                placeholder="Detailed description of the tool..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-theme-text-muted mb-2">
                                Product Video URL (Optional)
                            </label>
                            <input
                                type="url"
                                value={formData.video_url}
                                onChange={(e) =>
                                    setFormData({ ...formData, video_url: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent transition-all placeholder-gray-600"
                                placeholder="https://youtube.com/watch?v=..."
                            />
                            <p className="text-xs text-theme-text-muted mt-2">
                                Enter a link to a video demonstrating the product.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-theme-text-muted mb-3">
                                Images (Max 4)
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
                                {formData.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square group">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`Tool ${idx + 1}`}
                                            className="w-full h-full object-cover rounded-lg border border-theme-surface-hover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="p-2 bg-red-600/90 text-white rounded-full hover:bg-red-600 transition-colors transform scale-90 group-hover:scale-100 duration-200"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {formData.images.length < 4 && (
                                    <label className="flex flex-col items-center justify-center gap-3 px-4 py-4 bg-theme-bg border-2 border-dashed border-theme-surface-hover rounded-lg hover:border-theme-accent hover:bg-theme-surface-hover/50 transition-all cursor-pointer aspect-square group">
                                        {uploadingImage ? (
                                            <div className="w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <div className="p-3 bg-theme-surface rounded-full group-hover:bg-theme-bg transition-colors">
                                                    <Upload className="w-6 h-6 text-theme-text-muted group-hover:text-theme-accent transition-colors" />
                                                </div>
                                                <span className="text-sm font-medium text-theme-text-muted group-hover:text-theme-text transition-colors">Upload</span>
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
                                <p className="text-sm text-amber-500 mt-2 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                    Maximum 4 images allowed
                                </p>
                            )}
                            <p className="text-xs text-theme-text-muted mt-2">
                                Max file size: 5MB. Supported formats: JPG, PNG, WebP
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-theme-text-muted mb-2">
                                Industry Standards & Certifications
                            </label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={newStandard}
                                    onChange={(e) => setNewStandard(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStandard())}
                                    className="flex-1 px-4 py-3 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent transition-all placeholder-gray-600"
                                    placeholder="e.g., NFPA 1971, EN 659"
                                />
                                <button
                                    type="button"
                                    onClick={addStandard}
                                    className="px-6 py-3 bg-theme-accent text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-lg shadow-theme-accent/20"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.industry_standards.map((standard, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-theme-bg border border-theme-surface-hover text-theme-text rounded-md text-sm group hover:border-theme-text-muted transition-colors"
                                    >
                                        {standard}
                                        <button
                                            type="button"
                                            onClick={() => removeStandard(idx)}
                                            className="text-theme-text-muted hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-theme-bg rounded-lg border border-theme-surface-hover">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={(e) =>
                                    setFormData({ ...formData, is_active: e.target.checked })
                                }
                                className="w-5 h-5 text-theme-accent bg-theme-surface border-theme-surface-hover rounded focus:ring-theme-accent focus:ring-offset-theme-bg"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-theme-text cursor-pointer select-none">
                                Active (visible to public)
                            </label>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-4 pt-6 mt-6 border-t border-theme-surface-hover">
                            <button
                                type="button"
                                onClick={onBack}
                                className="flex-1 px-6 py-3 border border-theme-surface-hover text-theme-text rounded-lg hover:bg-theme-surface-hover transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || uploadingImage}
                                className="flex-1 px-6 py-3 bg-theme-accent text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-theme-accent/20 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : initialTool ? 'Update Tool' : 'Create Tool'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
