 # Proyecto: Integración Spring Boot + .NET Core + React
## Descripción
Este proyecto demuestra la integración de Spring Boot (login y generación de JWT), .NET Core (consulta de pedidos protegida) y React (frontend que consume ambas APIs).
El objetivo es mostrar un flujo completo de autenticación y autorización entre diferentes tecnologías.
### Tecnologías utilizadas
•	Backend 1: Spring Boot (Java) → Login y emisión de JWT.
•	Backend 2: .NET Core (C#) → API de pedidos protegida con validación de JWT.
•	Frontend: React (JavaScript/TypeScript) → Login y consumo de APIs.
•	Seguridad: JWT (HS256).
### Estructura del proyecto
/spring-auth → Backend Spring Boot (login) /dotnet-pedidos → Backend .NET Core (API pedidos) /react-frontend → Frontend React README.md → Documentación del proyecto 
/spring-auth        → Backend Spring Boot (login)
/dotnet-pedidos     → Backend .NET Core (API pedidos)
/react-frontend     → Frontend React

### Arquitectura
La arquitectura de este proyecto refleja la integración de API´s en SPring Boot (manejo de empleados) y .NET Core (manejo de pedidos)y se integran a través de un proyecto en React, en esta primera fase se contemplan hacerlos en servicios, pero estan pensados para que se pasen a microservicios, ya que cada una de las API´s contiene su propia base de datos, la de Spring en MySql y la de .NET en Sql Server


![Texto alternativo](Arquitectura_ordenes.drawio.svg)


⚙️ Instalación y ejecución
1. Spring Boot (Auth Service)
cd spring-auth
mvn spring-boot:run

2. .NET Core (Pedidos Service)
cd dotnet-pedidos
dotnet run

3. React (Frontend)
cd react-frontend
npm install
npm start


🔑 Flujo de autenticación
1.	El usuario hace login en Spring Boot → recibe un JWT.
2.	El frontend guarda el token en localStorage.
3.	Al consultar pedidos en .NET Core, el frontend envía el token en el header:
Authorization: Bearer 
Authorization: Bearer <token>
•4. La API valida el token y devuelve los datos protegidos.
