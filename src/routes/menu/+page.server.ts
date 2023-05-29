import type { PageServerLoad } from './$types';
export const load = (async ({ fetch, depends }) => {
	const [prodRes, catRes] = await Promise.all([fetch("http://127.0.0.1:8000/api/produtos"), fetch("http://127.0.0.1:8000/api/categoria")])
	depends('prods:get')
	if(prodRes.ok && catRes.ok) {
		const [prodJson, catJson] = await Promise.all([prodRes.json(), catRes.json()])
		console.log(prodJson)
		return {produto: prodJson, categorias: catJson.categorias}
	}
	throw {produto: [], categorias: []}
        
}) satisfies PageServerLoad;
