'use server';

import { cookies } from "next/headers";
import { unstable_cache as nextCache } from "next/cache";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";


export const getCourseById = nextCache(
	async (id: string) => {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		const { data: course } = await supabase
			.from('courses')
			.select()
			.eq('course_id', id)
			.single();

		return course;
	},
	['course']
);export const getCourseIds = nextCache(
	async () => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: courses } = await supabase
			.from('courses')
			.select('course_id')

		if (!courses) {
			notFound()
		}

		return courses.map((course) => course.course_id)
	},
	['course_id'],
	{
		tags: ['courseIds'],
	}
);
export const getCourses = nextCache(
	async () => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: courses, error } = await supabase.from('courses').select()

		if (error) {
			throw error
		}

		return courses
	},
	['courses'],
	{ tags: ['courses'] }
)

