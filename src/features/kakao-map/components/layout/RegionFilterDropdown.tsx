import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@shared/components/shadcn/ui/select';

const regions = [
  { label: '전체', value: 'all' },
  { label: '서울', value: 'seoul' },
  { label: '경기', value: 'gyeonggi' },
  { label: '인천', value: 'incheon' },
  { label: '부산', value: 'busan' },
  { label: '제주', value: 'jeju' },
  { label: '강원', value: 'gangwon' },
  { label: '충청', value: 'chungcheong' },
  { label: '전라', value: 'jeollanam' },
  { label: '경상', value: 'gyeongsang' },
  { label: '전북', value: 'jeonbuk' },
  { label: '전남', value: 'jeonnam' },
  { label: '경북', value: 'gyeongbuk' },
];

/**
 * 사용자가 지역을 선택할 수 있는 드롭다운 컴포넌트를 렌더링합니다.
 *
 * @param value - 현재 선택된 지역의 값
 * @param onChange - 선택이 변경될 때 호출되는 콜백 함수
 *
 * @returns 지역 선택 드롭다운 UI 컴포넌트
 */
export default function RegionFilterDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-32 h-10 bg-white border border-gray-200 rounded-lg shadow text-sm font-medium">
        <SelectValue placeholder="지역별" />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={4}
        className="bg-white border border-gray-200 shadow-lg rounded-lg z-50"
      >
        <SelectGroup>
          <SelectLabel>지역 선택</SelectLabel>
          {regions.map(region => (
            <SelectItem key={region.value} value={region.value}>
              {region.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
