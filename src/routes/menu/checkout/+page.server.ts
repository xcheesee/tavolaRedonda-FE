import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({cookies}) => {
	if(!cookies.get('token')) {
		throw redirect(301, '/login')
	}
})satisfies PageServerLoad
