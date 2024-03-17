import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github';


const authOptions = {
	providers: [
		GithubProvider({
			clientId: 'Iv1.c71aeebc0205ad30',
			clientSecret: 'ba6f475936924f3a6e14188028ccb7505bd6e9dd'
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
