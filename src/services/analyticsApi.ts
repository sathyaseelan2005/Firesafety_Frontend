import { API_BASE } from '../config'

export async function recordProductView(productId: number) {
  await fetch(`${API_BASE}/analytics/product-view/${productId}`, {
    method: "POST"
  })
}

export async function recordEnquiryClick(
  productId: number,
  body?: { quantity?: number; option_selected?: string }
) {
  const params = new URLSearchParams()

  if (body?.quantity) params.append("quantity", String(body.quantity))
  if (body?.option_selected) params.append("option_selected", body.option_selected)

  await fetch(`${API_BASE}/analytics/enquiry-click/${productId}?${params}`, {
    method: "POST"
  })
}

export async function getAnalyticsSummary() {
  const res = await fetch(`${API_BASE}/analytics/summary`)
  return res.json()
}