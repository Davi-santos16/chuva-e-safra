/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: { unoptimized: true },
    experimental: {
        useTypeScriptCli: false,
    },
};

export default nextConfig;
