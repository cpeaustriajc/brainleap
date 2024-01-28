export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			announcements: {
				Row: {
					announcement_id: string
					attachment: string | null
					course_id: string | null
					created_at: string | null
					description: string | null
					link: string | null
					profile_id: string | null
					title: string | null
				}
				Insert: {
					announcement_id?: string
					attachment?: string | null
					course_id?: string | null
					created_at?: string | null
					description?: string | null
					link?: string | null
					profile_id?: string | null
					title?: string | null
				}
				Update: {
					announcement_id?: string
					attachment?: string | null
					course_id?: string | null
					created_at?: string | null
					description?: string | null
					link?: string | null
					profile_id?: string | null
					title?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'announcements_course_id_fkey'
						columns: ['course_id']
						isOneToOne: false
						referencedRelation: 'courses'
						referencedColumns: ['course_id']
					},
					{
						foreignKeyName: 'profile_id_fk'
						columns: ['profile_id']
						isOneToOne: false
						referencedRelation: 'profiles'
						referencedColumns: ['profile_id']
					},
				]
			}
			assignments: {
				Row: {
					assignment_id: string
					attachment: string | null
					course_id: string | null
					description: string | null
					due_date: string | null
					instructor_id: string | null
					link: string | null
					title: string | null
				}
				Insert: {
					assignment_id?: string
					attachment?: string | null
					course_id?: string | null
					description?: string | null
					due_date?: string | null
					instructor_id?: string | null
					link?: string | null
					title?: string | null
				}
				Update: {
					assignment_id?: string
					attachment?: string | null
					course_id?: string | null
					description?: string | null
					due_date?: string | null
					instructor_id?: string | null
					link?: string | null
					title?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'assignments_instructor_id_fkey'
						columns: ['instructor_id']
						isOneToOne: false
						referencedRelation: 'profiles'
						referencedColumns: ['profile_id']
					},
					{
						foreignKeyName: 'course_id_fk'
						columns: ['course_id']
						isOneToOne: false
						referencedRelation: 'courses'
						referencedColumns: ['course_id']
					},
				]
			}
			courses: {
				Row: {
					course_description: string | null
					course_id: string
					course_name: string
					instructor_id: string
					room: string | null
					section: string | null
					subject: string | null
				}
				Insert: {
					course_description?: string | null
					course_id?: string
					course_name: string
					instructor_id?: string
					room?: string | null
					section?: string | null
					subject?: string | null
				}
				Update: {
					course_description?: string | null
					course_id?: string
					course_name?: string
					instructor_id?: string
					room?: string | null
					section?: string | null
					subject?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'fk_instructor_id'
						columns: ['instructor_id']
						isOneToOne: false
						referencedRelation: 'profiles'
						referencedColumns: ['profile_id']
					},
				]
			}
			enrollments: {
				Row: {
					course_id: string | null
					enrollment_id: string
					user_id: string | null
				}
				Insert: {
					course_id?: string | null
					enrollment_id?: string
					user_id?: string | null
				}
				Update: {
					course_id?: string | null
					enrollment_id?: string
					user_id?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'enrollments_user_id_fkey'
						columns: ['user_id']
						isOneToOne: false
						referencedRelation: 'profiles'
						referencedColumns: ['profile_id']
					},
				]
			}
			outputs: {
				Row: {
					assignment_id: string | null
					attachment: string
					course_id: string
					grade: number | null
					output_id: string
					student_id: string | null
					submitted_at: string
				}
				Insert: {
					assignment_id?: string | null
					attachment: string
					course_id: string
					grade?: number | null
					output_id?: string
					student_id?: string | null
					submitted_at?: string
				}
				Update: {
					assignment_id?: string | null
					attachment?: string
					course_id?: string
					grade?: number | null
					output_id?: string
					student_id?: string | null
					submitted_at?: string
				}
				Relationships: [
					{
						foreignKeyName: 'outputs_assignment_id_fkey'
						columns: ['assignment_id']
						isOneToOne: false
						referencedRelation: 'assignments'
						referencedColumns: ['assignment_id']
					},
					{
						foreignKeyName: 'outputs_course_id_fkey'
						columns: ['course_id']
						isOneToOne: false
						referencedRelation: 'courses'
						referencedColumns: ['course_id']
					},
					{
						foreignKeyName: 'outputs_student_id_fkey'
						columns: ['student_id']
						isOneToOne: false
						referencedRelation: 'profiles'
						referencedColumns: ['profile_id']
					},
				]
			}
			profiles: {
				Row: {
					avatar_url: string | null
					biography: string | null
					email: string
					full_name: string | null
					position: string | null
					profile_id: string
					program: string | null
					role: Database['public']['Enums']['role_type']
					section: string | null
					university: string | null
					updated_at: string | null
					username: string | null
				}
				Insert: {
					avatar_url?: string | null
					biography?: string | null
					email: string
					full_name?: string | null
					position?: string | null
					profile_id: string
					program?: string | null
					role?: Database['public']['Enums']['role_type']
					section?: string | null
					university?: string | null
					updated_at?: string | null
					username?: string | null
				}
				Update: {
					avatar_url?: string | null
					biography?: string | null
					email?: string
					full_name?: string | null
					position?: string | null
					profile_id?: string
					program?: string | null
					role?: Database['public']['Enums']['role_type']
					section?: string | null
					university?: string | null
					updated_at?: string | null
					username?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'profiles_profile_id_fkey'
						columns: ['profile_id']
						isOneToOne: true
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			post_type: 'assignment' | 'announcement'
			role_type: 'student' | 'instructor'
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database
	}
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
				Database['public']['Views'])
	  ? (Database['public']['Tables'] &
				Database['public']['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R
		  }
			? R
			: never
	  : never

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database
	}
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I
		  }
			? I
			: never
	  : never

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database
	}
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U
		  }
			? U
			: never
	  : never

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof Database['public']['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
	  ? Database['public']['Enums'][PublicEnumNameOrOptions]
	  : never
