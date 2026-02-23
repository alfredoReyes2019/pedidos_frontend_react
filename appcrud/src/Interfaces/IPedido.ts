import type { IPedidoDetalle } from "./IPedidoDetalle"

export interface IPedido {
    orderId?: number,
    customerName: string,
    orderDate: string,
    status: string,
    orderDetails: IPedidoDetalle[]
}