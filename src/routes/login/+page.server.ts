import { login } from '../../utils/funcs';
import type { PageServerLoad } from './$types';

export const load = (({cookies}) => {
	if(cookies.get('token')) {
		return {token: cookies.get('token')}
	}
	return {token: ""}
})satisfies PageServerLoad

export const actions = {
	default: async ({cookies, request}) => {
		const data = await request.formData()
		const loginRes = await login(data)
		if (loginRes.ok){
			cookies.set('token', loginRes.token, {path: "/"})
			cookies.set('user', loginRes.nome)
		}

	}
};
