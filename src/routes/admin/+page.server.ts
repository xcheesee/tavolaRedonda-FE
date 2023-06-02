import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (({cookies}) => {
	const token = cookies.get('token')
	console.log(token)
	if(!token) {
		throw redirect(301, '/login')
	}
})satisfies PageServerLoad
