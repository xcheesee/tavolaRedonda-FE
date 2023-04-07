import type { PageLoad } from './$types';
export const load = (async ({ fetch, depends }) => {
	let res;
	res = await fetch("http://127.0.0.1:8000/api/produtos")
	depends('prods:get')
	if(res.ok) {
		const json = await res.json()
		return json
	}
	return {mensagem: "", produto: []}
        
}) satisfies PageLoad;
