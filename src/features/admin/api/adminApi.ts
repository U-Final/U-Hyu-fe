import type { CategoryStat, AdminBrand } from '../types';

export async function getAdminCategories(): Promise<CategoryStat[]> {
  const res = await fetch('/admin/categories');
  const json = await res.json();
  return json.data;
}

export async function getAdminBrands(): Promise<AdminBrand[]> {
  const res = await fetch('/admin/brand/list');
  const json = await res.json();
  return json.data;
}

export async function postAdminBrand(data: Omit<AdminBrand, 'brandId'>): Promise<AdminBrand> {
  const res = await fetch('/admin/brand', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.data;
}

export async function putAdminBrand(brandId: number, data: Partial<AdminBrand>): Promise<AdminBrand> {
  const res = await fetch(`/admin/brands/${brandId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.data;
}

export async function deleteAdminBrand(brandId: number): Promise<{ brandId: number }> {
  const res = await fetch(`/admin/brands/${brandId}`, { method: 'DELETE' });
  const json = await res.json();
  return json.data;
} 