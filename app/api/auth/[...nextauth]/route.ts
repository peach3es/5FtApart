import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../../../app/model/user"


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
    }
};
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}