import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load = ( async ({cookies, fetch}) => {
		const pedidos = await fetch('/api/pedidos')
    if(!cookies.get('token')){
			throw redirect(307, "/login")
    }
		const json = await pedidos.json()
		return {pedidos: json}
})satisfies PageServerLoad
