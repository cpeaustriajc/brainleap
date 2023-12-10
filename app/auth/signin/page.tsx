import { AuthForm } from '@/components/auth-form'

export default function Page({
	searchParams,
}: {
	searchParams: { message: string }
}) {
	const { message } = searchParams
	return (
		<>
			<section className="h-[90svh] flex justify-center items-center">
				<div className="max-w-lg">
					<AuthForm message={message} />
				</div>
			</section>
		</>
	)
}
