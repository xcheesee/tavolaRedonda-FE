import type { CarrinhoItem, Pedido, ProdutoItem } from "./types"

export async function addProduto ({nome, valor, descricao, categoria_id}: ProdutoItem) {
  const res = await fetch(`http://localhost:8000/api/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
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

export async function delProduto({id}: {id: string}) {
  const res = await fetch(`http://127.0.0.1:8000/api/produtos/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  })

  return res
}

export async function editProduto(produto: ProdutoItem) {
  const res = await fetch(`http://127.0.0.1:8000/api/produtos/${produto.id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
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

export async function finalizarPedido(carrinho: {[key:string]: CarrinhoItem}) {
  const res = await fetch("http://127.0.0.1:8000/api/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cliente_id: 1,
      Status: 0,
      status_pedido: "recebido",
      forma_pagamento: "Dinheiro",
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

export async function editStatus({pedido, status}: {pedido: Pedido, status: 'recebido' | 'finalizado' | "em_andamento"}) {
  const res = await fetch(`http://127.0.0.1:8000/api/pedidos/${pedido.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
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

export async function login (e: HTMLFormElement) {
  const formData = new FormData(e)
  const res = await fetch("http://127.0.0.1:8000/api/login", {
    method: "POST",
    headers: {
      "Accept": "application/json"
    },
    body: formData
  })
  const json = await res.json();
  if(res.ok) {
    localStorage.setItem('token', json.token);
    return json;
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

export async function getPedidos(token: string) {
  const res = await fetch("http://127.0.0.1:8000/api/pedidos", {
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
