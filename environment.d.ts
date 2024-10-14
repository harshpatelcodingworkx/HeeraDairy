declare global {
    export namespace NodeJS {
        interface ProcessEnv {
            SECRET_KEY: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
        }
    }
}
