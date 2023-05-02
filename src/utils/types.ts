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

export interface PedidoProduto extends ProdutoItem {
    created_at: string;
    updated_at: string;
}

export interface Cliente {
    id: string;
    nome: string;
    created_at: string;
    updated_at: string;
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
    created_at?: string | undefined | null;
    updated_at?: string | undefined | null;
}

export interface Pedido {
    id: string;
    cliente_id: string;
    Status: string;
    forma_pagamento: string;
    created_at: string;
    updated_at: string;
    cliente: Cliente;
    produto: PedidoProduto;
    categoria: Categoria;
    pedido_itens: queryPedidoItens[];
}

export interface PedidoQuery {
    mensagem: string;
    pedidos: Pedido[];
}

export interface queryPedidoItens {
    id: string;
    pedido_id: string;
    produto: ProdutoItem;
    produto_id: string;
    quantidade: string;
    updated_at?: string;
}