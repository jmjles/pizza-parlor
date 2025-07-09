import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    serverExternalPackages:["mongoose"],
    // and the following to enable top-level await support for Webpack
    webpack: (config) => {
        config.experiments = {
            topLevelAwait: true
        };
        return config;
    },
    turbopack:{

    }
}

export default nextConfig;
``