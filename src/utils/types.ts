export interface Produto {
    mensagem: string
    produto: ProdutoItem[]
}

export interface ProdutoItem {
    id: string;
    nome: string;
    valor: string;
    descricao: string;
    categoria: Categoria;
}

export interface prodModal extends ProdutoItem {
  send: boolean
}

export interface CarrinhoItem extends ProdutoItem {
		qtd: number
}

export interface Categoria {
		id: string;
		nome: string;
}
