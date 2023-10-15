import Image from 'next/image'

export default function Page() {
	return (
		<>
			<div className="side-bar">
				<div id="close-btn">
					<i className="fas fa-times"></i>
				</div>

				<div className="profile">
					<Image src="images/pic-1.jpg" className="image" alt="" />
					<h3 className="name">ewan</h3>
					<p className="role">student</p>
					<a href="profile.html" className="btn">
						view profile
					</a>
				</div>

				<nav className="navbar">
					<a href="home.html">
						<i className="fas fa-home"></i>
						<span>home</span>
					</a>
					<a href="about.html">
						<i className="fas fa-question"></i>
						<span>about</span>
					</a>
					<a href="courses.html">
						<i className="fas fa-graduation-cap"></i>
						<span>courses</span>
					</a>
					<a href="teachers.html">
						<i className="fas fa-chalkboard-user"></i>
						<span>teachers</span>
					</a>
					<a href="contact.html">
						<i className="fas fa-headset"></i>
						<span>contact us</span>
					</a>
				</nav>
			</div>

			<section className="teachers">
				<h1 className="heading">expert teachers</h1>

				<form action="" method="post" className="search-tutor">
					<input
						type="text"
						name="search_box"
						placeholder="search tutors..."
						required
						maxlength="100"
					/>
					<button
						type="submit"
						className="fas fa-search"
						name="search_tutor"
					></button>
				</form>

				<div className="box-container">
					<div className="box offer">
						<h3>become a tutor</h3>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Eveniet, itaque ipsam fuga ex et aliquam.
						</p>
						<a href="register.html" className="inline-btn">
							get started
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="images/pic-2.jpg" alt="" />
							<div>
								<h3>elle</h3>
								<span>developer ng pagmamahal</span>
							</div>
						</div>
						<p>
							total playlists : <span>4</span>
						</p>
						<p>
							total videos : <span>18</span>
						</p>
						<p>
							total likes : <span>1208</span>
						</p>
						<a href="teacher_profile.html" className="inline-btn">
							view profile
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="images/pic-3.jpg" alt="" />
							<div>
								<h3>elle</h3>
								<span>developer ng pagmamahal</span>
							</div>
						</div>
						<p>
							total playlists : <span>4</span>
						</p>
						<p>
							total videos : <span>18</span>
						</p>
						<p>
							total likes : <span>1208</span>
						</p>
						<a href="teacher_profile.html" className="inline-btn">
							view profile
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="images/pic-4.jpg" alt="" />
							<div>
								<h3>elle</h3>
								<span>developer ng pagmamahal</span>
							</div>
						</div>
						<p>
							total playlists : <span>4</span>
						</p>
						<p>
							total videos : <span>18</span>
						</p>
						<p>
							total likes : <span>1208</span>
						</p>
						<a href="teacher_profile.html" className="inline-btn">
							view profile
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="images/pic-5.jpg" alt="" />
							<div>
								<h3>elle</h3>
								<span>developer ng pagmamahal</span>
							</div>
						</div>
						<p>
							total playlists : <span>4</span>
						</p>
						<p>
							total videos : <span>18</span>
						</p>
						<p>
							total likes : <span>1208</span>
						</p>
						<a href="teacher_profile.html" className="inline-btn">
							view profile
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="images/pic-6.jpg" alt="" />
							<div>
								<h3>elle</h3>
								<span>developer ng pagmamahal</span>
							</div>
						</div>
						<p>
							total playlists : <span>4</span>
						</p>
						<p>
							total videos : <span>18</span>
						</p>
						<p>
							total likes : <span>1208</span>
						</p>
						<a href="teacher_profile.html" className="inline-btn">
							view profile
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="images/pic-7.jpg" alt="" />
							<div>
								<h3>elle</h3>
								<span>developer ng pagmamahal</span>
							</div>
						</div>
						<p>
							total playlists : <span>4</span>
						</p>
						<p>
							total videos : <span>18</span>
						</p>
						<p>
							total likes : <span>1208</span>
						</p>
						<a href="teacher_profile.html" className="inline-btn">
							view profile
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="images/pic-8.jpg" alt="" />
							<div>
								<h3>elle</h3>
								<span>developer ng pagmamahal</span>
							</div>
						</div>
						<p>
							total playlists : <span>4</span>
						</p>
						<p>
							total videos : <span>18</span>
						</p>
						<p>
							total likes : <span>1208</span>
						</p>
						<a href="teacher_profile.html" className="inline-btn">
							view profile
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
