import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';
export const load = (({cookies}) => {
	if(cookies.get('token')) {
		return {token: cookies.get('token')}
	}
	return {token: ""}
})satisfies PageServerLoad

export const actions = {
	default: async ({cookies, request}) => {
		//const data = await request.formData()
		const logoutRes = await fetch("http://127.0.0.1:8000/api/logout", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${cookies.get('token')}`
            }
        })
		if (logoutRes.ok){
			cookies.set('token', "", {path: "/"})
			cookies.set('user', "")
		}

	}
};
