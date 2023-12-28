import { AuthForm } from '@/components/auth-form'

export default function Page() {
	return (
		<>
			<section className="h-[90svh] flex justify-center items-center">
				<div className="max-w-lg">
					<AuthForm />
				</div>
			</section>
		</>
	)
}
