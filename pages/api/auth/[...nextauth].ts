import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';

export default NextAuth({
  providers: [
    // 사용하고 싶은 OAuth 추가해주기 - clientId, clientSecret 입력.
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
  ],
});
