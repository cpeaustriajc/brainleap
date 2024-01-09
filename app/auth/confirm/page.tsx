export default function Page() {
	return (
		<section className="py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
						Magic Link Sent
					</h2>
					<p className="mt-2 text-center text-sm text-foreground">
						We have sent a magic link to your email address. Please
						check your inbox and click on the link to proceed.
					</p>
				</div>
				<div className="rounded-md bg-primary p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								aria-hidden="true"
								className="h-5 w-5 text-secondary"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									clipRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									fillRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-secondary">
								Magic link sent successfully!
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
