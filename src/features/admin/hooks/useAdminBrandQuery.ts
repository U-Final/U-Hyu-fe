import { useState, useCallback } from 'react';
import type { AdminBrand, Category } from '../types';
import { ADMIN_ENDPOINTS } from '../api';

export function useAdminCategoryQuery() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const fetchCategories = useCallback(async () => {
    const res = await fetch(ADMIN_ENDPOINTS.CATEGORY_LIST);
    const json = await res.json();
    setCategories(json.data);
  }, []);
  return { categories, fetchCategories };
}

export function useAdminBrandQuery() {
  const [brands, setBrands] = useState<AdminBrand[] | null>(null);
  const [brandResult, setBrandResult] = useState<AdminBrand | { brandId: number } | null>(null);

  const fetchBrands = async () => {
    const res = await fetch(ADMIN_ENDPOINTS.BRAND_LIST);
    const json = await res.json();
    setBrands(json.data);
  };

  const addBrand = async (brand: Omit<AdminBrand, 'brandId'>) => {
    const res = await fetch(ADMIN_ENDPOINTS.BRAND_CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(brand),
    });
    const json = await res.json();
    setBrandResult(json.data);
  };

  const updateBrand = async (brandId: number, data: Partial<AdminBrand>) => {
    const res = await fetch(ADMIN_ENDPOINTS.BRAND_UPDATE(brandId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setBrandResult(json.data);
  };

  const deleteBrand = async (brandId: number) => {
    const res = await fetch(ADMIN_ENDPOINTS.BRAND_DELETE(brandId), { method: 'DELETE' });
    const json = await res.json();
    setBrandResult(json.data);
  };

  return { brands, brandResult, fetchBrands, addBrand, updateBrand, deleteBrand };
} 