import type { CarrinhoItem, Pedido, ProdutoItem } from "./types"

export async function addProduto ({nome, valor, descricao, categoria_id, token}: ProdutoItem) {
  const res = await fetch(`http://172.19.0.4:8000/api/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      nome: nome,
      valor: valor,
      descricao: descricao,
      categoria_id: categoria_id
    })
  })
  if(res.ok) {
    const data = await res.json()
    return {status: res.status, data: data.produto}
  }
  return res.status
}

export async function delProduto({id, token}: {id: string, token: string}) {
  const res = await fetch(`http://127.0.0.1:8000/api/produtos/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })

  return res
}

export async function editProduto({produto, token}: {produto: ProdutoItem, token: string}) {
  const res = await fetch(`http://127.0.0.1:8000/api/produtos/${produto.id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      nome: produto.nome,
      valor: produto.valor,
      descricao: produto.descricao,
      categoria_id: produto.categoria_id
    })
  })

  if (res.ok) {
    return await res.json()
  }
  return res
}

export async function finalizarPedido(token: string, carrinho: {[key:string]: CarrinhoItem}, pagamento: string) {
  const res = await fetch("http://127.0.0.1:8000/api/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      cliente_id: 1,
      Status: 0,
      status_pedido: "recebido",
      forma_pagamento: pagamento,
      itens: Object.values(carrinho).map(val => ({
        produto_id: val.id, 
        quantidade: val.qtd,
      }))
    })
  })

  if(res.ok) {
    const json = await res.json()
    return {ok: true, res: res.status, data: json}
  }
  throw {message: "Nao foi possivel finalizar a compra :(", status: res.status}
}

export async function delPedido({token ,pedido_id}: {token: string, pedido_id: string}) {
  const res = await fetch(`http://127.0.0.1:8000/api/pedidos/${pedido_id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  if(res.ok) {
    return {ok: true, status: res.status}
  }
  throw {status: res.status, message: "Nao foi possivel enviar o pedido :("}

}

export async function editStatus({pedido, status, token}: {pedido: Pedido, status: 'recebido' | 'finalizado' | "em_andamento", token: string}) {
  const res = await fetch(`http://127.0.0.1:8000/api/pedidos/${pedido.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({cliente_id: pedido.cliente.id, forma_pagamento: pedido.forma_pagamento, status_pedido: status})
  })
}
export function multiplyNum(num: string, multiplier: number): string {
  const parsedFloat = +num.replace(",", ".")
  const newNum = `${(parsedFloat * multiplier).toFixed(2)}`;
  return newNum.replace(".", ",")
}

export async function criarConta (e: HTMLFormElement) {
	const formData = new FormData(e)	
  const res = await fetch(`http://127.0.0.1:8000/api/cadastrar`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
    },
    body: formData
  })
  const json = await res.json();
  if(res.ok) {
    return json;
  }
  throw {message: json, status: res.status} 
}

export async function login (e: FormData) {
  //const formData = new FormData(e)
  const res = await fetch("http://tavred-app:8000/api/login", {
    method: "POST",
    headers: {
      "Accept": "application/json"
    },
    body: e
  })
  const json = await res.json();
  if(res.ok) {
    return {...json, ok: true};
  }
  throw {message: json, status: res.status} 
}

export async function getProdutos(token: string) {
  const res = await fetch("http://127.0.0.1:8000/api/produtos", {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  const json = await res.json()
  if (res.ok) {
    return json
  }
}

export async function getCategorias(token: string) {
  const res = await fetch("http://127.0.0.1:8000/api/categoria", {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  const json = await res.json()
  if (res.ok) {
    return json
  }
}

export async function getPedidos(token: string, filters="") {
  const res = await fetch(`http://127.0.0.1:8000/api/pedidos${filters}`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  const json = await res.json()
  if (res.ok) {
    return json
  }
}

export async function getPedidosCliente(token: string) {
  const res = await fetch(`http://127.0.0.1:8000/api/pedidos/por_cliente`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  const json = await res.json()
  if (res.ok) {
    return json
  }
}

export async function getGraphs(token: string, filters: any) {
  let pagamentoFilters = `?filter[status_pedido]=${filters.status_pedido}&filter[data_antes_de]=${filters.data_antes_de}&filter[data_depois_de]=${filters.data_depois_de}`
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
}
