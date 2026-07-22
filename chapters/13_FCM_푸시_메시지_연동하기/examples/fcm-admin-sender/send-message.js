const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');

const token = process.argv[2];

if (!token) {
  console.error('Usage: npm start -- <FCM_TOKEN>');
  process.exit(1);
}

initializeApp({
  credential: applicationDefault(),
});

const message = {
  token,
  notification: {
    title: 'FCM 테스트 메시지',
    body: 'Firebase Admin SDK에서 보낸 푸시 알림입니다.',
  },
  data: {
    screen: 'PushInbox',
    sentAt: new Date().toISOString(),
  },
  android: {
    priority: 'high',
  },
};

getMessaging()
  .send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.error('Error sending message:', error);
    process.exit(1);
  });
