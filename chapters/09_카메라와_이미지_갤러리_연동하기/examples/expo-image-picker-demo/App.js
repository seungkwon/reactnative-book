import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [sourceLabel, setSourceLabel] = useState('아직 이미지를 선택하지 않았습니다.');

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setSourceLabel('갤러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setSourceLabel('갤러리에서 이미지를 선택했습니다.');
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      setSourceLabel('카메라 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setSourceLabel('카메라로 새 사진을 촬영했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.badge}>Chapter 09</Text>
      <Text style={styles.title}>카메라와 갤러리 연동</Text>
      <Text style={styles.subtitle}>
        기기 사진을 선택하거나 촬영한 뒤 바로 미리보기 화면에 반영합니다.
      </Text>

      <View style={styles.previewCard}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderTitle}>Image Preview</Text>
            <Text style={styles.placeholderText}>
              아직 선택된 이미지가 없습니다.
            </Text>
          </View>
        )}
        <Text style={styles.helperText}>{sourceLabel}</Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.primaryButton} onPress={pickFromGallery}>
          <Text style={styles.primaryButtonText}>갤러리에서 선택</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={takePhoto}>
          <Text style={styles.secondaryButtonText}>카메라로 촬영</Text>
        </Pressable>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ecfeff',
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  badge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0891b2',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: {
    marginTop: 10,
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
  previewCard: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 18,
  },
  previewImage: {
    width: '100%',
    height: 340,
    borderRadius: 22,
    backgroundColor: '#e2e8f0',
  },
  placeholder: {
    height: 340,
    borderRadius: 22,
    backgroundColor: '#cffafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 14,
    color: '#475569',
  },
  helperText: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 21,
    color: '#334155',
  },
  buttonRow: {
    marginTop: 18,
    gap: 12,
  },
  primaryButton: {
    borderRadius: 18,
    backgroundColor: '#0891b2',
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  secondaryButton: {
    borderRadius: 18,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#67e8f9',
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
});
