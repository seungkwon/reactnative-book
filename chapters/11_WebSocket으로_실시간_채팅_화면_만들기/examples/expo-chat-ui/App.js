import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const WS_URL = 'ws://192.168.0.10:8080';
const USER_ID = 'me';

const initialMessages = [
  {
    id: 'welcome-1',
    sender: 'system',
    text: '채팅 서버 연결을 준비합니다.',
    time: '오전 9:00',
  },
  {
    id: 'welcome-2',
    sender: 'guide',
    text: '12장에서 서버를 만들면 이 화면이 실제 메시지를 주고받습니다.',
    time: '오전 9:01',
  },
];

export default function App() {
  const socketRef = useRef(null);
  const scrollRef = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState('연결 준비 중');
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;
    setConnectionStatus('연결 시도 중');

    socket.onopen = () => {
      setConnectionStatus('연결됨');
      setMessages((current) => [
        ...current,
        {
          id: `system-${Date.now()}`,
          sender: 'system',
          text: '서버와 WebSocket 연결이 열렸습니다.',
          time: formatTime(),
        },
      ]);
    };

    socket.onmessage = (event) => {
      setMessages((current) => [
        ...current,
        {
          id: `remote-${Date.now()}`,
          sender: 'other',
          text: event.data,
          time: formatTime(),
        },
      ]);
    };

    socket.onerror = () => {
      setConnectionStatus('연결 오류');
    };

    socket.onclose = () => {
      setConnectionStatus('연결 종료');
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      return;
    }

    const nextMessage = {
      id: `local-${Date.now()}`,
      sender: USER_ID,
      text: trimmed,
      time: formatTime(),
    };

    setMessages((current) => [...current, nextMessage]);
    setInputText('');

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(trimmed);
    } else {
      setMessages((current) => [
        ...current,
        {
          id: `system-warning-${Date.now()}`,
          sender: 'system',
          text: '아직 서버와 연결되지 않아 로컬 화면에만 메시지를 표시했습니다.',
          time: formatTime(),
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.badge}>Chapter 11</Text>
            <Text style={styles.title}>WebSocket 채팅 화면</Text>
            <Text style={styles.subtitle}>연결 상태와 메시지 흐름을 한 화면에서 확인합니다.</Text>
          </View>
          <View style={styles.statusPill}>
            <View style={[styles.statusDot, getStatusDotStyle(connectionStatus)]} />
            <Text style={styles.statusText}>{connectionStatus}</Text>
          </View>
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.messageList}
          contentContainerStyle={styles.messageContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => {
            const isMine = message.sender === USER_ID;
            const isSystem = message.sender === 'system';

            return (
              <View
                key={message.id}
                style={[
                  styles.messageRow,
                  isMine ? styles.myRow : styles.otherRow,
                  isSystem ? styles.systemRow : null,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    isMine ? styles.myBubble : styles.otherBubble,
                    isSystem ? styles.systemBubble : null,
                  ]}
                >
                  <Text style={[styles.messageText, isSystem ? styles.systemText : null]}>
                    {message.text}
                  </Text>
                  <Text style={styles.timeText}>{message.time}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.inputPanel}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="보낼 메시지를 입력하세요"
            placeholderTextColor="#64748b"
          />
          <Pressable style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>전송</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

function formatTime() {
  return new Date().toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getStatusDotStyle(status) {
  if (status === '연결됨') {
    return { backgroundColor: '#10b981' };
  }

  if (status === '연결 오류' || status === '연결 종료') {
    return { backgroundColor: '#ef4444' };
  }

  return { backgroundColor: '#f59e0b' };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#eff6ff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    gap: 14,
  },
  badge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563eb',
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
  statusPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  messageList: {
    flex: 1,
  },
  messageContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  messageRow: {
    flexDirection: 'row',
  },
  myRow: {
    justifyContent: 'flex-end',
  },
  otherRow: {
    justifyContent: 'flex-start',
  },
  systemRow: {
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  myBubble: {
    backgroundColor: '#2563eb',
    borderBottomRightRadius: 8,
  },
  otherBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 8,
  },
  systemBubble: {
    backgroundColor: '#dbeafe',
    borderRadius: 18,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#0f172a',
  },
  systemText: {
    textAlign: 'center',
  },
  timeText: {
    marginTop: 8,
    fontSize: 12,
    color: '#475569',
  },
  inputPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 18,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    minHeight: 52,
    borderRadius: 18,
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0f172a',
  },
  sendButton: {
    borderRadius: 18,
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sendButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
});
