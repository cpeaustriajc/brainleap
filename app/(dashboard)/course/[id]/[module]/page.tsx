import { createClient } from '@/lib/supabase/server'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
const Player = dynamic(() => import('@/ui/player').then(mod => mod.Player), {
  ssr: false,
})

export default async function Module({
  params,
}: { params: { id: string; module: string } }) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .eq('id', params.module)
    .limit(1)
    .single()

  if (!data) {
    notFound()
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col">
        <div className="flex flex-col max-w-screen-lg">
          <div className="aspect-video">
            <Player
              src={data.video}
              thumbnail={data.thumbnail}
              thumbnails=""
              title={data.title}
            />
          </div>
          <div>
            <h3 className="text-2xl text-balance font-bold">{data.title}</h3>
            <p className="text-gray-500 text-pretty">{data.description}</p>
          </div>
        </div>
        <div>TODO: Comments</div>
      </div>
      <div className="flex flex-col">
        <div>TODO: Summary</div>
        <div>TODO: Quizzes</div>
      </div>
    </div>
  )
}
