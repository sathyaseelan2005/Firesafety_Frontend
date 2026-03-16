import { useEffect, useState } from 'react';
import { API_BASE } from '../config';
import { useAuth } from '../contexts/AuthContext';
import {
  Star,
  X,
} from 'lucide-react';
import { toolsApi } from '../services/api';
import { ContactModal } from '../components/ContactModal';
import type { ToolWithDetails } from '../lib/database.types';
import { getImageUrl } from '../lib/supabase';
import { useAnalytics } from '../contexts/AnalyticsContext';

interface ToolDetailsProps {
  toolId: string;
  onBack: () => void;
}



export const ToolDetails = ({ toolId, onBack }: ToolDetailsProps) => {
  const [tool, setTool] = useState<ToolWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeModalTab, setActiveModalTab] = useState<'images' | 'videos'>('images');
  const [quantity, setQuantity] = useState(1);
  const { user, userType } = useAuth();
  const { recordProductView } = useAnalytics();
  useEffect(() => {
  if (!toolId) return;

  recordProductView(toolId); // ← KEEP STRING ID
}, [toolId]);

  const handleContactClick = () => {
    if (user && userType === 'customer') {
      setShowContactModal(true);
    } else {
      // Redirect to customer login if not logged in as customer
      window.location.hash = 'customer-login';
    }
  };

  const loadTool = async () => {
    try {
      setLoading(true);
      const data = await toolsApi.getById(toolId);
      setTool(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tool details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error || 'Tool not found'}</p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images = tool.images?.length
    ? tool.images.map((img) => getImageUrl(img))
    : ['https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg?auto=compress&cs=tinysrgb&w=800'];

  // Calculate discount percentage if MRP exists
  const discountPercentage = tool.mrp ? Math.round(((tool.mrp - tool.price) / tool.mrp) * 100) : 0;

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text font-sans">
      {/* Breadcrumb-ish Header */}
      <div className="bg-theme-surface py-2 px-4 shadow-sm mb-4 border-b border-theme-surface-hover">
        <div className="container mx-auto max-w-[1500px] flex items-center text-xs text-theme-text-muted gap-1">
          <button onClick={() => window.location.hash = 'home'} className="hover:text-theme-accent hover:underline">Home</button>
          <span>›</span>
          <button onClick={() => window.location.hash = 'products'} className="hover:text-theme-accent hover:underline">Products</button>
          <span>›</span>
          <span className="font-bold text-theme-accent">{tool.category ? (typeof tool.category === 'string' ? tool.category : tool.category?.name || 'Category') : 'Product'}</span>
        </div>
      </div>

      <div className="container mx-auto max-w-[1500px] px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Column: Images */}
          <div className="lg:w-[40%] flex">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 mr-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setSelectedImage(idx)}
                  className={`w-[48px] h-[48px] border rounded-md overflow-hidden bg-white ${selectedImage === idx ? 'border-theme-accent shadow-[0_0_0_1px_#ef4444]' : 'border-gray-300'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div
              className="flex-1 flex items-center justify-center p-4 bg-white rounded-lg border border-theme-surface-hover/20 h-[600px] w-full cursor-zoom-in"
              onClick={() => setShowImageModal(true)}
            >
              <img
                src={images[selectedImage]}
                alt={tool.name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Center Column: Product Details */}
          <div className="lg:w-[40%]">
            <h1 className="text-2xl font-medium text-theme-text mb-1 leading-snug">
              {tool.name}
            </h1>

            <div className="text-sm text-theme-accent mb-2 hover:underline cursor-pointer">
              Brand: {tool.owner?.company_name || (tool.owner as any)?.companyName || 'Unknown Brand'}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-theme-text font-medium">{tool.rating || 5} out of 5</span>
              <div className="flex items-center text-yellow-500 text-sm">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(tool.rating || 5) ? "#F3A847" : "none"} strokeWidth={0} className={i < Math.floor(tool.rating || 5) ? "" : "stroke-theme-text-muted"} />
                ))}
              </div>
              <span className="text-theme-accent text-sm hover:underline cursor-pointer">{tool.reviewsCount || 53} ratings</span>
            </div>

            <div className="border-t border-b border-theme-surface-hover py-4 mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-theme-accent text-[26px] font-thin">- {discountPercentage}%</span>
                <span className="flex items-start">
                  <span className="text-xs relative top-[4px] font-medium">₹</span>
                  <span className="text-[28px] font-medium leading-none">{tool.price.toLocaleString('en-IN')}</span>
                </span>
              </div>
              {tool.mrp && (
                <div className="text-theme-text-muted text-sm mb-2">
                  M.R.P.: <span className="line-through">₹{tool.mrp.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="text-theme-text font-medium text-sm">Inclusive of all taxes</div>
            </div>



            {/* Product Facts/Dimensions */}
            <div className="grid grid-cols-2 gap-y-2 text-sm text-theme-text mb-6">
              {tool.size && (
                <div className="contents">
                  <span className="font-bold text-theme-text-muted">Size</span>
                  <span>{tool.size}</span>
                </div>
              )}
              {tool.dimensions?.height && (
                <div className="contents">
                  <span className="font-bold text-theme-text-muted">Height</span>
                  <span>{tool.dimensions.height}</span>
                </div>
              )}
              {tool.dimensions?.length && (
                <div className="contents">
                  <span className="font-bold text-theme-text-muted">Length</span>
                  <span>{tool.dimensions.length}</span>
                </div>
              )}
              {tool.dimensions?.width && (
                <div className="contents">
                  <span className="font-bold text-theme-text-muted">Width</span>
                  <span>{tool.dimensions.width}</span>
                </div>
              )}
              {tool.dimensions?.weight && (
                <div className="contents">
                  <span className="font-bold text-theme-text-muted">Weight</span>
                  <span>{tool.dimensions.weight}</span>
                </div>
              )}
              <div className="contents">
                <span className="font-bold text-theme-text-muted">Brand</span>
                <span>{tool.owner?.company_name || (tool.owner as any)?.companyName || 'Unknown Brand'}</span>
              </div>
            </div>

            <div className="border-t border-theme-surface-hover pt-4">
              <h3 className="font-bold text-lg mb-2 text-theme-text">About this item</h3>
              <ul className="list-disc list-outside ml-5 text-sm space-y-1 text-theme-text-muted">
                {tool.description && tool.description.split('. ').map((desc, i) => (
                  desc.trim() && <li key={i}>{desc.trim()}</li>
                ))}
                <li>High quality fire safety equipment required for industry standards.</li>
                <li>Certified by top safety organizations.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Buy Box */}
          <div className="lg:w-[20%]">
            <div className="border border-theme-surface-hover rounded-lg p-4 shadow-sm bg-theme-surface">
              <div className="text-2xl font-medium mb-2 text-theme-text">
                <span className="text-sm align-top relative top-[2px]">₹</span>
                {tool.price.toLocaleString('en-IN')}
              </div>

              <div className="text-[18px] text-green-500 font-medium mb-4 mt-4">
                In stock
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-theme-text">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="bg-theme-bg border border-theme-surface-hover rounded-md px-2 py-1 text-sm shadow-sm focus:ring-2 focus:ring-theme-accent outline-none text-theme-text"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                <button
                  onClick={handleContactClick}
                  className="w-full bg-[#ef4444] hover:bg-[#dc2626] border border-[#dc2626] rounded-full py-2 text-sm text-white shadow-sm font-medium transition-colors"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleContactClick}
                  className="w-full bg-[#b91c1c] hover:bg-[#991b1b] border border-[#991b1b] rounded-full py-2 text-sm text-white shadow-sm font-medium transition-colors"
                >
                  Buy Now
                </button>
              </div>

              <div className="mt-4 text-xs text-theme-text-muted space-y-1">
                <div className="grid grid-cols-2">
                  <span className="text-gray-500">Sold by</span>
                  <span className="text-theme-accent truncate hover:underline cursor-pointer">{tool.owner?.company_name || (tool.owner as any)?.companyName || 'Unknown Brand'}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {showContactModal && tool.owner && (
        <ContactModal
          toolId={tool.id}
          toolName={tool.name}
          ownerCompany={tool.owner?.company_name || (tool.owner as any)?.companyName || 'Unknown Brand'}
          onClose={() => setShowContactModal(false)}
          initialData={user ? { name: user.name, email: user.email } : undefined}
        />
      )}

      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveModalTab('videos')}
                className={`font-semibold tracking-wide text-sm uppercase pb-4 -mb-4.5 ${activeModalTab === 'videos' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Videos
              </button>
              <button
                onClick={() => setActiveModalTab('images')}
                className={`font-semibold tracking-wide text-sm uppercase pb-4 -mb-4.5 ${activeModalTab === 'images' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Images
              </button>
            </div>
            <button
              onClick={() => setShowImageModal(false)}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 flex overflow-hidden bg-white">
            {/* Main Content View */}
            <div className="flex-1 p-8 flex items-center justify-center bg-white">
              {activeModalTab === 'videos' ? (
                (tool.specifications as any)?.video_url ? (
                  <div className="w-full h-full flex items-center justify-center">
                    {(() => {
                      const vidUrl = (tool.specifications as any)?.video_url || '';
                      const isYoutube = vidUrl.includes('youtube.com') || vidUrl.includes('youtu.be');
                      let embedUrl = vidUrl;
                      if (isYoutube) {
                        const videoId = vidUrl.split('v=')[1]?.split('&')[0] || vidUrl.split('/').pop();
                        embedUrl = `https://www.youtube.com/embed/${videoId}`;
                      }
                      return isYoutube ? (
                        <iframe
                          width="100%"
                          height="100%"
                          src={embedUrl}
                          title="Product Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="max-w-4xl max-h-full aspect-video"
                        ></iframe>
                      ) : (
                        <video controls className="max-w-full max-h-full">
                          <source src={vidUrl} />
                          Your browser does not support the video tag.
                        </video>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-gray-500 flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </div>
                    <p>No video available for this product</p>
                  </div>
                )
              ) : (
                <img
                  src={images[selectedImage]}
                  alt={tool.name}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            {/* Right Sidebar */}
            <div className="w-[350px] bg-white p-6 border-l border-gray-200 overflow-y-auto">
              <h2 className="text-xl font-medium text-gray-900 mb-2 leading-snug">{tool.name}</h2>
              {tool.size && (
                <p className="text-sm text-gray-500 mb-6 font-medium">Size: {tool.size}</p>
              )}

              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => {
                      setSelectedImage(idx);
                      if (activeModalTab === 'videos') setActiveModalTab('images');
                    }}
                    onClick={() => {
                      setSelectedImage(idx);
                      setActiveModalTab('images');
                    }}
                    className={`aspect-square border rounded-md overflow-hidden bg-white p-1 ${selectedImage === idx && activeModalTab === 'images' ? 'border-red-600 shadow-[0_0_0_1px_#dc2626]' : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


