import type { PageServerLoad } from './$types';
export const load = ( async () => {
    let res = await fetch("http://127.0.0.1:8000/api/pedidos")
    if(res.ok){
        let pedidos = await res.json()
        return {res: res.status, pedidos: pedidos}
    }

    throw {res: res.status}

})satisfies PageServerLoad
