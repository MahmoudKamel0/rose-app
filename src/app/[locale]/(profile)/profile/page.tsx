import ProfileForm from '@components/shared/account-form';
import { getProfileData } from '@lib/actions/profile/profile.action';

export default async function ProfilePage() {
   const profile = await getProfileData();
  return (
    <ProfileForm profile= {profile} showChangePassword={false}  /> 
  )
}
