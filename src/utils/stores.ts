import { writable, type Writable } from "svelte/store";
import type { ProdutoItem, Categoria, CarrinhoItem, User } from "./types";
import { localStorageStore } from "@skeletonlabs/skeleton";

export const produtoStore: Writable<ProdutoItem> = writable({id: "", nome: "", valor: "", descricao: "", categoria: ""})

export const categoriasStore: Writable<Categoria[]> = writable([])

export const carrinhoStore: Writable<{[key: string]: CarrinhoItem}> = localStorageStore('carrinho', {})

export const userStore: Writable<User> = localStorageStore('user', {mensagem: "", nome:"", email: "", user_id: "", token: "", type: ""}) 
