/** @type {import('next').NextConfig} */
const config = {
	experimental: {
		ppr: true
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
			},
		],
		domains: ['loremflickr.com'],
	},
}

export default config
