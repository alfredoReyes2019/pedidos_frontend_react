import { ChangeEvent, useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { IPedido } from "../Interfaces/IPedido"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button} from "reactstrap"

const initialPedido = {
    customerName: "",
    orderDate: "",
    status: ""
}

export function editarPedido {

       const {id} = useParams<{id:string}>()
        const [pedido,setPedido] = useState<IPedido>(initialPedido);
        const navigate = useNavigate(); 
    
        useEffect(()=>{
            const obtenerPedido = async() =>{
                const response = await fetch(`${appsettings.apiUrl}order/Obtener/${id}`)
                if(response.ok){
                         const data = await response.json();
                         setPedido(data);
                     }
            }
            obtenerPedido()
        },[])
    
            const inputChangeValue = (event:ChangeEvent<HTMLInputElement>) => {
            const inputName = event.target.name;
            const inputValue = event.target.value;
    
           // console.log(inputName, " ", inputValue);
    
            setPedido({...pedido,[inputName]:inputValue})
        }
    
           const guardar = async() =>{
                const response = await fetch(`${appsettings.apiUrl}order/guardar`,{
                    method:'PUT',
                    headers:{
                        'content-Type':'application/json'
                    },
                    body:JSON.stringify(pedido)
                })
        
                if(response.ok){
                    navigate("/")
                }else{
                    Swal.fire({
                    title: "Error",
                    text: "No se pudo guardar el empleado",
                    icon: "warning"
                    })
                }
        
            }
    
        const volver = () =>{
            navigate("/")
        }
 
       return(
          <Container className="mt-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h4>Editar Pedido</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Nombre de cliente</Label>
                            <Input type="text" name="userName" onChange={inputChangeValue} value={pedido.customerName} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Fecha de pedido</Label>
                            <Input type="password" name="password" onChange={inputChangeValue} value={pedido.orderDate} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Estatus</Label>
                            <Input type="text" name="nombre" onChange={inputChangeValue} value={pedido.status} />
                        </FormGroup>                                                    

                    </Form> 
                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary"   onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>

    )    
        
}