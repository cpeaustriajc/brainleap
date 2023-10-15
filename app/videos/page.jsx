import Image from 'next/image'

export default function Page() {
	return (
		<>
			<section className="watch-video">
				<div className="video-container">
					<div className="video">
						<video
							src="images/vid-1.mp4"
							controls
							poster="images/post-1-1.png"
							id="video"
						></video>
					</div>
					<h3 className="title">complete HTML tutorial (part 01)</h3>
					<div className="info">
						<p className="date">
							<i className="fas fa-calendar"></i>
							<span>10-10-2023</span>
						</p>
						<p className="date">
							<i className="fas fa-heart"></i>
							<span>44 likes</span>
						</p>
					</div>
					<div className="tutor">
						<Image src="images/pic-2.jpg" alt="" />
						<div>
							<h3>elle</h3>
							<span>developer ng pagmamahal</span>
						</div>
					</div>
					<form action="" method="post" className="flex">
						<a href="playlist.html" className="inline-btn">
							view playlist
						</a>
						<button>
							<i className="far fa-heart"></i>
							<span>like</span>
						</button>
					</form>
					<p className="description">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Itaque labore ratione, hic exercitationem mollitia
						obcaecati culpa dolor placeat provident porro. Lorem,
						ipsum dolor sit amet consectetur adipisicing elit.
						Aliquid iure autem non fugit sint. A, sequi rerum
						architecto dolor fugiat illo, iure velit nihil
						laboriosam cupiditate voluptatum facere cumque nemo!
					</p>
				</div>
			</section>

			<section className="comments">
				<h1 className="heading">5 comments</h1>

				<form action="" className="add-comment">
					<h3>add comments</h3>
					<textarea
						name="comment_box"
						placeholder="enter your comment"
						required
						maxlength="1000"
						cols="30"
						rows="10"
					></textarea>
					<input
						type="submit"
						value="add comment"
						className="inline-btn"
						name="add_comment"
					/>
				</form>

				<h1 className="heading">user comments</h1>

				<div className="box-container">
					<div className="box">
						<div className="user">
							<Image src="images/pic-1.jpg" alt="" />
							<div>
								<h3>vj</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="comment-box">
							wow amazin nakakaPUTANGINAAAAAAA
						</div>
						<form action="" className="flex-btn">
							<input
								type="submit"
								value="edit comment"
								name="edit_comment"
								className="inline-option-btn"
							/>
							<input
								type="submit"
								value="delete comment"
								name="delete_comment"
								className="inline-delete-btn"
							/>
						</form>
					</div>

					<div className="box">
						<div className="user">
							<Image src="images/pic-2.jpg" alt="" />
							<div>
								<h3>ronric</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="comment-box">Nakaka putangina ka</div>
					</div>

					<div className="box">
						<div className="user">
							<Image src="images/pic-7.jpg" alt="" />
							<div>
								<h3>stephaniee</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="comment-box">
							Ikaw lang ang aking mahal ralph
						</div>
					</div>

					<div className="box">
						<div className="user">
							<Image src="images/pic-4.jpg" alt="" />
							<div>
								<h3>Niko</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="comment-box">
							I think mas-maganda kung ako na lang magtuturo kay
							erica ng lesson na to.
						</div>
					</div>

					<div className="box">
						<div className="user">
							<Image src="images/pic-5.jpg" alt="" />
							<div>
								<h3>christelle</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="comment-box">
							ikaw lamng ang akin iniirog
						</div>
					</div>

					<div className="box">
						<div className="user">
							<Image src="images/pic-2.jpg" alt="" />
							<div>
								<h3>jericho</h3>
								<span>10-10-2023</span>
							</div>
						</div>
						<div className="comment-box"> lf bebetime!</div>
					</div>
				</div>
			</section>

			<footer className="footer">
				PAMANTASAN NG LUNGSOD NG SAN PABLO
			</footer>
		</>
	)
}
