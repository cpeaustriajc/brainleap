import Image from 'next/image'

export default function Page() {
	return (
		<>
			<section className="about">
				<div className="row">
					<div className="image">
						<Image src="/images/about-img.svg" alt="" width="1280" height="720" />
					</div>

					<div className="content">
						<h3>PAMANTASAN NG LUNGSOD NG SAN PABLO</h3>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Ut dolorum quasi illo? Distinctio expedita
							commodi, nemo a quam error repellendus sint, fugiat
							quis numquam eum eveniet sequi aspernatur quaerat
							tenetur.
						</p>
						<a href="courses.html" className="inline-btn">
							our courses
						</a>
					</div>
				</div>

				<div className="box-container">
					<div className="box">
						<i className="fas fa-graduation-cap"></i>
						<div>
							<h3>+10k</h3>
							<p>online courses</p>
						</div>
					</div>

					<div className="box">
						<i className="fas fa-user-graduate"></i>
						<div>
							<h3>+40k</h3>
							<p>brilliant students</p>
						</div>
					</div>

					<div className="box">
						<i className="fas fa-chalkboard-user"></i>
						<div>
							<h3>+2k</h3>
							<p>expert tutors</p>
						</div>
					</div>

					<div className="box">
						<i className="fas fa-briefcase"></i>
						<div>
							<h3>100%</h3>
							<p>job placement</p>
						</div>
					</div>
				</div>
			</section>

			<section className="reviews">
				<h1 className="heading">student&apos;s reviews</h1>

				<div className="box-container">
					<div className="box">
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Necessitatibus, suscipit a. Quibusdam,
							dignissimos consectetur. Sed ullam iusto eveniet qui
							aut quibusdam vero voluptate libero facilis fuga.
							Eligendi eaque molestiae modi?
						</p>
						<div className="student">
							<Image src="/images/pic-2.jpg" alt="" width="1280" height="720" />
							<div>
								<h3>ronric</h3>
								<div className="stars">
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star-half-alt"></i>
								</div>
							</div>
						</div>
					</div>

					<div className="box">
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Necessitatibus, suscipit a. Quibusdam,
							dignissimos consectetur. Sed ullam iusto eveniet qui
							aut quibusdam vero voluptate libero facilis fuga.
							Eligendi eaque molestiae modi?
						</p>
						<div className="student">
							<Image src="/images/pic-3.jpg" alt="" width="1280" height="720" />
							<div>
								<h3>elle</h3>
								<div className="stars">
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star-half-alt"></i>
								</div>
							</div>
						</div>
					</div>

					<div className="box">
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Necessitatibus, suscipit a. Quibusdam,
							dignissimos consectetur. Sed ullam iusto eveniet qui
							aut quibusdam vero voluptate libero facilis fuga.
							Eligendi eaque molestiae modi?
						</p>
						<div className="student">
							<Image src="/images/pic-4.jpg" alt="" width="1280" height="720" />
							<div>
								<h3>jericho</h3>
								<div className="stars">
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star-half-alt"></i>
								</div>
							</div>
						</div>
					</div>

					<div className="box">
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Necessitatibus, suscipit a. Quibusdam,
							dignissimos consectetur. Sed ullam iusto eveniet qui
							aut quibusdam vero voluptate libero facilis fuga.
							Eligendi eaque molestiae modi?
						</p>
						<div className="student">
							<Image src="/images/pic-5.jpg" alt="" width="1280" height="720" />
							<div>
								<h3>stephanie</h3>
								<div className="stars">
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star-half-alt"></i>
								</div>
							</div>
						</div>
					</div>

					<div className="box">
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Necessitatibus, suscipit a. Quibusdam,
							dignissimos consectetur. Sed ullam iusto eveniet qui
							aut quibusdam vero voluptate libero facilis fuga.
							Eligendi eaque molestiae modi?
						</p>
						<div className="student">
							<Image src="/images/pic-6.jpg" alt="" width="1280" height="720" />
							<div>
								<h3>ndi ko na alam</h3>
								<div className="stars">
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star-half-alt"></i>
								</div>
							</div>
						</div>
					</div>

					<div className="box">
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Necessitatibus, suscipit a. Quibusdam,
							dignissimos consectetur. Sed ullam iusto eveniet qui
							aut quibusdam vero voluptate libero facilis fuga.
							Eligendi eaque molestiae modi?
						</p>
						<div className="student">
							<Image src="/images/pic-7.jpg" alt="" width="1280" height="720" />
							<div>
								<h3>inutil</h3>
								<div className="stars">
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star-half-alt"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<footer className="footer">
				PAMANTASAN NG LUNGSOD NG SAN PABLO
			</footer>
		</>
	)
}
