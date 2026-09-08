/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
   async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://taskflow-vxqe.onrender.com/api/:path*',
      },
    ];
  },
};


export default nextConfig;
