import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { allowGoogle, allowedEmail } from './lib/policy.mjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google({authorization:{params:{scope:'openid email profile',prompt:'select_account'}}})],
  session: {strategy:'jwt',maxAge:8*60*60},
  pages: {signIn:'/',error:'/'},
  callbacks: {
    signIn({account,profile}) { return allowGoogle(account,profile,process.env.ADMIN_EMAIL); },
    jwt({token,account,profile}) {
      if(account) token.admin = allowGoogle(account,profile,process.env.ADMIN_EMAIL);
      if(!allowedEmail(token.email,process.env.ADMIN_EMAIL)) token.admin=false;
      return token;
    },
    session({session,token}) {
      session.isAdmin = token.admin === true && allowedEmail(token.email,process.env.ADMIN_EMAIL);
      return session;
    }
  }
});
