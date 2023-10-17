import Image from 'next/image'

export default function Page() {
	return (
		<>
			<section className="user-profile">
				<h1 className="heading">your profile</h1>

				<div className="info">
					<div className="user">
						<Image src="/images/pic-1.jpg" alt="" width="1280" height="720" />
						<h3>balik ka na sakin miss na kita</h3>
						<p>student</p>
						<a href="update.html" className="inline-btn">
							update profile
						</a>
					</div>

					<div className="box-container">
						<div className="box">
							<div className="flex">
								<i className="fas fa-bookmark"></i>
								<div>
									<span>4000000</span>
									<p>saved playlist</p>
								</div>
							</div>
							<a href="#" className="inline-btn">
								view playlists
							</a>
						</div>

						<div className="box">
							<div className="flex">
								<i className="fas fa-heart"></i>
								<div>
									<span>1000000000</span>
									<p>videos liked</p>
								</div>
							</div>
							<a href="#" className="inline-btn">
								view liked
							</a>
						</div>

						<div className="box">
							<div className="flex">
								<i className="fas fa-comment"></i>
								<div>
									<span>120000000</span>
									<p>videos comments</p>
								</div>
							</div>
							<a href="#" className="inline-btn">
								view comments
							</a>
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
