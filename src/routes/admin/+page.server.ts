import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (({cookies}) => {
	const token = cookies.get('token')
	if(!token) {
		throw redirect(307, '/login')
	}
})satisfies PageServerLoad
