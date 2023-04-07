export interface Produto {
    mensagem: string
    produto: {
	id: string;
    	nome: string;
    	valor: string;
    }[]
}

export interface ProdutoItem {
    id: string;
    nome: string;
    valor: string;
}
