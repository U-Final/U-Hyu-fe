import { type FC, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

import { useGA } from '@/shared/hooks/useGA';

import type { Store } from '../../types/store.ts';
import { getCategoryColorFromFilter } from '../../utils/categoryColorMapping';

//3D 깃발 컴포넌트
const Flag3D: FC<{ brandImageSrc: string }> = ({ brandImageSrc }) => {
  const flagRef = useRef<THREE.Mesh>(null);
  const [flagGeometry] = useState(() => new THREE.PlaneGeometry(3, 2, 30, 20));
  const [flagMaterial] = useState(() => new THREE.MeshStandardMaterial({ 
    color: '#FFD700',
    metalness: 0.3,
    roughness: 0.2,
    transparent: true,
    opacity: 0.9
  }));

  //브랜드 이미지 텍스처 로드
  const [brandTexture] = useState(() => {
    const textureLoader = new THREE.TextureLoader();
    try {
      return textureLoader.load(brandImageSrc, undefined, undefined, () => {
        //로드 실패시 기본 이미지 사용
        return textureLoader.load('/images/brands/default-brand-logo.png');
      });
    } catch {
      //에러 발생시 기본 이미지 사용
      return textureLoader.load('/images/brands/default-brand-logo.png');
    }
  });

  useFrame((state) => {
    if (flagRef.current && flagGeometry.attributes.position) {
      try {
        const time = state.clock.elapsedTime;
        
        //버텍스 변형
        const positions = flagGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          
          const distanceFromPole = (x + 1.5) / 3;
          const windStrength = Math.sin(time * 2 + x * 3) * 0.08 * distanceFromPole;
          const waveEffect = Math.sin(time * 3 + y * 4) * 0.04 * distanceFromPole;
         
          const zOffset = Math.max(0.01, Math.min(0.3, windStrength + waveEffect + 0.1));
          positions.setZ(i, zOffset);
        }
        positions.needsUpdate = true;
        
        flagRef.current.rotation.y = Math.sin(time * 1.5) * 0.4;
        flagRef.current.rotation.z = Math.sin(time * 2) * 0.15;
        flagRef.current.rotation.x = Math.sin(time * 1.8) * 0.1;
      } catch {
        if (flagRef.current) {
          flagRef.current.rotation.set(0, 0, 0);
        }
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Box args={[0.15, 4, 0.15]} position={[-1.8, -1, -0.5]}>
        <meshStandardMaterial color="#FFD700" metalness={0.5} roughness={0.3} />
      </Box>
      <mesh ref={flagRef} geometry={flagGeometry} material={flagMaterial} position={[-0.5, 1, 0.1]}>
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.3}
          roughness={0.2}
          transparent={true}
          opacity={0.95}
          map={brandTexture}
          emissive="#FFA500"
          emissiveIntensity={0.2}
        />
      </mesh>
      <pointLight position={[1, 1, 3]} intensity={1.2} color="#FFD700" />
      <pointLight position={[1, 1, -3]} intensity={0.8} color="#FFA500" />
      <pointLight position={[0, 1, 2]} intensity={0.6} color="#FFFFFF" />
    </group>
  );
};

interface BrandMarkerProps {
  store: Store;
  isSelected?: boolean;
  isRecommended?: boolean;
  onClick?: () => void;
}

const BrandMarker: FC<BrandMarkerProps> = ({
  store,
  isSelected = false,
  isRecommended = false,
  onClick,
}) => {
  const { trackMapInteraction } = useGA();
  const brandImageSrc = store.logoImage;

  const categoryColor = getCategoryColorFromFilter(store.categoryName);





  const handleMarkerClick = () => {
    // GA 추적: 마커 클릭
    trackMapInteraction('marker_click', store.storeId, store.categoryName);

    // 기존 onClick 핸들러 실행
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative" onClick={handleMarkerClick}>
      {isRecommended ? (
        <div className="relative w-25 h-25">
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              style={{ width: '100%', height: '100%' }}
              onError={(error) => {
                console.warn('3D Flag Canvas Error:', error);
              }}
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Flag3D brandImageSrc={brandImageSrc} />
            </Canvas>
          </div>
        </div>
      ) : (
        // 기본 마커
        <div
          className={`
            relative 
            w-12 h-12
            rounded-full 
            shadow-md 
            cursor-pointer
            transition-all 
            duration-200
            hover:scale-110
            hover:shadow-2xl
            ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
          `}
          style={{
            backgroundColor: categoryColor,
            boxShadow: `0 4px 16px -2px ${categoryColor}40, 0 6px 12px -4px rgba(0,0,0,0.1)`,
          }}
        >
          {/* 브랜드 로고 */}
          <div className="absolute inset-1 bg-white rounded-full overflow-hidden">
            <img
              src={brandImageSrc}
              alt={`${store.storeName} 마커`}
              className="w-full h-full object-cover"
              onError={e => {
                e.currentTarget.src = '/images/brands/default-brand-logo.png';
              }}
            />
          </div>

          {/* 마커 포인터 */}
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[14px] border-transparent border-t-current drop-shadow-md"
            style={{
              borderTopColor: categoryColor,
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
            }}
          />
        </div>
      )}

      {/* 선택 상태 효과 */}
      {isSelected && (
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping" />
      )}
    </div>
  );
};

export default BrandMarker;
