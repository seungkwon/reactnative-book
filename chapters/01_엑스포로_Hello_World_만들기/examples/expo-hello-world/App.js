import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Chapter 01</Text>
      <Text style={styles.title}>Hello World</Text>
      <Text style={styles.subtitle}>엑스포로 만드는 첫 리액트 네이티브 앱</Text>
      <Text style={styles.description}>
        Windows 환경에서 Expo 프로젝트를 만들고 첫 화면을 확인합니다.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f7fb',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  badge: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1d4ed8',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
    color: '#334155',
    textAlign: 'center',
  },
});
