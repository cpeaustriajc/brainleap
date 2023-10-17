import Image from 'next/image'

export default function Page() {
	return (
		<>
			<section className="playlist-details">
				<h1 className="heading">playlist details</h1>

				<div className="row">
					<div className="column">
						<form action="" method="post" className="save-playlist">
							<button type="submit">
								<i className="far fa-bookmark"></i>{' '}
								<span>save playlist</span>
							</button>
						</form>

						<div className="thumb">
							<Image src="/images/thumb-1.png" alt="" width="1280" height="720" />
							<span>69 videos</span>
						</div>
					</div>
					<div className="column">
						<div className="tutor">
							<Image src="/images/pic-2.jpg" alt="" width="1280" height="720" />
							<div>
								<h3>stephanie</h3>
								<span>10-10-2023</span>
							</div>
						</div>

						<div className="details">
							<h3>complete HTML tutorial</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Illum minus reiciendis, error
								sunt veritatis exercitationem deserunt velit
								doloribus itaque voluptate.
							</p>
							<a
								href="teacher_profile.html"
								className="inline-btn"
							>
								view profile
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="playlist-videos">
				<h1 className="heading">playlist videos</h1>

				<div className="box-container">
					<a className="box" href="watch-video.html">
						<i className="fas fa-play"></i>
						<Image src="/images/post-1-1.png" alt="" width="1280" height="720" />
						<h3>complete HTML tutorial (part 01)</h3>
					</a>

					<a className="box" href="watch-video.html">
						<i className="fas fa-play"></i>
						<Image src="/images/post-1-2.png" alt="" width="1280" height="720" />
						<h3>complete HTML tutorial (part 02)</h3>
					</a>

					<a className="box" href="watch-video.html">
						<i className="fas fa-play"></i>
						<Image src="/images/post-1-3.png" alt="" width="1280" height="720" />
						<h3>complete HTML tutorial (part 03)</h3>
					</a>

					<a className="box" href="watch-video.html">
						<i className="fas fa-play"></i>
						<Image src="/images/post-1-4.png" alt="" width="1280" height="720" />
						<h3>complete HTML tutorial (part 04)</h3>
					</a>

					<a className="box" href="watch-video.html">
						<i className="fas fa-play"></i>
						<Image src="/images/post-1-5.png" alt="" width="1280" height="720" />
						<h3>complete HTML tutorial (part 05)</h3>
					</a>

					<a className="box" href="watch-video.html">
						<i className="fas fa-play"></i>
						<Image src="/images/post-1-6.png" alt="" width="1280" height="720" />
						<h3>complete HTML tutorial (part 06)</h3>
					</a>
				</div>
			</section>
			<footer className="footer">
				PAMANTASAN NG LUNGSOD NG SAN PABLO
			</footer>
		</>
	)
}
