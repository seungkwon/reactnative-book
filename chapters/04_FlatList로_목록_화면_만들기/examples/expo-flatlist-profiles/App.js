import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const avatarImage = require('./assets/profile-card-avatar.png');

const initialProfiles = [
  { id: '1', name: '리액트 쌤', role: 'React Native State Starter', following: true },
  { id: '2', name: '모바일 메이트', role: 'UI Component Explorer', following: false },
  { id: '3', name: '앱 빌더', role: 'FlatList Practice Partner', following: false },
];

export default function App() {
  const [profiles, setProfiles] = useState(initialProfiles);

  const toggleFollow = (targetId) => {
    setProfiles((currentProfiles) =>
      currentProfiles.map((profile) =>
        profile.id === targetId
          ? { ...profile, following: !profile.following }
          : profile
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={avatarImage} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
        <Text style={styles.description}>
          {item.following
            ? '새 글 알림을 받고 있는 프로필입니다.'
            : '팔로우 버튼으로 목록 상태를 바꿔 보세요.'}
        </Text>
      </View>
      <Pressable
        style={[styles.button, item.following && styles.buttonActive]}
        onPress={() => toggleFollow(item.id)}
      >
        <Text style={styles.buttonText}>
          {item.following ? '팔로잉' : '팔로우'}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.badge}>Chapter 04</Text>
      <Text style={styles.title}>추천 프로필 목록</Text>
      <Text style={styles.subtitle}>
        FlatList로 여러 개의 카드를 반복 렌더링합니다.
      </Text>

      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  badge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563eb',
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
  listContent: {
    paddingTop: 22,
    paddingBottom: 28,
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  content: {
    flex: 1,
    marginLeft: 14,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  role: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: '#2563eb',
  },
  description: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: '#475569',
  },
  button: {
    borderRadius: 999,
    backgroundColor: '#2563eb',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  buttonActive: {
    backgroundColor: '#0f766e',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
});
