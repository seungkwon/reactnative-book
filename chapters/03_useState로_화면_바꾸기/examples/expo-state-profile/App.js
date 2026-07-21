import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const avatarImage = require('./assets/profile-card-avatar.png');

export default function App() {
  const [nickname, setNickname] = useState('코딩하는 리액트 개발자');
  const [isFollowing, setIsFollowing] = useState(false);

  const buttonLabel = isFollowing ? '팔로잉 취소하기' : '팔로우 시작하기';
  const statusMessage = isFollowing
    ? `${nickname} 님의 새 글 알림을 받고 있습니다.`
    : `${nickname} 님을 팔로우하면 새 소식을 빠르게 확인할 수 있습니다.`;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.badge}>Chapter 03</Text>
        <Image source={avatarImage} style={styles.avatar} />
        <Text style={styles.name}>{nickname}</Text>
        <Text style={styles.role}>React Native State Starter</Text>
        <Text style={styles.description}>{statusMessage}</Text>

        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="별명을 입력해 보세요"
          placeholderTextColor="#94a3b8"
        />

        <Pressable
          style={[styles.button, isFollowing && styles.buttonActive]}
          onPress={() => setIsFollowing((current) => !current)}
        >
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </Pressable>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  badge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
    marginBottom: 18,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  role: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '700',
    color: '#2563eb',
  },
  description: {
    marginTop: 14,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
  },
  button: {
    width: '100%',
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#0f766e',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
});
