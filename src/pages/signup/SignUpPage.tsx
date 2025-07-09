import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen items-start bg-variable-collection-BG-white">
      <div className="flex flex-col w-full max-w-[360px] mx-auto items-start pt-[60px] px-4 pb-0 flex-1 bg-variable-collection-BG-white">
        <Card className="w-full border-none shadow-none">
          <CardContent className="p-0 space-y-8">
            <h2 className="font-pretendard-h3-bold text-variable-collection-text-black text-[20px] leading-[140%] tracking-[0px] mt-[-1px]">
              이메일 주소를 입력해주세요
            </h2>

            <div className="space-y-2.5">
              <div className="space-y-1">
                <Label
                  htmlFor="email"
                  className="font-pretendard-caption-medium text-variable-collection-BG-primary text-[12px] tracking-[-0.06px] leading-[140%]"
                >
                  이메일
                </Label>
              </div>

              <div className="flex flex-col gap-[7px]">
                <div className="flex items-center justify-between w-full">
                  <span className="font-pretendard-body1-semibold text-variable-collection-text-black text-[16px] tracking-[-0.08px] leading-[140%]">
                    neoldy0412@gmail.com
                  </span>

                  <Button
                    variant="default"
                    size="sm"
                    className="h-5 px-4 py-2 bg-variable-collection-BG-primary rounded-md"
                  >
                    <span className="font-pretendard-10-bold text-variable-collection-text-white text-[10px] tracking-[-0.05px] leading-[140%]">
                      중복확인
                    </span>
                  </Button>
                </div>

                <div className="w-full h-0.5 bg-variable-collection-BG-primary" />
              </div>
            </div>

            <Button className="w-full h-11 bg-variable-collection-BG-primary rounded-md">
              <span className="font-pretendard-h4-bold text-variable-collection-text-white text-[18px] tracking-[-0.09px] leading-[140%]">
                확인
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
