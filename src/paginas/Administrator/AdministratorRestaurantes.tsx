import { Paper, TableContainer, Table,TableHead ,TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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

    const excluir = (restauranteOnDeleted: IRestaurante) => {
        axios.delete<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${restauranteOnDeleted.id}/`)
            .then(() => {
                const listRestaurante = restaurantes.filter((restaurante) => restaurante.id != restauranteOnDeleted.id)
                setRestauntes([...listRestaurante])
            })
    }

    return ( 
        <TableContainer component={Paper} sx={{ paddingTop: 5}} >
            <Link to={"/admin/restaurantes/novo"}>
                <Button variant="outlined">
                    Criar Restaurante
                </Button>
            </Link>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            <Link to={`/admin/restaurantes/${restaurante.id}`}>
                                <EditIcon aria-label="Editar" sx={{color: "black"}} />
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Button>
                                <DeleteOutlineIcon aria-label="Excluir" color="error" 
                                    onClick={() => excluir(restaurante)}
                                />
                            </Button>
                        </TableCell>
                    </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
    )
}
 
export default AdministratorRestaurantes;