import { atomWithStorage } from 'jotai/utils' 

export const accessTokenAtom = atomWithStorage('accessToken', "");
export const roleAtom = atomWithStorage('role', "");