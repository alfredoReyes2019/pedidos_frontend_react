import { ChangeEvent, useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
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

export function EditarPedido() {

        const {id} = useParams<{id:string}>()
        const [pedido,setPedido] = useState<IPedido>(initialPedido);
        const [nuevoDetalle, setNuevoDetalle] = useState<IPedidoDetalle>({orderDetailId:0, productName: "", quantity: 0});
        const [editIndex, setEditIndex] = useState<number | null>(null);

        const toggle = () => setModalOpen(!modalOpen);
        const navigate = useNavigate(); 
        const token = localStorage.getItem("token");
        useEffect(()=>{
            const obtenerPedido = async() =>{
                const response = await fetch(`${appsettings.apiUrl}order/GetById?id=${id}`,{method:"GET",
                             headers:{
                                "Authorization": `Bearer ${token}`,
                                "content-Type":"application/json"
                            }
                         })
                if(response.ok){
                         const data = await response.json();
                         setPedido(data);
                     }
            }
            obtenerPedido()
        },[]);
        const [modalOpen, setModalOpen] = useState(false);    
    
            const inputChangeValue = (event:ChangeEvent<HTMLInputElement>) => {
            const inputName = event.target.name;
            const inputValue = event.target.value;
    
           // console.log(inputName, " ", inputValue);
    
            setPedido({...pedido,[inputName]:inputValue})
        }
            console.log(JSON.stringify(pedido));
            console.log("Al guardar el pedido" + JSON.stringify(pedido));
            const guardar = async() =>{
                const response = await fetch(`${appsettings.apiUrl}order/Edit`,{
                    method:'PUT',
                    headers:{
                        "Authorization": `Bearer ${token}`,
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

         const agregarDetalle = () => {
            if (editIndex !== null) {
                // estamos editando
                const detallesActualizados = [...pedido.orderDetails];
                detallesActualizados[editIndex] = nuevoDetalle;
                setPedido({ ...pedido, orderDetails: detallesActualizados });
            } else {
                setPedido({
                    ...pedido,
                    orderDetails: [...pedido.orderDetails, nuevoDetalle]
                });
            }
            setNuevoDetalle({ orderDetailId:0, productName: "", quantity: 0 }); // limpiar
            setEditIndex(null);
            setModalOpen(false);
            toggle(); // cerrar modal
            };
        
        const editarDetalle = (detalle: IPedidoDetalle, index: number) => {
            setNuevoDetalle(detalle);   // cargar datos en el formulario
            setEditIndex(index);        // guardar índice del detalle
            setModalOpen(true);         // abrir modal
        };
        
       return(
          <Container className="mt-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h4>Editar Pedido</h4>
                    <hr />
                        <Form>

                        <FormGroup>
                            <Label>Nombre de cliente</Label>
                            <Input type="text" name="customerName" onChange={inputChangeValue} value={pedido.customerName} />
                            <input type="hidden" name="orderId" value={pedido.orderId} />
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
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedido.orderDetails.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.productName}</td>
                                    <td>{d.quantity}</td>
                                    <td>
                                        <Button color="primary" onClick={()=>{editarDetalle(d,i)}}>Editar Detalle</Button>                                           
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    <br/>
                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary"   onClick={volver}>Volver</Button>
                    
                        <Modal isOpen={modalOpen} toggle={toggle}>
                            <ModalHeader toggle={toggle}>{editIndex !== null ? "Editar Producto" : "Nuevo Producto"}
                            </ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label>Nombre</Label>
                                    <Input  type="text" name="productName" value={nuevoDetalle.productName} onChange={(e) => setNuevoDetalle({ ...nuevoDetalle, productName: e.target.value })}/>
                                    <Input type="hidden" name="orderDetailId" value={nuevoDetalle.orderDetailId} />
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