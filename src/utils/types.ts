export interface Produto {
    data: ProdutoItem[]
}

export interface ProdutoItem {
    id: string;
    nome: string;
    valor: string;
    descricao: string;
    categoria: string;
    categoria_id?: string;
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
    //cliente_id: string;
    status_pedido: "recebido" | "em_andamento" | "finalizado";
    forma_pagamento: string;
    cliente: Cliente;
    produto?: PedidoProduto;
    categoria?: Categoria;
    itens: queryPedidoItens[];
    total?: string;
}

export interface PedidoQuery {
    data: Pedido[];
}

export interface queryPedidoItens {
    id: string;
    pedido_id?: string;
    produto?: ProdutoItem;
    nome: string;
    descricao: string;
    unitario: string;
    produto_id: string;
    quantidade: string;
    updated_at?: string;
}

export interface PedidoStatus {
    finalizado: Pedido[];
    em_andamento: Pedido[];
    recebido: Pedido[];
}

export interface User {
    mensagem: string;
    nome:string;
    email: string;
    user_id: string;
    token: string;
    type: string;
}
