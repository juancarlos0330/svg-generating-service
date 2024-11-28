import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import DiscordProvider from "next-auth/providers/discord";
import TwitterProvider from "next-auth/providers/twitter";
// import { Address } from "@/utils/web3/useContractAddressByChain";
// import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const nextAuthHandler = (req, res) =>
  NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers
    providers: [
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET
      })
    ],
    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/configuration/databases
    //
    // Notes:
    // * You must install an appropriate node_module for your database
    // * The Email provider requires a database (OAuth providers do not)
    // database: process.env.DATABASE_URL,

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.CLIENT_SECRET,

    session: {
      // Use JSON Web Tokens for session instead of database sessions.
      // This option can be used with or without a database for users/accounts.
      // Note: `strategy` should be set to 'jwt' if no database is used.
      strategy: "jwt"

      // Seconds - How long until an idle session expires and is no longer valid.
      // maxAge: 30 * 24 * 60 * 60, // 30 days

      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
      // A secret to use for key generation (you should set this explicitly)
      secret: process.env.CLIENT_SECRET
      // Set to true to use encryption (default: false)
      // encryption: true,
      // You can define your own encode/decode functions for signing and encryption
      // if you want to override the default behaviour.
      // encode: async ({ secret, token, maxAge }) => {},
      // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
      // signIn: '/auth/signin',  // Displays signin buttons
      // signOut: '/auth/signout', // Displays form with sign out button
      // error: '/auth/error', // Error code passed in query string as ?error=
      // verifyRequest: '/auth/verify-request', // Used for check email page
      // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
      async jwt({ token, user, account, profile, isNewUser, cookies, session }) {
        console.log("JWT CALLBACK", token, account, user, profile, isNewUser);
        let provider = account?.provider;
        console.log("CHAIN", req.cookies);
        const callbackUrl = req.cookies["next-auth.callback-url"] || req.cookies["__Secure-next-auth.callback-url"];
        console.log(callbackUrl);
        const id = callbackUrl.split("&id=")[1];
        console.log(id);
        // let additionalAuthParams = JSON.parse(req.cookies.additionalAuthParams).appPublicKey;
        // const provider = params.account?.provider ?? params.token?.provider;
        // console.log('PARAMETERS RIGHT NOW', params);
        if (provider === "discord") {
          try {
            console.log("DISCORD");

            verifyDiscord(id);

            // await prisma.domain.update({
            //   where: {
            //     id: id
            //   },
            //   data: { discordVerified: true }
            // });
            // const response = await fetch(
            // 	`https://api.${import.meta.env.VITE_API_URL}/api/v1/auth/social/`,
            // 	{
            // 		method: 'POST',
            // 		headers: {
            // 			'Content-Type': 'application/json'
            // 		},
            // 		body: JSON.stringify({
            // 			first_name: params.profile?.given_name,
            // 			last_name: params.profile?.family_name,
            // 			access_token: access_token,
            // 			provider: 'google-oauth2'
            // 		})
            // 	}
            // );
            // if (!response.ok) {
            // 	const erro = await response.json();
            // 	console.log(erro);
            // 	throw new Error('Failed to authenticate user with provider');
            // }
            // const data = await response.json();
          } catch (e) {
            console.error("Failed to fetch user data:", e);
            return null;
          }
        } else if (provider === "twitter") {
          try {
            console.log("TWITTER");
            verifyTwitter(id);

            // console.log(metadata);
            // const response = await fetch(
            // 	`https://api.${import.meta.env.VITE_API_URL}/api/v1/auth/social/`,
            // 	{
            // 		method: 'POST',
            // 		headers: {
            // 			'Content-Type': 'application/json'
            // 		},
            // 		body: JSON.stringify({
            // 			first_name: params.profile?.given_name,
            // 			last_name: params.profile?.family_name,
            // 			access_token: access_token,
            // 			provider: 'google-oauth2'
            // 		})
            // 	}
            // );
            // if (!response.ok) {
            // 	const erro = await response.json();
            // 	console.log(erro);
            // 	throw new Error('Failed to authenticate user with provider');
            // }
            // const data = await response.json();
          } catch (e) {
            console.error("Failed to fetch user data:", e);
            return null;
          }
        }
      }
      // async signIn({ user, account, profile, email, credentials }) { return true },
      // async redirect({ url, baseUrl }) { return baseUrl },
      // async session({ session, token, user }) { return session },
      // async jwt({ token, user, account, profile, isNewUser }) { return token }
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: false
  });

export default nextAuthHandler;

async function verifyDiscord(id) {
  await prisma.domain.update({
    where: {
      id: Number(id)
    },
    data: { discordVerified: true }
  });
}

async function verifyTwitter(id) {
  await prisma.domain.update({
    where: {
      id: Number(id)
    },
    data: { twitterVerified: true }
  });
}
