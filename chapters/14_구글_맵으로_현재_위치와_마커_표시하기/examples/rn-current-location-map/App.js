import Geolocation from 'react-native-geolocation-service';
import { useRef, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const defaultRegion = {
  latitude: 37.5665,
  longitude: 126.978,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function App() {
  const mapRef = useRef(null);
  const [permissionLabel, setPermissionLabel] = useState('권한 요청 전');
  const [currentRegion, setCurrentRegion] = useState(defaultRegion);
  const [markerPosition, setMarkerPosition] = useState(null);

  const moveToCurrentLocation = async () => {
    const granted = await requestLocationPermission();
    if (!granted) {
      setPermissionLabel('권한 거부됨');
      return;
    }

    setPermissionLabel('권한 허용됨');

    Geolocation.getCurrentPosition(
      (position) => {
        const nextRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setCurrentRegion(nextRegion);
        setMarkerPosition(nextRegion);
        mapRef.current?.animateToRegion(nextRegion, 600);
      },
      (error) => {
        setPermissionLabel(`위치 오류: ${error.code}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.badge}>Chapter 14</Text>
      <Text style={styles.title}>현재 위치 지도</Text>
      <Text style={styles.subtitle}>
        위치 권한을 요청하고 현재 좌표를 지도 중심과 마커에 반영합니다.
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.label}>권한 상태</Text>
        <Text style={styles.value}>{permissionLabel}</Text>
        <Text style={[styles.label, styles.spaced]}>현재 좌표</Text>
        <Text style={styles.value}>
          위도 {currentRegion.latitude.toFixed(5)} / 경도 {currentRegion.longitude.toFixed(5)}
        </Text>
      </View>

      <Pressable style={styles.button} onPress={moveToCurrentLocation}>
        <Text style={styles.buttonText}>현재 위치 가져오기</Text>
      </Pressable>

      <View style={styles.mapCard}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={defaultRegion}
          showsUserLocation
          showsMyLocationButton
        >
          {markerPosition ? (
            <Marker coordinate={markerPosition} title="현재 위치" description="가져온 좌표입니다." />
          ) : null}
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
      title: '현재 위치 권한 요청',
      message: '지도 중심을 현재 위치로 이동하려면 위치 권한이 필요합니다.',
      buttonPositive: '허용',
      buttonNegative: '거부',
    }
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  badge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0284c7',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
  },
  infoCard: {
    marginTop: 22,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0284c7',
  },
  spaced: {
    marginTop: 16,
  },
  value: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: '#334155',
  },
  button: {
    marginTop: 16,
    borderRadius: 18,
    backgroundColor: '#0284c7',
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  mapCard: {
    flex: 1,
    marginTop: 18,
    marginBottom: 18,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  map: {
    flex: 1,
  },
});
