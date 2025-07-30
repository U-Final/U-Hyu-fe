import { MymapBody, MymapHeader } from '@mymap/components';

const MymapPage = () => {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <MymapHeader />
      <MymapBody />
    </div>
  );
};

export default MymapPage;
