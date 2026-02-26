import { useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { IPedido } from "../Interfaces/IPedido"
import { Container, Row, Col, Table, Button} from "reactstrap"

export function Lista(){
    const [pedidos,setPedido] = useState<IPedido[]>([]);
    const token = localStorage.getItem("token");
    console.log(token);
    const obtenerPedidos = async() =>{
            const response = await fetch(`${appsettings.apiUrl}Order/GetAll`,{
                method : "GET",
                headers:{
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"

                }
            }
                
            );
            if(response.ok){
                     const data = await response.json();
                     setPedido(data);
                 }
        }
     useEffect(()=>{ 
        obtenerPedidos()  
        },[])
        
    const eliminar=(id:number) =>{
                const token = localStorage.getItem("token");
                Swal.fire({
                    title: "Eliminar pedido",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar!"
                    }).then(async(result) => {
                    if (result.isConfirmed) {
                         const response = await fetch(`${appsettings.apiUrl}order/Delete?id=${id}`,{method:"DELETE",
                             headers:{
                                "Authorization": `Bearer ${token}`,
                                "content-Type":"application/json"
                            },
                         })
                         if(response.ok) await obtenerPedidos()
                   
                    }
                    });
        
            }

    return(
             <Container className="mt-5">
                 <Row>
                     <Col sm={{size:8, offset:2}}>
                         <h4>Lista de Pedidos</h4>
                         <hr/>
                        <Link className="btn btn-success mb-3 me-4" to="/nuevoPedido">Nuevo</Link>     
                        <Link className="btn btn-success mb-3" to="/listausuarios">Gestionar Usuarios</Link>      
                         <Table bordered>
                            <thead>
                                <tr>
                                    <th>Nombre del cliente</th>
                                    <th>Fecha</th>
                                    <th>Estatus</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pedidos.map((item) =>(
                                        <tr key={item.orderId}>
                                            <td>{item.customerName}</td>
                                            <td>{item.orderDate}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <Link className="btn btn-primary me-3" to={`/editarpedido/${item.orderId}`}>Editar</Link>
                                                <Button color="danger" onClick={()=>{eliminar(item.orderId!)}}>Eliminar</Button>                                           
                                            </td>
                                        </tr>
                                    ) )
                                }
                            </tbody>
                         </Table>
                     </Col>
                 </Row>
             </Container>
        
    )
}