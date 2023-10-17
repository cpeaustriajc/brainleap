import Image from 'next/image'

export default function Page() {
	return (
		<>
			<section className="teacher-profile">
				<h1 className="heading">profile details</h1>

				<div className="details">
					<div className="tutor">
						<Image src="/images/pic-2.jpg" alt="" width="1280" height="720" />
						<h3>elle</h3>
						<span>developer ng pagmamahal</span>
					</div>
					<div className="flex">
						<p>
							total playlists : <span>4</span>
						</p>
						<p>
							total videos : <span>18</span>
						</p>
						<p>
							total likes : <span>69999999</span>
						</p>
						<p>
							total comments : <span>52</span>
						</p>
					</div>
				</div>
			</section>

			<section className="courses">
				<h1 className="heading">our courses</h1>

				<div className="box-container">
					<div className="box">
						<div className="thumb">
							<Image src="/images/thumb-1.png" alt="" width="1280" height="720" />
							<span>10 videos</span>
						</div>
						<h3 className="title">complete HTML tutorial</h3>
						<a href="playlist.html" className="inline-btn">
							view playlist
						</a>
					</div>

					<div className="box">
						<div className="thumb">
							<Image src="/images/thumb-2.png" alt="" width="1280" height="720" />
							<span>10 videos</span>
						</div>
						<h3 className="title">complete CSS tutorial</h3>
						<a href="playlist.html" className="inline-btn">
							view playlist
						</a>
					</div>

					<div className="box">
						<div className="thumb">
							<Image src="/images/thumb-3.png" alt="" width="1280" height="720" />
							<span>10 videos</span>
						</div>
						<h3 className="title">complete javascript tutorial</h3>
						<a href="playlist.html" className="inline-btn">
							view playlist
						</a>
					</div>

					<div className="box">
						<div className="thumb">
							<Image src="/images/thumb-4.png" alt="" width="1280" height="720" />
							<span>10 videos</span>
						</div>
						<h3 className="title">complete Boostrap tutorial</h3>
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
