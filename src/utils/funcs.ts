import type { ProdutoItem } from "./types"

export async function addProduto ({nome, valor}: {nome: string, valor: string}) {
  const res = await fetch(`http://localhost:8000/api/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: nome,
      valor: valor,
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
    })
  })

  if (res.ok) {
    return await res.json()
  }
  return res
}