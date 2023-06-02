import type { PageServerLoad } from './$types';

export const load = (({cookies}) => {
	const user = cookies.get('user')
	const token = cookies.get('token')
	return {user: user, token: token}
})satisfies PageServerLoad
