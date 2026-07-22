import { useRef, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

const defaultRegion = {
  latitude: 37.5665,
  longitude: 126.978,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export default function App() {
  const mapRef = useRef(null);
  const [address, setAddress] = useState('서울특별시 중구 세종대로 110');
  const [statusLabel, setStatusLabel] = useState('주소를 입력하고 검색해 보세요.');
  const [searchResult, setSearchResult] = useState({
    latitude: defaultRegion.latitude,
    longitude: defaultRegion.longitude,
    title: '서울시청',
  });

  const searchAddress = async () => {
    if (!address.trim()) {
      setStatusLabel('주소를 먼저 입력하세요.');
      return;
    }

    setStatusLabel('주소를 좌표로 변환하는 중입니다.');

    try {
      const encodedAddress = encodeURIComponent(address.trim());
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status !== 'OK' || !data.results?.[0]) {
        setStatusLabel(`검색 실패: ${data.status}`);
        return;
      }

      const result = data.results[0];
      const location = result.geometry.location;
      const nextRegion = {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };

      setSearchResult({
        latitude: location.lat,
        longitude: location.lng,
        title: result.formatted_address,
      });
      setStatusLabel('주소를 좌표로 변환했습니다.');
      mapRef.current?.animateToRegion(nextRegion, 700);
    } catch (error) {
      setStatusLabel(`네트워크 오류: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.badge}>Chapter 15</Text>
      <Text style={styles.title}>주소 검색 지도</Text>
      <Text style={styles.subtitle}>
        주소 문자열을 좌표로 바꾸고 지도 중심과 마커를 검색 결과 위치로 이동합니다.
      </Text>

      <View style={styles.searchCard}>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="검색할 주소를 입력하세요"
          placeholderTextColor="#64748b"
          style={styles.input}
        />
        <Pressable style={styles.button} onPress={searchAddress}>
          <Text style={styles.buttonText}>주소 검색</Text>
        </Pressable>
        <Text style={styles.statusText}>{statusLabel}</Text>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.label}>검색 결과</Text>
        <Text style={styles.resultTitle}>{searchResult.title}</Text>
        <Text style={styles.resultCoords}>
          위도 {searchResult.latitude.toFixed(5)} / 경도 {searchResult.longitude.toFixed(5)}
        </Text>
      </View>

      <View style={styles.mapCard}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={defaultRegion}
        >
          <Marker
            coordinate={{
              latitude: searchResult.latitude,
              longitude: searchResult.longitude,
            }}
            title={searchResult.title}
            description="주소 검색 결과 위치입니다."
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff7ed',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  badge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ea580c',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#431407',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: '#7c2d12',
  },
  searchCard: {
    marginTop: 22,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 18,
  },
  input: {
    borderRadius: 16,
    backgroundColor: '#ffedd5',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#431407',
  },
  button: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: '#ea580c',
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  statusText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#7c2d12',
  },
  resultCard: {
    marginTop: 14,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ea580c',
  },
  resultTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#431407',
  },
  resultCoords: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#7c2d12',
  },
  mapCard: {
    flex: 1,
    marginTop: 16,
    marginBottom: 18,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  map: {
    flex: 1,
  },
});
