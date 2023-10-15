export default function Page() {
	return (
		<>
			<section className="form-container">
				<form action="" method="post" enctype="multipart/form-data">
					<h3>login now</h3>
					<p>
						your email <span>*</span>
					</p>
					<input
						type="email"
						name="email"
						placeholder="enter your email"
						required
						maxlength="50"
						className="box"
					/>
					<p>
						your password <span>*</span>
					</p>
					<input
						type="password"
						name="pass"
						placeholder="enter your password"
						required
						maxlength="20"
						className="box"
					/>
					<input
						type="submit"
						value="login new"
						name="submit"
						className="btn"
					/>
				</form>
			</section>
			<footer className="footer">
				PAMANTASAN NG LUNGSOD NG SAN PABLO
			</footer>
		</>
	)
}
