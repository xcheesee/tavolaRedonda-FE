import { writable, type Writable } from "svelte/store";
import type { ProdutoItem, Categoria, CarrinhoItem } from "./types";
import { localStorageStore } from "@skeletonlabs/skeleton";

export const produtoStore: Writable<ProdutoItem> = writable({id: "", nome: "", valor: "", descricao: "", categoria: {id: "", nome: ""}})

export const categoriasStore: Writable<Categoria[]> = writable([])

export const carrinhoStore: Writable<{[key: string]: CarrinhoItem}> = localStorageStore('carrinho', {})
