import { useState, useEffect } from 'react';
import useKakaoLoader from '@/features/kakao-map/hooks/useKakaoLoader';
import LocationButton from '@/features/kakao-map/components/LocationButton';
import MapWithMarkers from '@/features/kakao-map/components/MapWithMarkers';
import MapTopControls from '@/features/kakao-map/components/MapTopControls';
import { PersistentBottomSheet } from '@features/kakao-map/components/PersistentBottomSheet';
import StoreListContent from '@/features/kakao-map/components/StoreListContent';
import CategorySelectContent from '@features/kakao-map/components/steps/CategorySelectContent';
import BrandSelectContent from '@features/kakao-map/components/steps/BrandSelectContent';
import { useLocationStore } from '@features/kakao-map/store/LocationStore';
import type {
  LocationState,
  LocationActions,
} from '@features/kakao-map/store/LocationStore';
import type { Store } from '@/features/kakao-map/types/store';

/**
 * 바텀시트에서 사용할 수 있는 스텝들을 정의합니다.
 * category와 brand 스텝을 추가했습니다.
 */
type BottomSheetStep = 'list' | 'category' | 'brand';

/**
 * 지도 페이지의 메인 컴포넌트입니다.
 * 2단계 필터링 시스템을 지원합니다.
 */
function MapPage() {
  // 카카오맵 SDK 초기화
  useKakaoLoader();

  /**
   * 검색 관련 상태
   */
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  /**
   * 바텀시트 상태 관리
   */
  const [currentBottomSheetStep, setCurrentBottomSheetStep] =
    useState<BottomSheetStep>('list');

  /**
   * 필터 관련 상태 (새로 추가)
   * 실제 필터링 로직은 나중에 추가하고, 지금은 UI 동작만 구현
   */
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  /**
   * 지도 중심점 상태
   */
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.54699,
    lng: 127.09598,
  });

  /**
   * 실제 서비스에서 사용할 수 있는 다양한 매장 데이터
   */
  const [storeList] = useState<Store[]>([
    {
      storeId: 1,
      storeName: '뚜레쥬르 강남점',
      addressDetail: '서울시 강남구 테헤란로 123',
      benefit: '케이크 30% 할인',
      logo_image: '/images/brands/tous_les_jours.png',
      brandName: '뚜레쥬르',
      latitude: 37.51701,
      longitude: 127.04799,
      categoryName: '푸드',
    },
    {
      storeId: 3,
      storeName: '베스킨라빈스 삼성점',
      addressDetail: '서울시 강남구 삼성로 77',
      benefit: '아이스크림 1+1',
      logo_image: '/images/brands/baskin_robbins.png',
      brandName: '베스킨라빈스',
      latitude: 37.50129,
      longitude: 127.03197,
      categoryName: '푸드',
    },
    {
      storeId: 4,
      storeName: '파리바게뜨 선릉점',
      addressDetail: '서울시 강남구 선릉로 88',
      benefit: '빵 구매시 음료 무료',
      logo_image: '/images/brands/paris_baguette.png',
      brandName: '파리바게뜨',
      latitude: 37.50445,
      longitude: 127.04893,
      categoryName: '푸드',
    },
    {
      storeId: 5,
      storeName: 'GS25 역삼점',
      addressDetail: '서울시 강남구 역삼동 123-45',
      benefit: '생필품 10% 할인',
      logo_image: '/images/brands/gs25.png',
      brandName: 'GS25',
      latitude: 37.49933,
      longitude: 127.03656,
      categoryName: '생활/편의',
    },
  ]);

  const currentLocation = useLocationStore(
    (state: LocationState & LocationActions) => state.currentLocation
  );
  const isLocationLoading = useLocationStore(
    (state: LocationState & LocationActions) => state.isLoading
  );
  const locationError = useLocationStore(
    (state: LocationState & LocationActions) => state.error
  );
  const getCurrentLocation = useLocationStore(
    (state: LocationState & LocationActions) => state.getCurrentLocation
  );

  /**
   * 카테고리별 표시 이름 매핑
   */
  const getCategoryDisplayName = (categoryKey: string): string => {
    const categoryNames: Record<string, string> = {
      activity: '액티비티',
      beauty: '뷰티/건강',
      shopping: '쇼핑',
      lifestyle: '생활/편의',
      food: '푸드',
      culture: '문화/여가',
      education: '교육',
      travel: '여행/교통',
    };
    return categoryNames[categoryKey] || categoryKey;
  };

  /**
   * 카테고리별 브랜드 목록 매핑
   */
  const getBrandsByCategory = (category: string): string[] => {
    const brandMapping: Record<string, string[]> = {
      lifestyle: ['GS25', '펫생각', '셀로', '다락'],
      food: ['스타벅스', '투썸플레이스', '이디야', '파리바게뜨'],
      beauty: ['올리브영', '아리따움', '롭스', '왓슨스'],
      shopping: ['이마트', '홈플러스', '롯데마트', '코스트코'],
      culture: ['CGV', '롯데시네마', '메가박스', '교보문고'],
      activity: ['피트니스클럽', '골프장', '볼링장', '당구장'],
      education: ['해커스', '시원스쿨', '에듀윌', '종로학원'],
      travel: ['하나투어', '모두투어', '노랑풍선', '온라인투어'],
    };
    return brandMapping[category] || [];
  };

  /**
   * 검색 관련 이벤트 핸들러
   */
  const handleSearch = (value: string) => {
    console.log('🔍 검색 실행:', value);
    // TODO: 실제 검색 API 연동 시 구현
  };

  const handleSearchCancel = () => {
    console.log('❌ 검색 취소');
    setSearchValue('');
  };

  /**
   * 2단계 필터링 이벤트 핸들러들
   */
  const handleShowFilter = () => {
    console.log('🔍 필터 설정 시작 - 카테고리 선택 화면으로 이동');
    setCurrentBottomSheetStep('category');
  };

  const handleCategorySelect = (categoryKey: string) => {
    console.log('📂 카테고리 선택:', categoryKey);
    setSelectedCategory(categoryKey);
    // 카테고리 선택 후 브랜드 선택 화면으로 이동
    setCurrentBottomSheetStep('brand');
  };

  const handleBrandSelect = (brandName: string) => {
    console.log('🏢 브랜드 선택:', brandName);
    setSelectedBrand(brandName);
    // 브랜드 선택 후 결과 확인을 위해 목록 화면으로 이동
    setCurrentBottomSheetStep('list');

    // TODO: 여기서 실제 필터링 로직을 적용
    // 예: filterStores(selectedCategory, brandName);
  };

  const handleBackToCategory = () => {
    console.log('⬅️ 카테고리 선택 화면으로 돌아가기');
    setCurrentBottomSheetStep('category');
  };

  const handleBottomSheetStepChange = (step: string) => {
    console.log('📱 바텀시트 스텝 변경:', step);
    setCurrentBottomSheetStep(step as BottomSheetStep);
  };

  /**
   * 매장 관련 이벤트 핸들러
   */
  const handleStoreClick = (store: Store) => {
    console.log('🏪 매장 선택:', store.storeName);

    // 지도를 해당 매장으로 이동
    setMapCenter({ lat: store.latitude, lng: store.longitude });

    // 매장 클릭 시 리스트 화면으로 돌아가기
    if (currentBottomSheetStep !== 'list') {
      setCurrentBottomSheetStep('list');
    }
  };

  /**
   * 위치 관련 이벤트 핸들러
   */
  const handleLocationClick = async () => {
    console.log('📍 내 위치 버튼 클릭');

    try {
      await getCurrentLocation();
      if (currentLocation) {
        console.log('📍 내 위치로 지도 이동:', currentLocation);
        setMapCenter(currentLocation);
      }
    } catch (error) {
      console.error('위치 가져오기 실패:', error);
    }
  };

  /**
   * 상단 필터 변경 핸들러
   */
  const handleTopFilterChange = (filterValue: string) => {
    console.log('🔍 상단 필터 변경:', filterValue);
    setActiveFilter(filterValue);
    // TODO: 실제 필터링 로직 구현
  };

  /**
   * 사용자 위치가 업데이트될 때 지도 중심을 자동으로 이동
   */
  useEffect(() => {
    if (currentLocation) {
      console.log('📍 위치 업데이트 감지, 지도 중심 이동:', currentLocation);
      setMapCenter(currentLocation);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📱 바텀시트 상태:', {
        currentStep: currentBottomSheetStep,
        selectedCategory,
        selectedBrand,
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  }, [currentBottomSheetStep, selectedCategory, selectedBrand]);

  /**
   * 바텀시트 스텝 정의 (3단계로 확장)
   */
  const bottomSheetSteps = [
    {
      key: 'list',
      title: '주변 제휴 매장',
      subtitle:
        selectedCategory || selectedBrand
          ? `${getCategoryDisplayName(selectedCategory)}${selectedBrand ? ' > ' + selectedBrand : ''}`
          : undefined,
      showFilterButton: true,
      onFilterClick: handleShowFilter,
      content: (
        <StoreListContent
          stores={storeList}
          onFilterClick={handleShowFilter}
          onStoreClick={handleStoreClick}
        />
      ),
    },
    {
      key: 'category',
      title: '필터',
      showBackButton: true,
      content: (
        <CategorySelectContent
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      ),
    },
    {
      key: 'brand',
      title: '필터',
      showBackButton: true,
      content: (
        <BrandSelectContent
          categoryKey={selectedCategory}
          categoryDisplayName={getCategoryDisplayName(selectedCategory)}
          brands={getBrandsByCategory(selectedCategory)}
          selectedBrand={selectedBrand}
          onBrandSelect={handleBrandSelect}
          onBack={handleBackToCategory}
        />
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 relative">
        <MapWithMarkers
          center={mapCenter}
          stores={storeList}
          currentLocation={currentLocation}
        />

        <MapTopControls
          searchValue={searchValue}
          onSearchValueChange={setSearchValue}
          onSearch={handleSearch}
          onSearchCancel={handleSearchCancel}
          activeFilter={activeFilter}
          onFilterChange={handleTopFilterChange}
        />

        <div className="absolute bottom-32 right-4 z-10">
          <LocationButton
            onClick={handleLocationClick}
            isLoading={isLocationLoading}
          />
        </div>

        {locationError && (
          <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-600 text-center py-2 z-50">
            <span className="text-sm font-medium">⚠️ {locationError}</span>
          </div>
        )}
      </div>

      <PersistentBottomSheet
        steps={bottomSheetSteps}
        currentStepKey={currentBottomSheetStep}
        onStepChange={handleBottomSheetStepChange}
        minHeight={80}
        maxHeight={500}
        defaultExpanded={true}
        bottomNavHeight={30}
      />
    </div>
  );
}

export default MapPage;
