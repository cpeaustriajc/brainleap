import { faker } from '@faker-js/faker'
import AppShell from '../components/app-shell'
import { getRandomElement } from '../lib/utils'
import Sidebar from '../components/sidebar'
import Header from '../components/header'

const randomRole = getRandomElement(['student', 'teacher'])

const mockData = [{
    name: faker.person.fullName(),
    picture: faker.image.urlLoremFlickr({ category: 'people', height: 128, width: 128 }),
    role: randomRole
}, {
    name: faker.person.fullName(),
    role: randomRole
}]

export default function Page() {
    const activeUser = getRandomElement(mockData);

    return (
        <AppShell>
            <Header />
            <Sidebar activeUser={activeUser} />
            <main>
                <section className="home-grid">
                    <h1 className='heading'>quick options</h1>
                </section>
                <section>

                    <h1 class="heading">our courses</h1>

                    <div class="box-container">

                        <div class="box">
                            <div class="tutor">
                                <img src="images/pic-2.jpg" alt="" />
                                <div class="info">
                                    <h3>ronric</h3>
                                    <span>10-10-2023</span>
                                </div>
                            </div>
                            <div class="thumb">
                                <img src="images/thumb-1.png" alt="" />
                                <span>10 videos</span>
                            </div>
                            <h3 class="title">complete HTML tutorial</h3>
                            <a href="playlist.html" class="inline-btn">view playlist</a>
                        </div>

                        <div class="box">
                            <div class="tutor">
                                <img src="images/pic-3.jpg" alt="" />
                                <div class="info">
                                    <h3>stephanie</h3>
                                    <span>10-10-2023</span>
                                </div>
                            </div>
                            <div class="thumb">
                                <img src="images/thumb-2.png" alt="" />
                                <span>10 videos</span>
                            </div>
                            <h3 class="title">complete CSS tutorial</h3>
                            <a href="playlist.html" class="inline-btn">view playlist</a>
                        </div>

                        <div class="box">
                            <div class="tutor">
                                <img src="images/pic-4.jpg" alt="" />
                                <div class="info">
                                    <h3>jericho</h3>
                                    <span>10-10-2023</span>
                                </div>
                            </div>
                            <div class="thumb">
                                <img src="images/thumb-3.png" alt="" />
                                <span>10 videos</span>
                            </div>
                            <h3 class="title">complete JS tutorial</h3>
                            <a href="playlist.html" class="inline-btn">view playlist</a>
                        </div>

                        <div class="box">
                            <div class="tutor">
                                <img src="images/pic-5.jpg" alt="" />
                                <div class="info">
                                    <h3>nathaniel</h3>
                                    <span>10-10-2023</span>
                                </div>
                            </div>
                            <div class="thumb">
                                <img src="images/thumb-4.png" alt="" />
                                <span>10 videos</span>
                            </div>
                            <h3 class="title">complete Boostrap tutorial</h3>
                            <a href="playlist.html" class="inline-btn">view playlist</a>
                        </div>

                        <div class="box">
                            <div class="tutor">
                                <img src="images/pic-6.jpg" alt="" />
                                <div class="info">
                                    <h3>elle</h3>
                                    <span>10-10-2023</span>
                                </div>
                            </div>
                            <div class="thumb">
                                <img src="images/thumb-5.png" alt="" />
                                <span>10 videos</span>
                            </div>
                            <h3 class="title">complete JQuery tutorial</h3>
                            <a href="playlist.html" class="inline-btn">view playlist</a>
                        </div>

                        <div class="box">
                            <div class="tutor">
                                <img src="images/pic-7.jpg" alt="" />
                                <div class="info">
                                    <h3>christelle</h3>
                                    <span>10-10-2023</span>
                                </div>
                            </div>
                            <div class="thumb">
                                <img src="images/thumb-6.png" alt="" />
                                <span>10 videos</span>
                            </div>
                            <h3 class="title">complete SASS tutorial</h3>
                            <a href="playlist.html" class="inline-btn">view playlist</a>
                        </div>

                    </div>

                    <div class="more-btn">
                        <a href="courses.html" class="inline-option-btn">view all courses</a>
                    </div>

                </section>
            </main>
        </AppShell>
    )
}
