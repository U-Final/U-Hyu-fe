import Map from '@/features/map/Map';
import { Container as MapDiv } from 'react-naver-maps';

function App() {
  return (
    <div className="p-6 space-y-4 bg-white">
      <MapDiv
        style={{
          width: '100%',
          height: '600px',
        }}
      >
        <Map />
      </MapDiv>
    </div>
  );
}

export default App;
