import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ url, cookies, fetch }) => {
  let pagamentoFilters = `?filter[status_pedido]=${url.status_pedido}&filter[data_antes_de]=${url.data_antes_de}&filter[data_depois_de]=${filters.data_depois_de}`
  let statusFilters = `?filter[forma_pagamento]=${filters.forma_pagamento}&filter[data_antes_de]=${filters.data_antes_de}&filter[data_depois_de]=${filters.data_depois_de}`
  let categoriaFilters = `?filter[data_antes_de]=${filters.data_antes_de}&filter[data_depois_de]=${filters.data_depois_de}`
    
  
	const [pagamentosRes, statusRes, catRes] = await Promise.all([
    fetch(`http://127.0.0.1:8000/api/pedidos/por_pagamento${pagamentoFilters}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }),
    fetch(`http://127.0.0.1:8000/api/pedidos/por_status${statusFilters}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }),
    fetch(`http://127.0.0.1:8000/api/pedidos/por_categoria${categoriaFilters}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }),
  ])
	if(pagamentosRes.ok && statusRes.ok && catRes.ok) {
		const [pagamentoJson, statusJson, catJson] = await Promise.all([pagamentosRes.json(), statusRes.json(), catRes.json()])
		return {totalPagamentos: pagamentoJson, totalStatus: statusJson, totalCategorias: catJson}
	}
  throw {message:"Nao foi possivel recuperar os graficos"};
  return json(data.data);
}) satisfies RequestHandler;
