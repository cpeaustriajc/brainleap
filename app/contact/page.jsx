import Image from 'next/image'

export default function Contact() {
	return (
		<>
			<section className="contact">
				<div className="row">
					<div className="image">
						<Image src="/images/contact-img.svg" alt="" width="1280" height="720" />
					</div>
					<form action="" method="post">
						<h3>Send a message.</h3>
						<input
							type="text"
							placeholder="enter your name"
							name="name"
							required
							maxlength="50"
							className="box"
						/>
						<input
							type="email"
							placeholder="enter your email"
							name="email"
							required
							maxlength="50"
							className="box"
						/>
						<input
							type="number"
							placeholder="enter your number"
							name="number"
							required
							maxlength="50"
							className="box"
						/>
						<textarea
							name="msg"
							className="box"
							placeholder="enter your message"
							required
							maxlength="1000"
							cols="30"
							rows="10"
						></textarea>
						<input
							type="submit"
							value="send message"
							className="inline-btn"
							name="submit"
						/>
					</form>
				</div>

				<div className="box-container">
					<div className="box">
						<i className="fas fa-phone"></i>
						<h3>phone number</h3>
						<a href="tel:09123456789">09123456789</a>
						<a href="tel:1112223333">111-222-3333</a>
					</div>

					<div className="box">
						<i className="fas fa-envelope"></i>
						<h3>email address</h3>
						<a href="mailto:minahalkita@gmail.com">
							minahalkita@gmail.com
						</a>
						<a href="mailto:missnakita@gmail.com">
							missnakita@gmail.come
						</a>
					</div>

					<div className="box">
						<i className="fas fa-map-marker-alt"></i>
						<h3>office address</h3>
						<a href="#">
							Miss na kita balik ka na ito address ko block 69 lot
							69 miss ka na st.{' '}
						</a>
					</div>
				</div>
			</section>

			<footer className="footer">
				PAMANTASAN NG LUNGSOD NG SAN PABLO
			</footer>
		</>
	)
}
