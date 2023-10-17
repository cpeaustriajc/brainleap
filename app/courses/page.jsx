import Image from 'next/image'

export default function Page() {
	return (
		<>
			<section className="courses">
				<h1 className="heading">our courses</h1>

				<div className="box-container">
					<div className="box">
						<div className="tutor">
							<Image src="/images/pic-2.jpg" alt="" width="1280" height="720" />
							<div className="info">
								<h3>ronric</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="thumb">
							<Image src="/images/thumb-1.png" alt="" width="1280" height="720" />
							<span>69 videos</span>
						</div>
						<h3 className="title">complete HTML tutorial</h3>
						<a href="playlist.html" className="inline-btn">
							view playlist
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="/images/pic-3.jpg" alt="" width="1280" height="720" />
							<div className="info">
								<h3>ronric</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="thumb">
							<Image src="/images/thumb-2.png" alt="" width="1280" height="720" />
							<span>69 videos</span>
						</div>
						<h3 className="title">complete CSS tutorial</h3>
						<a href="playlist.html" className="inline-btn">
							view playlist
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="/images/pic-4.jpg" alt="" width="1280" height="720" />
							<div className="info">
								<h3>ronric</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="thumb">
							<Image src="/images/thumb-3.png" alt="" width="1280" height="720" />
							<span>69 videos</span>
						</div>
						<h3 className="title">complete JS tutorial</h3>
						<a href="playlist.html" className="inline-btn">
							view playlist
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="/images/pic-5.jpg" alt="" width="1280" height="720" />
							<div className="info">
								<h3>ronric</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="thumb">
							<Image src="/images/thumb-4.png" alt="" width="1280" height="720" />
							<span>69 videos</span>
						</div>
						<h3 className="title">complete Boostrap tutorial</h3>
						<a href="playlist.html" className="inline-btn">
							view playlist
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="/images/pic-6.jpg" alt="" width="1280" height="720" />
							<div className="info">
								<h3>ronric</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="thumb">
							<Image src="/images/thumb-5.png" alt="" width="1280" height="720" />
							<span>69 videos</span>
						</div>
						<h3 className="title">complete JQuery tutorial</h3>
						<a href="playlist.html" className="inline-btn">
							view playlist
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="/images/pic-7.jpg" alt="" width="1280" height="720" />
							<div className="info">
								<h3>ronric</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="thumb">
							<Image src="/images/thumb-6.png" alt="" width="1280" height="720" />
							<span>69 videos</span>
						</div>
						<h3 className="title">complete SASS tutorial</h3>
						<a href="playlist.html" className="inline-btn">
							view playlist
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="/images/pic-8.jpg" alt="" width="1280" height="720" />
							<div className="info">
								<h3>ronric</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="thumb">
							<Image src="/images/thumb-7.png" alt="" width="1280" height="720" />
							<span>69 videos</span>
						</div>
						<h3 className="title">complete PHP tutorial</h3>
						<a href="playlist.html" className="inline-btn">
							view playlist
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="/images/pic-9.jpg" alt="" width="1280" height="720" />
							<div className="info">
								<h3>ronric</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="thumb">
							<Image src="/images/thumb-8.png" alt="" width="1280" height="720" />
							<span>69 videos</span>
						</div>
						<h3 className="title">complete MySQL tutorial</h3>
						<a href="playlist.html" className="inline-btn">
							view playlist
						</a>
					</div>

					<div className="box">
						<div className="tutor">
							<Image src="/images/pic-1.jpg" alt="" width="1280" height="720" />
							<div className="info">
								<h3>ronric</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="thumb">
							<Image src="/images/thumb-9.png" alt="" width="1280" height="720" />
							<span>69 videos</span>
						</div>
						<h3 className="title">complete react tutorial</h3>
						<a href="playlist.html" className="inline-btn">
							view playlist
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
