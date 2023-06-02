import type { PageLoad } from './$types';
import { getCategorias, getProdutos } from '../../utils/funcs';
export const ssr = false;

export const load = (async ({ fetch, depends }) => {
	const token = localStorage.getItem('token')
	const [prodRes, catRes] = await Promise.all([ getProdutos(token ?? ""), getCategorias(token ?? "")])
	depends('prods:get')
	if(prodRes.ok && catRes.ok) {
		const [prodJson, catJson] = await Promise.all([prodRes.json(), catRes.json()])
		return {produto: prodJson, categorias: catJson.categorias}
	}
	return {produto: [], categorias: []}
        
}) satisfies PageLoad;
