import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: false
})

export const emailState = atom({
  key: 'emailState',
  default: null
})
