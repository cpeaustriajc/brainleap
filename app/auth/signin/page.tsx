import { Footer } from '@/components/footer'
import { LoginForm } from '@/components/login-form'

export default function Page() {
	return (
		<>
			<section className="min-h-[90svh] flex justify-center items-center">
				<div className="max-w-sm">
					<LoginForm />
				</div>
			</section>
			<Footer />
		</>
	)
}
