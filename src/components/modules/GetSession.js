import UserPool from './UserPool'

const GetSession = async () => {
  await new Promise((resolve, reject) => {
    const user = UserPool.getCurrentUser()
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          reject()
        } else {
          resolve(session)
        }
      })
    } else {
      reject()
    }
  })
}

export default GetSession
