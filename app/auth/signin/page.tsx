import { AuthForm } from '@/components/auth-form'

export default function Page() {
	return (
		<>
			<section className="min-h-[90lvh] flex justify-center items-center">
				<div className="max-w-sm">
					<AuthForm />
				</div>
			</section>
		</>
	)
}
