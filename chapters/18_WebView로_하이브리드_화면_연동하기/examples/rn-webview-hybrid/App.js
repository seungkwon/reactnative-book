import { useRef, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const htmlSource = `
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #eff6ff; margin: 0; padding: 24px; }
      .card { background: white; border-radius: 24px; padding: 24px; }
      .title { font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 10px; }
      .desc { font-size: 15px; line-height: 1.6; color: #475569; }
      .button { margin-top: 18px; padding: 14px 16px; border: none; border-radius: 16px; background: #2563eb; color: white; font-size: 15px; font-weight: 700; width: 100%; }
      .message { margin-top: 16px; color: #1e293b; font-size: 14px; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="title">하이브리드 이벤트 패널</div>
      <div class="desc">이 버튼을 누르면 WebView 안의 웹 화면이 React Native 쪽으로 메시지를 보냅니다.</div>
      <button class="button" onclick="sendToNative()">웹에서 네이티브로 전달</button>
      <div class="message" id="message">아직 전달된 메시지가 없습니다.</div>
    </div>
    <script>
      function sendToNative() {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'WEB_ACTION',
          title: '웹 화면에서 보낸 이벤트',
          sentAt: new Date().toISOString()
        }));
      }
      window.showNativeMessage = function(message) {
        document.getElementById('message').innerText = message;
      };
    </script>
  </body>
 </html>
`;

export default function App() {
  const webviewRef = useRef(null);
  const [lastMessage, setLastMessage] = useState('아직 웹에서 받은 메시지가 없습니다.');

  const handleMessage = (event) => {
    try {
      const payload = JSON.parse(event.nativeEvent.data);
      setLastMessage(`${payload.title} / ${payload.sentAt}`);
    } catch (error) {
      setLastMessage(`메시지 파싱 오류: ${error.message}`);
    }
  };

  const sendToWeb = () => {
    webviewRef.current?.injectJavaScript(`
      window.showNativeMessage('React Native에서 보낸 확인 메시지가 웹 화면에 반영되었습니다.');
      true;
    `);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.badge}>Chapter 18</Text>
      <Text style={styles.title}>WebView 하이브리드</Text>
      <Text style={styles.subtitle}>
        웹 화면과 네이티브 화면이 서로 메시지를 주고받는 가장 기본적인 하이브리드 구조입니다.
      </Text>

      <View style={styles.messageCard}>
        <Text style={styles.label}>최근 수신 메시지</Text>
        <Text style={styles.messageText}>{lastMessage}</Text>
      </View>

      <Pressable style={styles.button} onPress={sendToWeb}>
        <Text style={styles.buttonText}>네이티브에서 웹으로 보내기</Text>
      </Pressable>

      <View style={styles.webviewCard}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: htmlSource }}
          onMessage={handleMessage}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#dbeafe',
    paddingHorizontal: 20,
    paddingTop: 24,
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
    color: '#334155',
  },
  messageCard: {
    marginTop: 22,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563eb',
  },
  messageText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#334155',
  },
  button: {
    marginTop: 14,
    borderRadius: 18,
    backgroundColor: '#0f172a',
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  webviewCard: {
    flex: 1,
    marginTop: 16,
    marginBottom: 18,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
});
