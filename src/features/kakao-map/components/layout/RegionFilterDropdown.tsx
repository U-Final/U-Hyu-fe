import { createPortal } from 'react-dom';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn/ui/select';

import { REGIONS } from '../../constants/regions';

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
      <SelectTrigger
        className="w-20 min-w-20 max-w-20 h-[44px] bg-white border border-gray-200 rounded-md text-sm font-semibold shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-200 flex-shrink-0"
        style={{
          width: '80px',
          minWidth: '80px',
          maxWidth: '112px',
          flexShrink: 0,
        }}
      >
        <div
          className="w-full overflow-hidden"
          style={{ width: '100%', overflow: 'hidden' }}
        >
          <SelectValue
            placeholder="지역"
            className="truncate block w-full text-left"
            style={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              width: '100%',
            }}
          />
        </div>
      </SelectTrigger>
      {createPortal(
        <SelectContent
          position="popper"
          side="bottom"
          sideOffset={4}
          className="bg-white border border-gray-200 shadow-2xl rounded-md z-[1000]"
        >
          <SelectGroup>
            <SelectLabel>지역 선택</SelectLabel>
            {REGIONS.map(region => (
              <SelectItem key={region.key} value={region.key}>
                {region.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>,
        document.body
      )}
    </Select>
  );
}
