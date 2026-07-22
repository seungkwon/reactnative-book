import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function App() {
  const [token, setToken] = useState('아직 토큰을 발급받지 않았습니다.');
  const [permissionLabel, setPermissionLabel] = useState('권한 요청 전');
  const [messages, setMessages] = useState([
    { id: 'guide-1', text: 'FCM 권한을 요청하고 토큰을 확인하세요.' },
  ]);

  useEffect(() => {
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      const title = remoteMessage.notification?.title ?? '새 메시지';
      const body = remoteMessage.notification?.body ?? JSON.stringify(remoteMessage.data ?? {});

      setMessages((current) => [
        { id: `msg-${Date.now()}`, text: `${title}: ${body}` },
        ...current,
      ]);

      Alert.alert(title, body);
    });

    const unsubscribeOpened = messaging().onNotificationOpenedApp((remoteMessage) => {
      setMessages((current) => [
        {
          id: `open-${Date.now()}`,
          text: `알림 탭으로 앱 열림: ${remoteMessage.notification?.title ?? '제목 없음'}`,
        },
        ...current,
      ]);
    });

    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
    };
  }, []);

  const setupPush = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    setPermissionLabel(enabled ? '권한 허용됨' : '권한 거부됨');

    if (!enabled) {
      return;
    }

    await messaging().registerDeviceForRemoteMessages();
    const nextToken = await messaging().getToken();
    setToken(nextToken);
    setMessages((current) => [
      { id: `token-${Date.now()}`, text: 'FCM 토큰을 발급받았습니다.' },
      ...current,
    ]);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.badge}>Chapter 13</Text>
      <Text style={styles.title}>FCM 푸시 메시지</Text>
      <Text style={styles.subtitle}>
        네이티브 Firebase Messaging으로 토큰을 발급받고 수신 메시지를 처리합니다.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>권한 상태</Text>
        <Text style={styles.value}>{permissionLabel}</Text>

        <Text style={[styles.label, styles.spaced]}>FCM 토큰</Text>
        <Text style={styles.tokenText}>{token}</Text>
      </View>

      <Pressable style={styles.button} onPress={setupPush}>
        <Text style={styles.buttonText}>권한 요청 및 토큰 발급</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>수신 로그</Text>
      <ScrollView style={styles.logList} contentContainerStyle={styles.logContent}>
        {messages.map((message) => (
          <View key={message.id} style={styles.logCard}>
            <Text style={styles.logText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ecfccb',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  badge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#65a30d',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#1a2e05',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: '#4d7c0f',
  },
  card: {
    marginTop: 24,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#65a30d',
  },
  spaced: {
    marginTop: 18,
  },
  value: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  tokenText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: '#334155',
  },
  button: {
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: '#65a30d',
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  sectionTitle: {
    marginTop: 22,
    fontSize: 17,
    fontWeight: '800',
    color: '#1a2e05',
  },
  logList: {
    flex: 1,
    marginTop: 12,
  },
  logContent: {
    gap: 10,
    paddingBottom: 24,
  },
  logCard: {
    borderRadius: 18,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  logText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#334155',
  },
});
