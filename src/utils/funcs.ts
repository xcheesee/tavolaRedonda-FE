import type { ProdutoItem } from "./types"

export async function addProduto ({nome, valor, descricao, categoria}: ProdutoItem) {
  const res = await fetch(`http://localhost:8000/api/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: nome,
      valor: valor,
      descricao: descricao,
      categoria_id: categoria.id
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
      categoria_id: produto.categoria.id
    })
  })

  if (res.ok) {
    return await res.json()
  }
  return res
}

export async function delPedido(pedido_id: string) {
  const res = await fetch(`http://127.0.0.1:8000/api/pedidos/${pedido_id}`, {
    method: "DELETE",
  })
  if(res.ok) {
    return {ok: true, status: res.status}
  }
  throw {status: res.status, message: "Nao foi possivel enviar o pedido :("}

}
export function multiplyNum(num: string, multiplier: number): string {
    const parsedFloat = +num.replace(",", ".")
    const newNum = `${(parsedFloat * multiplier).toFixed(2)}`;
    return newNum.replace(".", ",")
  }
