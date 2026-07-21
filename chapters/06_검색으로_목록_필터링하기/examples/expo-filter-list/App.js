import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const avatarImage = require('./assets/profile-card-avatar.png');

const initialProfiles = [
  { id: '1', name: '리액트 쌤', role: 'React Native State Starter', following: true },
  { id: '2', name: '모바일 메이트', role: 'UI Component Explorer', following: false },
  { id: '3', name: '앱 빌더', role: 'FlatList Practice Partner', following: false },
  { id: '4', name: '컴포넌트 연구원', role: 'Search UI Builder', following: true },
];

export default function App() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [query, setQuery] = useState('');

  const toggleFollow = (targetId) => {
    setProfiles((currentProfiles) =>
      currentProfiles.map((profile) =>
        profile.id === targetId
          ? { ...profile, following: !profile.following }
          : profile
      )
    );
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProfiles = profiles.filter((profile) => {
    if (!normalizedQuery) {
      return true;
    }

    return (
      profile.name.toLowerCase().includes(normalizedQuery) ||
      profile.role.toLowerCase().includes(normalizedQuery)
    );
  });

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
      <Text style={styles.badge}>Chapter 06</Text>
      <Text style={styles.title}>프로필 검색하기</Text>
      <Text style={styles.subtitle}>
        입력한 검색어에 따라 목록 결과가 즉시 좁혀집니다.
      </Text>

      <TextInput
        style={styles.searchInput}
        value={query}
        onChangeText={setQuery}
        placeholder="이름 또는 역할로 검색"
        placeholderTextColor="#94a3b8"
      />

      <FlatList
        data={filteredProfiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>검색 결과가 없습니다.</Text>
            <Text style={styles.emptyText}>
              다른 이름이나 역할 키워드로 다시 검색해 보세요.
            </Text>
          </View>
        }
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
  searchInput: {
    marginTop: 18,
    height: 50,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 6,
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
  emptyBox: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
    textAlign: 'center',
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
