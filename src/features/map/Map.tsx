import { NaverMap, Marker, useNavermaps } from 'react-naver-maps';

function Map() {
  // instead of window.naver.maps
  const navermaps = useNavermaps();

  return (
    <NaverMap defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)} defaultZoom={15}>
      <Marker defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} />
    </NaverMap>
  );
}
export default Map;
