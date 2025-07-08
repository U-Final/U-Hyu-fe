import { useEffect } from 'react';
import { useUserStore } from '@/shared/auth/store/userStore';

function App() {
  const { updateUserFromToken } = useUserStore();

  useEffect(() => {
    // 앱 시작 시 JWT 토큰에서 사용자 정보 로드
    updateUserFromToken();
  }, [updateUserFromToken]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Pretendard 폰트 시스템</h1>
          <p className="text-text-secondary">로컬 폰트 파일을 사용한 한국어 웹 폰트 시스템</p>
        </header>

        {/* 폰트 Weight 테스트 */}
        <section className="card">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">폰트 Weight 테스트</h2>
          <div className="space-y-4">
            <div className="font-thin text-lg">
              <span className="text-text-accent">Thin (100):</span> 가나다라마바사아자차카타파하
            </div>
            <div className="font-extralight text-lg">
              <span className="text-text-accent">ExtraLight (200):</span>{' '}
              가나다라마바사아자차카타파하
            </div>
            <div className="font-light text-lg">
              <span className="text-text-accent">Light (300):</span> 가나다라마바사아자차카타파하
            </div>
            <div className="font-regular text-lg">
              <span className="text-text-accent">Regular (400):</span> 가나다라마바사아자차카타파하
            </div>
            <div className="font-medium text-lg">
              <span className="text-text-accent">Medium (500):</span> 가나다라마바사아자차카타파하
            </div>
            <div className="font-semibold text-lg">
              <span className="text-text-accent">SemiBold (600):</span> 가나다라마바사아자차카타파하
            </div>
            <div className="font-bold text-lg">
              <span className="text-text-accent">Bold (700):</span> 가나다라마바사아자차카타파하
            </div>
            <div className="font-extrabold text-lg">
              <span className="text-text-accent">ExtraBold (800):</span>{' '}
              가나다라마바사아자차카타파하
            </div>
            <div className="font-black text-lg">
              <span className="text-text-accent">Black (900):</span> 가나다라마바사아자차카타파하
            </div>
          </div>
        </section>

        {/* 색상 시스템 테스트 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-text-primary">색상 시스템 테스트</h2>

          {/* Primary Colors */}
          <div className="card">
            <h3 className="text-xl font-medium text-text-primary mb-4">Primary Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary-50 p-4 rounded-rounded-4 text-center">
                <div className="text-sm font-medium">primary-50</div>
              </div>
              <div className="bg-primary-100 p-4 rounded-rounded-4 text-center">
                <div className="text-sm font-medium">primary-100</div>
              </div>
              <div className="bg-primary-200 p-4 rounded-rounded-4 text-center">
                <div className="text-sm font-medium">primary-200</div>
              </div>
              <div className="bg-primary-600 text-white p-4 rounded-rounded-4 text-center">
                <div className="text-sm font-medium">primary-600</div>
              </div>
            </div>
          </div>

          {/* Brand Colors */}
          <div className="card">
            <h3 className="text-xl font-medium text-text-primary mb-4">Brand Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-brand-blue text-white p-4 rounded-rounded-4 text-center">
                <div className="text-sm font-medium">brand-blue</div>
              </div>
              <div className="bg-brand-blueLight p-4 rounded-rounded-4 text-center">
                <div className="text-sm font-medium">brand-blueLight</div>
              </div>
              <div className="bg-brand-blueMuted p-4 rounded-rounded-4 text-center">
                <div className="text-sm font-medium">brand-blueMuted</div>
              </div>
            </div>
          </div>

          {/* Components */}
          <div className="card">
            <h3 className="text-xl font-medium text-text-primary mb-4">컴포넌트 테스트</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <button className="btn-primary">Primary Button</button>
                <button className="btn-secondary">Secondary Button</button>
              </div>

              <div className="flex gap-4">
                <span className="badge-primary">Primary Badge</span>
                <span className="badge bg-etc-BG-blue text-etc-TXT-blue">Custom Badge</span>
              </div>

              <input className="input w-full max-w-md" placeholder="Input Field Example" />

              <div className="card-hover max-w-md">
                <h4 className="font-semibold text-text-primary mb-2">Card Example</h4>
                <p className="text-text-secondary">
                  이것은 카드 컴포넌트의 예시입니다. 호버 효과가 적용되어 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 타이포그래피 테스트 */}
        <section className="card">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">타이포그래피 테스트</h2>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-text-primary">Heading 1 - 메인 타이틀</h1>
            <h2 className="text-3xl font-semibold text-text-primary">Heading 2 - 섹션 타이틀</h2>
            <h3 className="text-2xl font-medium text-text-primary">Heading 3 - 서브 타이틀</h3>
            <p className="text-lg text-text-secondary">
              본문 텍스트 - 일반적인 문단 텍스트입니다. Pretendard 폰트가 한글과 영문 모두에서
              자연스럽게 렌더링됩니다.
            </p>
            <p className="text-sm text-text-secondary">
              작은 텍스트 - 부가 정보나 설명을 위한 작은 크기의 텍스트입니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
