import MyMapBody from '@mymap/components/MymapBody';
import { MymapHeader } from '@mymap/components/MymapHeader';

const MymapPage = () => {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <MymapHeader />
      <MyMapBody />
    </div>
  );
};

export default MymapPage;
