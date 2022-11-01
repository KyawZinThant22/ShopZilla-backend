declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      SEC_KEY: string | number;
      DATABASE: string;
      PASSWORD: string;
      USERNAME: string;
    }
  }
}
export {};
