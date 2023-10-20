import { getRandomElement } from '@/lib/utils'
import { faker } from '@faker-js/faker'

const randomRole = getRandomElement(['student', 'teacher'])

export const mockData = [
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

export const activeUser = getRandomElement(mockData)
