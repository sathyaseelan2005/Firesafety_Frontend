import { MessageCircle } from 'lucide-react'
import { recordEnquiryClick } from '../../services/analyticsApi'

const WHATSAPP_NUMBER = '919361149490'

interface WhatsAppButtonProps {
  productName: string
  productId: string
  className?: string
}

export function WhatsAppButton({ productName, productId, className = '' }: WhatsAppButtonProps) {

  const text = encodeURIComponent(`Enquiry for ${productName}`)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`

  const handleClick = () => {
    recordEnquiryClick(Number(productId))
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] text-white font-medium rounded-lg hover:bg-[#20BD5A] transition-colors shadow-md ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      Enquiry via WhatsApp
    </button>
  )
}