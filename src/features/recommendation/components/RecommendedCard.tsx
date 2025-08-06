import { useState } from 'react';

import { useMapUIContext } from '@kakao-map/context/MapUIContext';
import { useMapStore } from '@kakao-map/store/MapStore';
import type { Store } from '@kakao-map/types/store';
import { PATH } from '@paths';
import ConfirmExcludeModalContent from '@recommendation/components/ConfirmExcludeModalContent';
import { Gift, Info, Star, ThumbsDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { BrandCard } from '@/shared/components';
import { useModalStore } from '@/shared/store';

export interface RecommendedStoreCardProps {
  store: Store;
  autoCloseBottomSheet?: boolean; // 바텀시트 자동 닫기 여부 (기본값: false)
}

// 텍스트 길이 제한 상수
const TEXT_LIMITS = {
  storeName: 20,
  address: 35,
  benefit: 45,
};

// 축약된 텍스트를 반환하는 헬퍼 함수
const getTruncatedText = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const RecommendedStoreCard = ({
  store,
  autoCloseBottomSheet = false,
}: RecommendedStoreCardProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const selectStore = useMapStore(state => state.selectStore);
  const setMapCenter = useMapStore(state => state.setMapCenter);
  const { bottomSheetRef } = useMapUIContext();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!store.addressDetail) {
      if (store.brandName) {
        const query = encodeURIComponent(store.brandName);
        navigate(`${PATH.BENEFIT}?brand_name=${query}`);
      }
      return;
    }

    // 전역 상태에 선택된 매장 설정 (지도 포커스용)
    selectStore(store);

    // 지도 중심을 해당 매장으로 이동
    setMapCenter({ lat: store.latitude, lng: store.longitude });

    // 바텀시트 자동 닫기 (옵션)
    if (autoCloseBottomSheet && bottomSheetRef && bottomSheetRef.current) {
      bottomSheetRef.current.setExplicitlyClosed(true);
      bottomSheetRef.current.close();
    }
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setShowInfo(!showInfo);
  };

  const handleDislikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (!store.brandId) {
      toast.error('추천 매장을 찾을 수 없습니다.');
      return;
    }

    openModal('base', {
      title: '앞으로 이 브랜드는 추천에서 제외 됩니다.',
      children: (
        <ConfirmExcludeModalContent
          brandId={store.brandId}
          brandName={store.brandName}
        />
      ),
    });
    setShowInfo(false);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] rounded-xl"
    >
      <div className="relative pt-2 pb-0">
        {/* 추천 배지 */}
        <div className="absolute -top-1 right-4 z-10">
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold">추천</span>
          </div>
        </div>

        {/* 정보 표시 오버레이 */}
        {showInfo && (
          <div
            className="absolute inset-0 bg-black/10 rounded-xl z-20 flex items-center justify-center mt-2"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 mx-4 border border-gray-200 shadow-lg">
              <p className="text-sm text-gray-700 text-center mb-2">
                이 매장을 추천에서 제외하시겠습니까?
              </p>
              <p className="text-xs text-gray-500 text-center">
                오른쪽 상단의 👎 버튼을 눌러주세요
              </p>
            </div>
          </div>
        )}

        <BrandCard logoUrl={store.logoImage}>
          <div className="flex items-start w-full relative">
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              {/* 매장명 */}
              <div className="flex items-center gap-2">
                <h3 className="text-black text-lg font-bold hover:text-primary transition-colors">
                  {getTruncatedText(
                    store.storeName || '',
                    TEXT_LIMITS.storeName
                  )}
                </h3>
              </div>

              {/* 주소 */}
              {/* {store.addressDetail && (
                <p className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{getTruncatedText(store.addressDetail || '', TEXT_LIMITS.address)}</span>
                </p>
              )} */}

              {/* 혜택 정보 - StoreDetailCard 스타일과 일관성 */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                {/* 혜택 헤더 */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-800">
                      추천 혜택
                    </span>
                  </div>
                </div>

                {/* 혜택 내용 */}
                <div className="p-3">
                  <p className="text-gray-700 font-medium text-sm leading-relaxed">
                    {getTruncatedText(store.benefit || '', TEXT_LIMITS.benefit)}
                  </p>
                </div>
              </div>
            </div>

            {/* 정보 버튼 */}
            <button
              onClick={handleInfoClick}
              onTouchEnd={e => {
                e.preventDefault();
                e.stopPropagation();
                if (e.nativeEvent) {
                  e.nativeEvent.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }
                setShowInfo(!showInfo);
              }}
              className="absolute -top-0 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 flex-shrink-0 border border-gray-200 z-30"
            >
              {showInfo ? (
                <X className="w-4 h-4 text-gray-500 hover:text-gray-700 transition-colors" />
              ) : (
                <Info className="w-4 h-4 text-gray-500 hover:text-blue-500 transition-colors" />
              )}
            </button>

            {/* 제외 버튼 - 정보 모드일 때만 표시 */}
            {showInfo && (
              <button
                onClick={handleDislikeClick}
                onTouchEnd={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.nativeEvent) {
                    e.nativeEvent.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  }
                  if (!store.brandId) {
                    toast.error('추천 매장을 찾을 수 없습니다.');
                    return;
                  }
                  openModal('base', {
                    title: '앞으로 이 브랜드는 추천에서 제외 됩니다.',
                    children: (
                      <ConfirmExcludeModalContent
                        brandId={store.brandId}
                        brandName={store.brandName}
                      />
                    ),
                  });
                  setShowInfo(false);
                }}
                className="absolute -top-0 right-11 p-1.5 rounded-full bg-red-50 hover:bg-red-100 shadow-sm hover:shadow-md transition-all duration-200 flex-shrink-0 border border-red-200 z-30"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <ThumbsDown
                  className="w-4 h-4 text-red-500 hover:text-red-600 transition-colors"
                  aria-label="추천 제외"
                />
              </button>
            )}
          </div>
        </BrandCard>
      </div>
    </div>
  );
};

export default RecommendedStoreCard;
