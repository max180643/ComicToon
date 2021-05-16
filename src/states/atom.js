import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: null
})

export const emailState = atom({
  key: 'emailState',
  default: null
})

export const nameState = atom({
  key: 'nameState',
  default: []
})

export const userIdState = atom({
  key: 'userIdState',
  default: null
})

export const coinState = atom({
  key: 'coinState',
  default: 0
})
