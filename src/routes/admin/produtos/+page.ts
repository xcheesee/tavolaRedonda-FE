import type { PageLoad } from "./$types";

export const load = (async ({ fetch, depends }) => {
	const [prodRes, catRes] = await Promise.all([fetch("http://localhost:8000/api/produtos", {
		headers: {
			'Accept': 'application/json'
		}
	}), fetch("http://localhost:8000/api/categoria", {
		headers: {
			"Accept": 'application/json'
		}
	})])
	depends('prods:get')
	if(prodRes.ok && catRes.ok) {
		const [catJson] = await Promise.all([catRes.json()])
		return {categorias: catJson.categorias}
	}
	return { categorias: [] }
        
}) satisfies PageLoad;
