/** @type {import('next').NextConfig} */
const config = {
	experimental: {
		ppr: true,
	},
	logging: {
		fetches: { fullUrl: true },
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
			},
		],
	},
}

export default config
