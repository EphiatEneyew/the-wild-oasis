/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
        protocol: "https",
        hostname: "lkcfztjchirpwyujenqg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/cabins/**"
    },
],
},

//output: "export"
};

export default nextConfig;
