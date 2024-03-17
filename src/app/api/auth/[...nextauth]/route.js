import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github';


const authOptions = {
	providers: [
		GithubProvider({
			clientId: 'Iv1.c71aeebc0205ad30',
			clientSecret: 'c42245d78ee8888b9d2998f9eae9b97365c7eb32'
		})
	],

	callbacks: {
		async session({ session, token, user }) {
			session.user.username = session?.user?.name
				.split(" ")
				.join("")
				.toLocaleLowerCase();
			
			session.user.uid = token.sub;
			

			return session;
		}
	},

	secret: "default_secret_key"
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
