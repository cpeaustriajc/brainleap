import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
	const data = await getServerSession()

	const getInitials = (name: string) => {
		const [firstName, lastName] = name.split(' ')
		return `${firstName[0]}${lastName[0]}`
	}
	return (
		<>
			<section className="flex flex-col">
				<h1 className="text-2xl font-bold uppercase">your profile</h1>

				<div className="flex">
					<div className="user">
						<Avatar>
							<AvatarImage
								src={
									data?.user.image ??
									'/images/default-avatar.png'
								}
								alt={`${data?.user.name ?? 'User'}'s avatar`}
								width="64"
								height="64"
							/>
							<AvatarFallback>
								{getInitials(data?.user.name ?? '')}
							</AvatarFallback>
						</Avatar>
						<h3>{data?.user.name}</h3>
						<p>{data?.user.role}</p>
						<Button>
							<Link href="/profile/setup">Edit Profile</Link>
						</Button>
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
