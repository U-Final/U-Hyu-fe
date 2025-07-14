const mockBrandList = [
  { id: 1, name: 'CGV', logoUrl: '/images/brands/cgv.jpg' },
  { id: 2, name: '배스킨라빈스', logoUrl: '/images/brands/cgv.jpg' },
  { id: 3, name: '뚜레쥬르', logoUrl: '/images/brands/cgv.jpg' },
  { id: 4, name: 'GS25', logoUrl: '/images/brands/cgv.jpg' },
  { id: 5, name: '굽네치킨', logoUrl: '/images/brands/cgv.jpg' },
  { id: 6, name: '파리바게트', logoUrl: '/images/brands/cgv.jpg' },
];

export default function MyPageBrand() {
  return (
    <section className="mt-[2.4rem] px-[1.6rem]">
      <h2 className="text-[1.6rem] font-bold mb-[1.2rem]">관심 브랜드</h2>
      <p className="text-[1.3rem] text-gray-500 mb-[1.6rem]">관심있는 브랜드를 선택해주세요.</p>
      <div className="grid grid-cols-3 gap-[1.2rem]">
        {mockBrandList.map((brand) => (
          <div
            key={brand.id}
            className="flex flex-col items-center p-[1.2rem] border border-gray-200 rounded-[1.2rem] shadow-sm"
          >
            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="w-[4rem] h-[4rem] object-contain mb-[0.8rem]"
            />
            <span className="text-[1.2rem] text-center">{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
