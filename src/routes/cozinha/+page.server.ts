import type { PageServerLoad } from './$types';
import type { Pedido } from '../../utils/types';
export const load = ( async () => {
    const pedidoStatus: PedidoStatus = {
        finalizado: [],
        em_andamento: [],
        recebido: []
    }
    let res = await fetch("http://127.0.0.1:8000/api/pedidos")
    if(res.ok){
        let pedidos = await res.json()
        console.log(pedidos)
        pedidos.pedidos.forEach( (pedido: Pedido) => pedidoStatus[pedido.Status as keyof PedidoStatus].push(pedido) )
        return {res: res.status, pedidos: pedidoStatus}
    }

    return {res: res.status}

})satisfies PageServerLoad

interface PedidoStatus {
    finalizado: Pedido[];
    em_andamento: Pedido[];
    recebido: Pedido[];
}