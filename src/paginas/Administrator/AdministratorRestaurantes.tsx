import { Paper, TableContainer, Table,TableHead ,TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
 
import axios from "axios";
import IRestaurante from "../../interfaces/IRestaurante";

const AdministratorRestaurantes = () => {

    const [restaurantes, setRestauntes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios.get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
            .then(response => {
                setRestauntes(response.data)
            })
            .catch(erro => {
                console.log(erro)
            })
    },[])
    

    return ( 
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                    </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
    )
}
 
export default AdministratorRestaurantes;