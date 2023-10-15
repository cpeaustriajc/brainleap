import { faker } from '@faker-js/faker'
import AppShell from '@/components/app-shell'
import { getRandomElement } from '../lib/utils'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import Image from 'next/image'

const randomRole = getRandomElement(['student', 'teacher'])

const mockData = [
	{
		name: faker.person.fullName(),
		picture: faker.image.urlLoremFlickr({
			category: 'people',
			height: 128,
			width: 128,
		}),
		role: randomRole,
	},
	{
		name: faker.person.fullName(),
		role: randomRole,
	},
]

export default function Page() {
	const activeUser = getRandomElement(mockData)

	return (
		<AppShell>
			<Header />
			<Sidebar activeUser={activeUser} />
			<main>
				<section className="home-grid">
					<h1 className="heading">quick options</h1>

					<div className="box-container">
						<div className="box">
							<h3 className="title">likes and comments</h3>
							<p className="likes">
								total likes : <span>69</span>
							</p>
							<a href="#" className="inline-btn">
								view likes
							</a>
							<p className="likes">
								total comments : <span>69</span>
							</p>
							<a href="#" className="inline-btn">
								view comments
							</a>
							<p className="likes">
								saved playlists : <span>69</span>
							</p>
							<a href="#" className="inline-btn">
								view playlists
							</a>
						</div>

						<div className="box">
							<h3 className="title">top categories</h3>
							<div className="flex">
								<a href="#">
									<i className="fas fa-code"></i>
									<span>development</span>
								</a>
								<a href="#">
									<i className="fas fa-chart-simple"></i>
									<span>business</span>
								</a>
								<a href="#">
									<i className="fas fa-pen"></i>
									<span>design</span>
								</a>
								<a href="#">
									<i className="fas fa-chart-line"></i>
									<span>marketing</span>
								</a>
								<a href="#">
									<i className="fas fa-music"></i>
									<span>music</span>
								</a>
								<a href="#">
									<i className="fas fa-camera"></i>
									<span>photography</span>
								</a>
								<a href="#">
									<i className="fas fa-cog"></i>
									<span>software</span>
								</a>
								<a href="#">
									<i className="fas fa-vial"></i>
									<span>science</span>
								</a>
							</div>
						</div>

						<div className="box">
							<h3 className="title">popular topics</h3>
							<div className="flex">
								<a href="#">
									<i className="fab fa-html5"></i>
									<span>HTML</span>
								</a>
								<a href="#">
									<i className="fab fa-css3"></i>
									<span>CSS</span>
								</a>
								<a href="#">
									<i className="fab fa-js"></i>
									<span>javascript</span>
								</a>
								<a href="#">
									<i className="fab fa-react"></i>
									<span>react</span>
								</a>
								<a href="#">
									<i className="fab fa-php"></i>
									<span>PHP</span>
								</a>
								<a href="#">
									<i className="fab fa-bootstrap"></i>
									<span>bootstrap</span>
								</a>
							</div>
						</div>

						<div className="box">
							<h3 className="title">become a tutor</h3>
							<p className="tutor">
								Lorem ipsum, dolor sit amet consectetur
								adipisicing elit. Perspiciatis, nam?
							</p>
							<a href="teachers.html" className="inline-btn">
								get started
							</a>
						</div>
					</div>
				</section>
				<section className="courses">
					<h1 className="heading">our courses</h1>

					<div className="box-container">
						<div className="box">
							<div className="tutor">
								<Image src="images/pic-2.jpg" alt="" />
								<div className="info">
									<h3>ronric</h3>
									<span>10-10-2023</span>
								</div>
							</div>
							<div className="thumb">
								<Image src="images/thumb-1.png" alt="" />
								<span>10 videos</span>
							</div>
							<h3 className="title">complete HTML tutorial</h3>
							<a href="playlist.html" className="inline-btn">
								view playlist
							</a>
						</div>

						<div className="box">
							<div className="tutor">
								<Image src="images/pic-3.jpg" alt="" />
								<div className="info">
									<h3>stephanie</h3>
									<span>10-10-2023</span>
								</div>
							</div>
							<div className="thumb">
								<Image src="images/thumb-2.png" alt="" />
								<span>10 videos</span>
							</div>
							<h3 className="title">complete CSS tutorial</h3>
							<a href="playlist.html" className="inline-btn">
								view playlist
							</a>
						</div>

						<div className="box">
							<div className="tutor">
								<Image src="images/pic-4.jpg" alt="" />
								<div className="info">
									<h3>jericho</h3>
									<span>10-10-2023</span>
								</div>
							</div>
							<div className="thumb">
								<Image src="images/thumb-3.png" alt="" />
								<span>10 videos</span>
							</div>
							<h3 className="title">complete JS tutorial</h3>
							<a href="playlist.html" className="inline-btn">
								view playlist
							</a>
						</div>

						<div className="box">
							<div className="tutor">
								<Image src="images/pic-5.jpg" alt="" />
								<div className="info">
									<h3>nathaniel</h3>
									<span>10-10-2023</span>
								</div>
							</div>
							<div className="thumb">
								<Image src="images/thumb-4.png" alt="" />
								<span>10 videos</span>
							</div>
							<h3 className="title">
								complete Boostrap tutorial
							</h3>
							<a href="playlist.html" className="inline-btn">
								view playlist
							</a>
						</div>

						<div className="box">
							<div className="tutor">
								<Image src="images/pic-6.jpg" alt="" />
								<div className="info">
									<h3>elle</h3>
									<span>10-10-2023</span>
								</div>
							</div>
							<div className="thumb">
								<Image src="images/thumb-5.png" alt="" />
								<span>10 videos</span>
							</div>
							<h3 className="title">complete JQuery tutorial</h3>
							<a href="playlist.html" className="inline-btn">
								view playlist
							</a>
						</div>

						<div className="box">
							<div className="tutor">
								<Image src="images/pic-7.jpg" alt="" />
								<div className="info">
									<h3>christelle</h3>
									<span>10-10-2023</span>
								</div>
							</div>
							<div className="thumb">
								<Image src="images/thumb-6.png" alt="" />
								<span>10 videos</span>
							</div>
							<h3 className="title">complete SASS tutorial</h3>
							<a href="playlist.html" className="inline-btn">
								view playlist
							</a>
						</div>
					</div>

					<div className="more-btn">
						<a href="courses.html" className="inline-option-btn">
							view all courses
						</a>
					</div>
				</section>
			</main>
		</AppShell>
	)
}
