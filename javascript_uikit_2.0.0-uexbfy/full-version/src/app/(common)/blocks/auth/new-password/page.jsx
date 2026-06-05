// @project
import NewPassword from '@/blocks/auth/NewPassword';

/***************************  NEW PASSWORD - DATA  ***************************/

const data = {
  heading: 'Create New Password',
  caption: 'Your new password must be different from pervious used password'
};

/***************************  BLOCK - NEW PASSWORD  ***************************/

export default function BlockNewPassword() {
  return <NewPassword {...data} />;
}
