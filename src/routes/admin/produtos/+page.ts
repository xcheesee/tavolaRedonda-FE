import type { PageLoad } from "./$types";

export const load = (async ({ fetch, depends }) => {
	const [prodRes, catRes] = await Promise.all([fetch("http://127.0.0.1:8000/api/produtos"), fetch("http://127.0.0.1:8000/api/categoria")])
	depends('prods:get')
	if(prodRes.ok && catRes.ok) {
		const [catJson] = await Promise.all([catRes.json()])
		return {categorias: catJson.categorias}
	}
	return { categorias: [] }
        
}) satisfies PageLoad;
