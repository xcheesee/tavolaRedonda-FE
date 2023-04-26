export interface Produto {
    mensagem: string
    produto: ProdutoItem[]
}

export interface ProdutoItem {
    id: string;
    nome: string;
    valor: string;
    descricao: string;
    categoria_id: string;
}

export interface prodModal extends ProdutoItem {
  send: boolean
}