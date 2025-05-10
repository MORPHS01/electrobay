"use server";
import { signIn, signOut } from '@/hooks/useAuth'


export const loginGoogle = async () => {
  await signIn("google")
}

export const logout = async () => {
  await signOut()
}