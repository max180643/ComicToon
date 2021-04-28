import UserPool from './UserPool'

const Logout = () => {
  const user = UserPool.getCurrentUser()
  if (user) {
    user.signOut()
  }
}

export default Logout
