import type { PageLoad } from './$types';
export const load = (async ({ fetch, depends }) => {
	depends('prods')
    //const res = await fetch("http://localhost:8000/api/produtos");
    //const produtos = await res.json();
    //return { produtos };
	let res;
	try{
	
		res = await fetch("http://127.0.0.1:8000/api/produtos")
	} catch(e) {
		console.log(e)
	}
	if(res) {
		const json = await res.json()
		return json
	}
	return {}
        
}) satisfies PageLoad;
