import { IAutentica } from "../Interfaces/IAutentica"
import { ChangeEvent, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button} from "reactstrap"
import axios from "axios";


const AutenticaInicial = {
    userName:"",
    password:""
}

export function Autenticar(){

 const [autentica,setAutentica] = useState<IAutentica>(AutenticaInicial);
    const navigate = useNavigate();

    const inputChangeValue = (event:ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

       // console.log(inputName, " ", inputValue);

        setAutentica({...autentica,[inputName]:inputValue})
    }


    const validar = async() =>{
        const response = await fetch(`${appsettings.appiEmpleado}generate-token`,{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify(autentica)
        })

        if(response.ok){
            const data = await response.json();
            localStorage.setItem("token", data.token);
            navigate("/")
        }else{
            Swal.fire({
            title: "Error",
            text: "Datos inválidos",
            icon: "warning"
            })
        }

    }


    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h4>Autenticación</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Usuario</Label>
                            <Input type="text" name="userName" onChange={inputChangeValue} value={autentica.userName} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Contraseña</Label>
                            <Input type="password" name="password" onChange={inputChangeValue} value={autentica.password} />
                        </FormGroup>                        

                    </Form> 
                    <Button color="primary" className="me-4" onClick={validar}>Validar</Button>
                </Col>
            </Row>
        </Container>
    )
}
