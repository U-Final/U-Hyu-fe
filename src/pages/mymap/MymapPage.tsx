import { MymapBody, MymapHeader } from '@mymap/components';

const MymapPage = () => {
  return (
    <div className="min-h-screen flex flex-col gap-3">
        <MymapHeader />
        <MymapBody />
    </div>
  );
};

export default MymapPage;
