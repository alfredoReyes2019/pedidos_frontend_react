import { ChangeEvent, useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { IUsuario } from "../Interfaces/IUsuario"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button} from "reactstrap"

const initialUsuario = {
    id:0,
   userName: "",
    password: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    enabled: false,
    roles : [{rolId:2, nombre:"NORMAL"}]
}
export function EditarUsuario(){

    const {id} = useParams<{id:string}>()
    const [usuario,setUsuario] = useState<IUsuario>(initialUsuario);
    const navigate = useNavigate(); 

    useEffect(()=>{
        const obtenerUsuario = async() =>{
            const response = await fetch(`${appsettings.apiUrl}usuario/Obtener/${id}`)
            if(response.ok){
                     const data = await response.json();
                     setUsuario(data);
                 }
        }
        obtenerUsuario()
    },[])

        const inputChangeValue = (event:ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

       // console.log(inputName, " ", inputValue);

        setUsuario({...usuario,[inputName]:inputValue})
    }

       const guardar = async() =>{
            const response = await fetch(`${appsettings.apiUrl}usuarios`,{
                method:'PUT',
                headers:{
                    'content-Type':'application/json'
                },
                body:JSON.stringify(usuario)
            })
    
            if(response.ok){
                navigate("/")
            }else{
                Swal.fire({
                title: "Error",
                text: "No se pudo editar el empleado",
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
                    <h4>Editar Usuario</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Nombre de usuario</Label>
                            <Input type="text" name="userName" onChange={inputChangeValue} value={usuario.userName} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Contraseña</Label>
                            <Input type="password" name="password" onChange={inputChangeValue} value={usuario.password} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" name="nombre" onChange={inputChangeValue} value={usuario.nombre} />
                        </FormGroup>                        
                        <FormGroup>
                            <Label>Apellido</Label>
                            <Input type="text" name="apellido" onChange={inputChangeValue} value={usuario.apellido} />
                        </FormGroup> 
                        <FormGroup>
                            <Label>Correo</Label>
                            <Input type="text" name="email" onChange={inputChangeValue} value={usuario.email} />
                        </FormGroup> 
                        <FormGroup>
                            <Label>Teléfono</Label>
                            <Input type="text" name="telefono" onChange={inputChangeValue} value={usuario.telefono} />
                        </FormGroup>
                         <FormGroup>
                            <Label>Estatus</Label>
                            <Input type="radio" name="enabled" className="me-4" onChange={inputChangeValue} value={"true"} >Habilitado</Input>
                            <Input type="radio" name="enabled" onChange={inputChangeValue} value={"false"} >Deshabilitado</Input>
                        </FormGroup>              
                         <FormGroup>
                            <Label>Roles</Label>
                            <Input type="checkbox" name="roles_admin" onChange={inputChangeValue} >ADMIN</Input>
                            <Input type="checkbox" name="roles_normal" onChange={inputChangeValue} >NORMAL</Input>
                        </FormGroup>                                                              

                    </Form> 
                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary"   onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>

    )
}