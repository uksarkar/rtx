declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT?: string;
      APP_HOST?: string;
      DATABASE_URL?: string;
      SOURCE_API?: string;
      ALLOWED_ORIGINS?: string;
    }
  }
}

export {};
