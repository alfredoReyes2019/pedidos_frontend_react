import { useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { IUsuario } from "../Interfaces/IUsuario"
import { Container, Row, Col, Table, Button} from "reactstrap"

export function ListaUsuario() {

    const [usuarios,setUsuario] = useState<IUsuario[]>([]);
    const token = localStorage.getItem("token");
    console.log(token);
    const obtenerUsuarios = async() =>{
            const response = await fetch(`${appsettings.appiEmpleado}usuarios/getAll`,{
                method : "GET",
                headers:{
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"

                }
            }
                
            );
            if(response.ok){
                     const data = await response.json();
                     setUsuario(data);
                 }
        }
     useEffect(()=>{ 
        obtenerUsuarios()  
        },[])
        
    const eliminar=(id:number) =>{
            const token = localStorage.getItem("token");
                Swal.fire({
                    title: "Eliminar Usuario",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar!"
                    }).then(async(result) => {
                    if (result.isConfirmed) {
                         const response = await fetch(`${appsettings.appiEmpleado}usuarios/Eliminar/${id}`,{method:"DELETE",
                             headers:{
                                "Authorization": `Bearer ${token}`,
                                "content-Type":"application/json"
                            },
                         })
                         if(response.ok) await obtenerUsuarios()
                   
                    }
                    });
        
            }
    
     return(
             <Container className="mt-5">
                 <Row>
                     <Col sm={{size:8, offset:2}}>
                         <h4>Lista de Pedidos</h4>
                         <hr/>
                         
                         <Table bordered>
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Correo</th>
                                    <th>Teléfono</th>
                                    <th>Estatus</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usuarios.map((item) =>(
                                        <tr key={item.ID}>
                                            <td>{item.userName}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.apellido}</td>
                                            <td>{item.email}</td>
                                            <td>{item.telefono}</td>
                                            <td>{item.enabled?"Activo":"Inactivo"}</td>
                                            <td>
                                                <Link className="btn btn-primary me-3" to={`/editarusuario/${item.ID}`}>Editar</Link>
                                                <Button color="danger" onClick={()=>{eliminar(item.ID!)}}>Baja</Button>                                           
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