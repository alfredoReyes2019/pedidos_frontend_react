import type { IRol } from "./IRol"

export interface IUsuario {
    ID?: number,
    userName: string,
    password: string,
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    enabled: boolean,
    roles: IRol[]
}