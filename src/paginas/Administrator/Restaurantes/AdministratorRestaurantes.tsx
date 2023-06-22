import { Paper, TableContainer, Table,TableHead ,TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
 
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const AdministratorRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>("restaurantes/")
            .then(response => {
                setRestaurantes(response.data)
            })
            .catch(erro => {
                console.log(erro)
            })
    },[])

    const excluir = (restauranteOnDeleted: IRestaurante) => {
        http.delete<IRestaurante>(`restaurantes/${restauranteOnDeleted.id}/`)
            .then(() => {
                const listRestaurante = restaurantes.filter((restaurante) => restaurante.id != restauranteOnDeleted.id)
                setRestaurantes([...listRestaurante])
            })
    }

    return ( 
        <TableContainer component={Paper} sx={{ paddingTop: 5}} >
            <Link to={"/admin/restaurante/novo"}>
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