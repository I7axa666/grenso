/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL_V1: string;
    // добавьте другие переменные окружения, если необходимо
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}