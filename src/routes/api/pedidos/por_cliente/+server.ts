import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET = (async ({ url, cookies, fetch }) => {
  const res = await fetch('http://127.0.0.1:8000/api/pedidos/por_cliente',{
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${cookies.get('token')}`,
    }
  })
  const data = await res.json();

  return json(data.data);
}) satisfies RequestHandler;
