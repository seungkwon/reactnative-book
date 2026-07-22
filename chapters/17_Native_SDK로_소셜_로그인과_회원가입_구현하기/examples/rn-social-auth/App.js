import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication';
import { login, me } from '@react-native-kakao/user';
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [statusLabel, setStatusLabel] = useState('소셜 로그인을 선택해 회원가입을 시작하세요.');
  const [memberProfile, setMemberProfile] = useState(null);

  const signInWithKakao = async () => {
    try {
      setStatusLabel('카카오 로그인을 진행하는 중입니다.');
      await login();
      const user = await me();

      setMemberProfile({
        provider: 'kakao',
        name: user.nickname ?? '카카오 사용자',
        email: user.email ?? '이메일 비공개',
      });
      setStatusLabel('카카오 계정으로 회원가입을 완료했습니다.');
    } catch (error) {
      setStatusLabel(`카카오 로그인 오류: ${error.message}`);
    }
  };

  const signInWithApple = async () => {
    if (Platform.OS !== 'ios') {
      setStatusLabel('Apple 로그인은 iOS에서 테스트하세요.');
      return;
    }

    try {
      setStatusLabel('Apple 로그인을 진행하는 중입니다.');
      const response = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      setMemberProfile({
        provider: 'apple',
        name: response.fullName?.givenName ?? 'Apple 사용자',
        email: response.email ?? '이메일 비공개',
      });
      setStatusLabel('Apple 계정으로 회원가입을 완료했습니다.');
    } catch (error) {
      setStatusLabel(`Apple 로그인 오류: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.badge}>Chapter 17</Text>
      <Text style={styles.title}>소셜 로그인 회원가입</Text>
      <Text style={styles.subtitle}>
        카카오 Native SDK와 Apple 로그인으로 가입을 시작하고 프로필 카드를 완성합니다.
      </Text>

      <View style={styles.loginCard}>
        <Pressable style={styles.kakaoButton} onPress={signInWithKakao}>
          <Text style={styles.kakaoButtonText}>카카오로 시작하기</Text>
        </Pressable>

        <View style={styles.appleWrap}>
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.appleButton}
            onPress={signInWithApple}
          />
        </View>

        <Text style={styles.statusText}>{statusLabel}</Text>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.profileLabel}>가입 결과</Text>
        <Text style={styles.profileTitle}>
          {memberProfile ? `${memberProfile.name} 님 가입 완료` : '아직 회원가입 전'}
        </Text>
        <Text style={styles.profileValue}>
          로그인 방식: {memberProfile?.provider ?? '선택 전'}
        </Text>
        <Text style={styles.profileValue}>
          이메일: {memberProfile?.email ?? '로그인 후 표시'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fef3c7',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  badge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#d97706',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#451a03',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: '#92400e',
  },
  loginCard: {
    marginTop: 24,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  kakaoButton: {
    borderRadius: 18,
    backgroundColor: '#fee500',
    paddingVertical: 16,
    alignItems: 'center',
  },
  kakaoButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#191919',
  },
  appleWrap: {
    marginTop: 12,
  },
  appleButton: {
    width: '100%',
    height: 52,
  },
  statusText: {
    marginTop: 14,
    fontSize: 14,
    lineHeight: 21,
    color: '#92400e',
  },
  profileCard: {
    marginTop: 16,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  profileLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#d97706',
  },
  profileTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '800',
    color: '#451a03',
  },
  profileValue: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: '#4b5563',
  },
});
