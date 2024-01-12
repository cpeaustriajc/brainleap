/** @type {import('next').NextConfig} */
const config = {
	experimental: {
		optimizePackageImports: ['react-aria-components'],
	},
	logging: {
		fetches: { fullUrl: true },
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
			},
		],
	},
}

export default config
