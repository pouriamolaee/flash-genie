import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    cacheOnFrontendNav:true,
    aggressiveFrontEndNavCaching: true,
    cacheStartUrl: true,
    fallbacks: {
        document: "/offline"
    }
});

export default withPWA({
});