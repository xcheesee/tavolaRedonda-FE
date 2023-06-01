import type { PageServerLoad } from "../../$types";

export const load = (async ({ fetch }) => {
	const [pagamentosRes, statusRes, catRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/pedidos/por_pagamento"),
        fetch("http://127.0.0.1:8000/api/pedidos/por_status"),
        fetch("http://127.0.0.1:8000/api/pedidos/por_categoria")
        ])
	//depends('prods:get')
	if(pagamentosRes.ok && statusRes.ok && catRes.ok) {
		const [pagamentoJson, statusJson, catJson] = await Promise.all([pagamentosRes.json(), statusRes.json(), catRes.json()])
        //const pagamentoJson = await pagamentosRes.json()
		return {totalPagamentos: pagamentoJson, totalStatus: statusJson, totalCategorias: catJson}
	}
	return {totalPagamentos: [], totalStatus: [], totalCategorias: []}
        
}) satisfies PageServerLoad;