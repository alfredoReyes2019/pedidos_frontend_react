import type { IRol } from "./IRol"

export interface IUsuario {
    id?: number,
    userName: string,
    password: string,
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    enabled: boolean,
    roles: IRol[]
}