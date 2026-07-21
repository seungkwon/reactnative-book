import { StatusBar } from 'expo-status-bar';
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
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.badge}>Chapter 02</Text>
        <Image
          source={avatarImage}
          style={styles.avatar}
        />
        <Text style={styles.name}>코딩하는 리액트 개발자</Text>
        <Text style={styles.role}>React Native UI Starter</Text>
        <Text style={styles.description}>
          View, Text, Image, TextInput, Pressable을 한 화면에서 연습합니다.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="별명을 입력해 보세요"
          placeholderTextColor="#94a3b8"
        />

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>프로필 완성하기</Text>
        </Pressable>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e0f2fe',
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
    color: '#0284c7',
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
    color: '#0369a1',
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
    borderColor: '#bae6fd',
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
    backgroundColor: '#0284c7',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
});
