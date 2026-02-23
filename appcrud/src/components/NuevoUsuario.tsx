import { ChangeEvent, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { IUsuario } from "../Interfaces/IUsuario"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button} from "reactstrap"
import type { IRol } from "./IRol"

const initialUsuario = {
    userName: "",
    password: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    enabled: true,
    roles : [{rolId:2, nombre:"NORMAL"}]
}

export function NuevoUsuario(){

    const [usuario,setUsuario] = useState<IUsuario>(initialUsuario);
    const navigate = useNavigate();

    const inputChangeValue = (event:ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

       // console.log(inputName, " ", inputValue);

        setUsuario({...usuario,[inputName]:inputValue})
    }

    const guardar = async() =>{
            console.log(JSON.stringify(usuario));
            const response = await fetch(`${appsettings.appiEmpleado}usuarios/`,{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify(usuario)
        })

        if(response.ok){
            navigate("/autenticar")
        }else{
            Swal.fire({
            title: "Error",
            text: "No se pudo guardar el usuario",
            icon: "warning"
            })
        }

    }
    const volver = () =>{
        navigate("/autenticar")
    }

    return(
           <Container className="mt-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h4>Editar</h4>
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

                    </Form> 
                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary"   onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )
}
