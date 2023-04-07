import { writable, type Writable } from "svelte/store";
import type { ProdutoItem } from "./types";

export const produtoStore: Writable<ProdutoItem> = writable({id: "", nome: "", valor: ""})
