import Geolocation from 'react-native-geolocation-service';
import { useRef, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
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
  const [statusLabel, setStatusLabel] = useState('현재 위치를 가져오거나 주소를 검색해 보세요.');
  const [selectedPlace, setSelectedPlace] = useState({
    title: '서울시청',
    description: '기본 시작 위치',
    latitude: defaultRegion.latitude,
    longitude: defaultRegion.longitude,
  });

  const moveMap = (region, title, description) => {
    setSelectedPlace({
      title,
      description,
      latitude: region.latitude,
      longitude: region.longitude,
    });
    mapRef.current?.animateToRegion(region, 700);
  };

  const moveToCurrentLocation = async () => {
    const granted = await requestLocationPermission();
    if (!granted) {
      setStatusLabel('위치 권한이 필요합니다.');
      return;
    }

    setStatusLabel('현재 위치를 불러오는 중입니다.');

    Geolocation.getCurrentPosition(
      (position) => {
        const nextRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };
        moveMap(nextRegion, '현재 위치', 'GPS로 가져온 좌표');
        setStatusLabel('현재 위치로 이동했습니다.');
      },
      (error) => {
        setStatusLabel(`위치 오류: ${error.code}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  const searchAddress = async () => {
    if (!address.trim()) {
      setStatusLabel('주소를 먼저 입력하세요.');
      return;
    }

    setStatusLabel('주소를 검색하는 중입니다.');

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
      const nextRegion = {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };

      moveMap(nextRegion, '검색 결과', result.formatted_address);
      setStatusLabel('검색 결과 위치로 이동했습니다.');
    } catch (error) {
      setStatusLabel(`네트워크 오류: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.badge}>Chapter 16</Text>
      <Text style={styles.title}>위치 허브 앱</Text>
      <Text style={styles.subtitle}>
        현재 위치 이동과 주소 검색을 한 화면에 통합해 위치 기반 앱의 기본 구조를 마무리합니다.
      </Text>

      <View style={styles.searchCard}>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="검색할 주소를 입력하세요"
          placeholderTextColor="#64748b"
        />
        <View style={styles.buttonRow}>
          <Pressable style={styles.secondaryButton} onPress={moveToCurrentLocation}>
            <Text style={styles.secondaryButtonText}>현재 위치</Text>
          </Pressable>
          <Pressable style={styles.primaryButton} onPress={searchAddress}>
            <Text style={styles.primaryButtonText}>주소 검색</Text>
          </Pressable>
        </View>
        <Text style={styles.statusText}>{statusLabel}</Text>
      </View>

      <View style={styles.placeCard}>
        <Text style={styles.cardLabel}>선택된 위치</Text>
        <Text style={styles.placeTitle}>{selectedPlace.title}</Text>
        <Text style={styles.placeDescription}>{selectedPlace.description}</Text>
        <Text style={styles.coordsText}>
          위도 {selectedPlace.latitude.toFixed(5)} / 경도 {selectedPlace.longitude.toFixed(5)}
        </Text>
      </View>

      <View style={styles.mapCard}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={defaultRegion}
          showsUserLocation
        >
          <Marker
            coordinate={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            }}
            title={selectedPlace.title}
            description={selectedPlace.description}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

async function requestLocationPermission() {
  if (Platform.OS !== 'android') {
    return true;
  }

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: '위치 권한 요청',
      message: '현재 위치로 이동하려면 위치 권한이 필요합니다.',
      buttonPositive: '허용',
      buttonNegative: '거부',
    }
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f3ff',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  badge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7c3aed',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#2e1065',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: '#5b21b6',
  },
  searchCard: {
    marginTop: 22,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 18,
  },
  input: {
    borderRadius: 16,
    backgroundColor: '#ede9fe',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#2e1065',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#ddd6fe',
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4c1d95',
  },
  primaryButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  statusText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#5b21b6',
  },
  placeCard: {
    marginTop: 14,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 18,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7c3aed',
  },
  placeTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '800',
    color: '#2e1065',
  },
  placeDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#5b21b6',
  },
  coordsText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
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
