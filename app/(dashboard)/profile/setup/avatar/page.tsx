import { updateAvatar } from '@/lib/actions/profile'

export default function SetupAvatarPage() {
  return (
    <div>
      <p>Let&apos;s start with your avatar</p>
      <form action={updateAvatar}>
        <input type="file" name="avatar" id="avatar" required />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}
