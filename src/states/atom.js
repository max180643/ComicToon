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
