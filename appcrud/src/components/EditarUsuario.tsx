import { ChangeEvent, useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { IUsuario } from "../Interfaces/IUsuario"
import { IRol } from "../Interfaces/IRol"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button} from "reactstrap"

const initialUsuario = {
    ID:0,
    userName: "",
    password: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    enabled: true,
    roles : [{rolId:2, nombre:"NORMAL"}]
}
export function EditarUsuario(){

    const {id} = useParams<{id:string}>()
    const [usuario,setUsuario] = useState<IUsuario>(initialUsuario);
    const navigate = useNavigate(); 
    const token = localStorage.getItem("token");
    
    useEffect(()=>{
        const obtenerUsuario = async() =>{
            const response = await fetch(`${appsettings.appiEmpleado}usuarios/UsuarioId/${id}`,{method:"GET",
                             headers:{
                                "Authorization": `Bearer ${token}`,
                                "content-Type":"application/json"
                            }
                         })
            if(response.ok){
                     const data = await response.json();
                     setUsuario(data);
                     console.log("REcueperar el usuario" + JSON.stringify(data));
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
            console.log("Al guardar el usuario" + JSON.stringify(usuario));
            const response = await fetch(`${appsettings.appiEmpleado}usuarios/`,{
                method:'POST',
                headers:{
                    "Authorization": `Bearer ${token}`,
                    'content-Type':'application/json'
                },
                body:JSON.stringify(usuario)
            })
    
            if(response.ok){
                navigate("/listausuarios")
            }else{
                Swal.fire({
                title: "Error",
                text: "No se pudo editar el empleado",
                icon: "warning"
                })
            }
    
        }

    const volver = () =>{
        navigate("/listausuarios")
    }

 
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    // Definir los roles disponibles con su ID
    const rolesMap: Record<string, IRol> = {
      ADMIN: { rolId: 1, nombre: "ADMIN" },
      NORMAL: { rolId: 2, nombre: "NORMAL" }
    };

    if (checked) {
      // Agregar rol si no existe
      setUsuario({
        ...usuario,
        roles: [...usuario.roles, rolesMap[name]]
      });
    } else {
      // Quitar rol si se desmarca
      setUsuario({
        ...usuario,
        roles: usuario.roles.filter((r) => r.nombre !== name)
      });
    }
  };

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
                            <Input type="hidden" name="ID" onChange={inputChangeValue} value={usuario.ID} />
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
                            <Label className="me-4"><strong>Estatus</strong></Label>
                            <br/>
                            <Label className="me-4">Activo</Label>
                            <Input type="radio" name="enabled" className="me-4" onChange={inputChangeValue} value="true" checked={usuario.enabled==true} >Habilitado</Input>
                            <Label className="me-4">Inactivo</Label>
                            <Input type="radio" name="enabled" onChange={inputChangeValue} value="false" checked={usuario.enabled==false} >Deshabilitado</Input>
                        </FormGroup>              
                         <FormGroup>
                            <Label > <strong>Roles</strong></Label>
                            <br/>
                            <Label className="me-4">Admin</Label>
                            <Input type="checkbox" className="me-4" name="ADMIN" onChange={handleCheckboxChange} checked={usuario.roles.some((r) => r.nombre === "ADMIN")}/>
                             <Label className="me-4">Normal</Label>
                            <Input type="checkbox" className="me-4" name="NORMAL" onChange={handleCheckboxChange}   checked={usuario.roles.some((r) => r.nombre === "NORMAL")} />
                        </FormGroup>                                                              

                    </Form> 
                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary"   onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>

    )
}