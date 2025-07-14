const mockMarkerList = [
  { id: 1, image: '/images/markers/marker1.png' },
  { id: 2, image: '/images/markers/marker1.png' },
  { id: 3, image: '/images/markers/marker1.png' },
  { id: 4, image: '/images/markers/marker1.png' },
  { id: 5, image: '/images/markers/marker1.png' },
  { id: 6, image: '/images/markers/marker1.png' },
  { id: 7, image: '/images/markers/marker1.png' },
  { id: 8, image: '/images/markers/marker1.png' },
];

export default function MyPageMarker() {
  return (
    <section className="mt-[2.4rem] px-[1.6rem] pb-[6rem]">
      <h2 className="text-[1.6rem] font-bold mb-[1.2rem]">나만의 마커</h2>
      <div className="flex flex-wrap gap-[1.2rem] bg-[#f6f7f8] p-[1.6rem] rounded-[1.6rem]">
        {mockMarkerList.map((marker) => (
          <img
            key={marker.id}
            src={marker.image}
            alt={`마커 ${marker.id}`}
            className="w-[4rem] h-[4rem] object-contain"
          />
        ))}
      </div>
    </section>
  );
}
