import ProfileForm from '../_components/profile-form'
import { getProfileData } from '../_actions/profile.actions';

export default async function ProfilePage() {
   const profile = await getProfileData();
  return (
    <ProfileForm profile= {profile} />
  )
}
