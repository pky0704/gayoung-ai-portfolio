export default {
  turbopack: {root:process.cwd()},
  poweredByHeader: false,
  outputFileTracingIncludes: {'/work':['./ui/index.html']},
  async headers() { return [{ source: '/:path*', headers: [
    {key:'X-Content-Type-Options',value:'nosniff'},
    {key:'X-Frame-Options',value:'DENY'},
    {key:'Referrer-Policy',value:'no-referrer'},
    {key:'X-Robots-Tag',value:'noindex, nofollow, noarchive'}
  ]}]; }
};
