import type { Product } from '../types/product';

export const productsMock: Product[] = [
  {
    id: 'prod-1',
    name: 'Industrial Fire Extinguisher 5kg',
    description:
      'ABC dry powder fire extinguisher suitable for Class A, B, C fires. Ideal for offices, warehouses and industrial use. ISI marked.',
    sku: 'KSE-EXT-5KG',
    categoryId: 'cat-1',
    images: ['/images/cylinder-1.webp'],
    isActive: true,
    industryStandards: ['ISI', 'EN 3'],
  },
  {
    id: 'prod-2',
    name: 'Heat Resistant Safety Gloves',
    description:
      'Heavy-duty gloves for handling hot surfaces and welding. Kevlar lining, excellent grip.',
    sku: 'KSE-GLV-HR',
    categoryId: 'cat-2',
    images: ['/images/gloves-1.jpg'],
    isActive: true,
    industryStandards: ['EN 659', 'NFPA 1971'],
  },
  {
    id: 'prod-3',
    name: 'Firefighter Helmet',
    description:
      'Lightweight firefighting helmet with face shield and adjustable headband. Meets international safety standards.',
    sku: 'KSE-HLM-01',
    categoryId: 'cat-3',
    images: ['/images/helmet-1.webp'],
    isActive: true,
    industryStandards: ['EN 443', 'NFPA 1972'],
  },
  {
    id: 'prod-4',
    name: 'Cut Resistant Hand Gloves',
    description:
      'High-performance cut resistant hand gloves suitable for industrial handling, metal works, and construction sites.',
    sku: 'KSE-GLV-CR',
    categoryId: 'cat-2',
    images: ['/images/gloves-2.avif'],
    isActive: true,
    industryStandards: ['EN 388', 'ANSI Cut Level A4'],
  },
  {
    id: 'prod-5',
    name: 'Personal Protection Equipment Kit',
    description:
      'Complete PPE kit including helmet, gloves, safety goggles, and mask. Designed for industrial and construction safety.',
    sku: 'KSE-PPE-KIT',
    categoryId: 'cat-4',
    images: ['/images/ppe-kit.webp'],
    isActive: false,
    industryStandards: ['IS 2925', 'EN 166', 'EN 397'],
  },
  {
    id: 'prod-6',
    name: 'Industrial Safety Shoe / Gum Boot',
    description:
      'Heavy-duty safety shoe with steel toe cap and slip-resistant sole. Suitable for wet, oily, and industrial environments.',
    sku: 'KSE-SHOE-GB',
    categoryId: 'cat-5',
    images: ['/images/boot-1.jpeg'],
    isActive: true,
    industryStandards: ['IS 15298', 'EN ISO 20345'],
  },
  {
    id: 'prod-7',
    name: 'High Visibility Safety Vest',
    description:
      'Fluorescent safety vest with reflective strips for enhanced visibility in low-light and hazardous environments.',
    sku: 'KSE-VEST-HV',
    categoryId: 'cat-6',
    images: ['/images/vest-1.jpeg'],
    isActive: true,
    industryStandards: ['EN ISO 20471', 'ANSI/ISEA 107'],
  },
  {
    id: 'prod-8',
    name: 'Protective Face Mask',
    description:
      'Multi-layer protective face mask suitable for industrial dust, smoke, and airborne particles.',
    sku: 'KSE-MASK-FP',
    categoryId: 'cat-7',
    images: ['/images/mask-1.jpeg'],
    isActive: true,
    industryStandards: ['IS 9473', 'EN 149'],
  },
  {
    id: 'prod-9',
    name: 'Fire Cylinder 10kg ABC Type',
    description:
      'ABC dry powder fire cylinder designed for industrial, commercial, and warehouse fire safety applications.',
    sku: 'KSE-EXT-10KG',
    categoryId: 'cat-1',
    images: ['/images/cylinder-2.jpeg'],
    isActive: true,
    industryStandards: ['ISI', 'EN 3', 'NFPA 10'],
  },
];
