/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly COOKIE_SECRET_CURRENT: string;
    readonly COOKIE_SECRET_PREVIOUS: string;
    readonly FIREBASE_PRIVATE_KEY: string;
    readonly FIREBASE_CLIENT_EMAIL: string;
    readonly NEXT_PUBLIC_FIREBASE_API_KEY: string;
    readonly NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    readonly NEXT_PUBLIC_FIREBASE_STORAGE_URL: string;
    readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    readonly NEXT_PUBLIC_API_URL: string;
    // readonly NEXT_PUBLIC_FIREBASE_APP_ID: string; // envとしては存在するが使っていないためコメントアウト
    // readonly NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string; // envとしては存在するが使っていないためコメントアウト
    // readonly NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string; // envとしては存在するが使っていないためコメントアウト
  }
}
