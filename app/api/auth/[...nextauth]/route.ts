import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import User = require( "../../../../app/model/user");


const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", placeholder: "Enter Email"},
                password: {label: "Password", placeholder: "Password"},
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as { email: string; password: string };
                    try {
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null; 
                    }

                    if (password != user.password) {
                        return null;
                    }

                    return user;
                    } catch (error) {
                    console.log("Error: ", error);
                    }

            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
        signOut: "/login"
    },

    callbacks:{
        async jwt({token, user})
        {
            if(user && user._id)
            {
                token.uid = user.id.toString();
            }
        },
        return token;
    },

    async session({ session, token }) {
        // If the token has a uid field, add it to the session's user object
        if (token.uid) {
          session.user.id = token.uid; // This should be the MongoDB ObjectId as a string
        }
        return session;
      },
    };
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}