import { Footer } from '@/components/footer'
import { AuthForm } from '@/components/auth-form'

export default function Page() {
	return (
		<>
			<section className="min-h-[90svh] flex justify-center items-center">
				<div className="max-w-sm">
					<AuthForm />
				</div>
			</section>
			<Footer />
		</>
	)
}
