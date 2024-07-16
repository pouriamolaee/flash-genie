import withPWAInit from "@ducanh2912/next-pwa";

const isDevEnv = process.env.NODE_ENV === "development"

const withPWA = withPWAInit({
    dest: "public",
    disable: isDevEnv,
    cacheOnFrontEndNav: !isDevEnv,
    aggressiveFrontEndNavCaching: !isDevEnv,
    cacheStartUrl: !isDevEnv,
    fallbacks: {
        document: "/offline"
    },
});

export default withPWA({
});