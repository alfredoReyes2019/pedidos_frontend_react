import { ChangeEvent, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { IPedido } from "../Interfaces/IPedido"
import { IPedidoDetalle } from "../Interfaces/IPedidoDetalle"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"

const initialPedido = {
    orderId:0,
    customerName: "",
    orderDate: "",
    status: "",
    orderDetails:[]
}

export function NuevoPedido() {

        const [pedido,setPedido] = useState<IPedido>(initialPedido);
        const navigate = useNavigate();
        const [modalOpen, setModalOpen] = useState(false);
   
        const [nuevoDetalle, setNuevoDetalle] = useState<IPedidoDetalle>({ productName: "", quantity: 0});

        const toggle = () => setModalOpen(!modalOpen);
        const inputChangeValue = (event:ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

       // console.log(inputName, " ", inputValue);

        setPedido({...pedido,[inputName]:inputValue})
        }
        
        const guardar = async() =>{
                if (!pedido.customerName || !pedido.orderDate || !pedido.status) {
                    Swal.fire({
                        title: "Campos incompletos",
                        text: "Por favor llena todos los campos antes de guardar",
                        icon: "warning"
                    });
                    return;
                    }

            const token = localStorage.getItem("token");
            console.log(JSON.stringify(pedido));
            const response = await fetch(`${appsettings.apiUrl}Order/Create`,{
                method:'POST',
                headers:{
                     "Authorization": `Bearer ${token}`,
                    "content-Type":"application/json"
                },
                body:JSON.stringify(pedido)
            })
    
            if(response.ok){
                navigate("/")
            }else{
                Swal.fire({
                title: "Error",
                text: "No se pudo guardar el pedido",
                icon: "warning"
                })
            }
    
        }
        const volver = () =>{
            navigate("/")
        }

        const agregarDetalle = () => {
            setPedido({
                ...pedido,
                orderDetails: [...pedido.orderDetails, nuevoDetalle]
            });
            setNuevoDetalle({ productName: "", quantity: 0 }); // limpiar
            toggle(); // cerrar modal
            };

    
    return(
           <Container className="mt-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h4>Nuevo Pedido</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Nombre de cliente</Label>
                            <Input type="text" name="customerName" onChange={inputChangeValue} value={pedido.customerName} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Fecha de pedido</Label>
                            <Input type="date" name="orderDate" onChange={inputChangeValue} value={pedido.orderDate} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Estatus</Label>
                            <Input type="select" name="status" onChange={inputChangeValue} value={pedido.status} >
                            <option value="Pediente">Pediente</option>
                            <option value="Aprobado">Aprobado</option>
                            <option value="En Proceso">Proceso</option>
                            </Input>
                        </FormGroup>                        
                    </Form> 
                   <br/>
                    <div>
                        <Button color="success" onClick={toggle}> Agregar producto</Button>
                            <Table bordered>
                            <thead>
                                <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedido.orderDetails.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.productName}</td>
                                    <td>{d.quantity}</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    <br/>
                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary"   onClick={volver}>Volver</Button>
                    
                        <Modal isOpen={modalOpen} toggle={toggle}>
                            <ModalHeader toggle={toggle}>Nuevo Producto</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label>Nombre</Label>
                                    <Input  type="text" name="productName" value={nuevoDetalle.productName} onChange={(e) => setNuevoDetalle({ ...nuevoDetalle, productName: e.target.value })}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Cantidad</Label>
                                    <Input type="number" name="quantity" value={nuevoDetalle.quantity} onChange={(e) => setNuevoDetalle({ ...nuevoDetalle, quantity: Number(e.target.value) })}/>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={agregarDetalle}>Guardar</Button>
                                <Button color="secondary" onClick={toggle}>Cancelar</Button>
                            </ModalFooter>
                        </Modal>
                    </div>

                </Col>
            </Row>
        </Container>
    )        
}