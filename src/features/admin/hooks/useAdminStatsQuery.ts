import { useCallback, useState } from 'react';
import type { CategoryStat, RecommendStat, TotalStat } from '../types';
import { ADMIN_ENDPOINTS } from '../api';

export function useAdminStatsQuery() {
  const [bookmark, setBookmark] = useState<CategoryStat[] | null>(null);
  const [filtering, setFiltering] = useState<CategoryStat[] | null>(null);
  const [search, setSearch] = useState<CategoryStat[] | null>(null);
  const [recommend, setRecommend] = useState<RecommendStat[] | null>(null);
  const [membership, setMembership] = useState<CategoryStat[] | null>(null);
  const [total, setTotal] = useState<TotalStat | null>(null);

  const fetchBookmarkStats = useCallback(async () => {
    const res = await fetch(ADMIN_ENDPOINTS.STAT_BOOKMARK);
    const json = await res.json();
    setBookmark(json.data);
  }, []);
  const fetchFilteringStats = useCallback(async () => {
    const res = await fetch(ADMIN_ENDPOINTS.STAT_FILTERING);
    const json = await res.json();
    setFiltering(json.data);
  }, []);
  const fetchSearchStats = useCallback(async () => {
    const res = await fetch(ADMIN_ENDPOINTS.STAT_SEARCH);
    const json = await res.json();
    setSearch(json.data);
  }, []);
  const fetchRecommendStats = useCallback(async () => {
    const res = await fetch(ADMIN_ENDPOINTS.STAT_RECOMMEND);
    const json = await res.json();
    setRecommend(json.data);
  }, []);
  const fetchMembershipStats = useCallback(async () => {
    const res = await fetch(ADMIN_ENDPOINTS.STAT_MEMBERSHIP);
    const json = await res.json();
    setMembership(json.data);
  }, []);
  const fetchTotalStats = useCallback(async () => {
    const res = await fetch(ADMIN_ENDPOINTS.STAT_TOTAL);
    const json = await res.json();
    setTotal(json.data);
  }, []);

  return {
    bookmark, filtering, search, recommend, membership, total,
    fetchBookmarkStats, fetchFilteringStats, fetchSearchStats,
    fetchRecommendStats, fetchMembershipStats, fetchTotalStats,
  };
} 