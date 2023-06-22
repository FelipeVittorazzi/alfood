import { Paper, TableContainer, Table,TableHead ,TableRow, TableCell, TableBody, Button, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
 
import IPrato from '../../../interfaces/IPrato'
import http from '../../../http'

const AdministratorPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>("pratos/")
            .then(response => {
                setPratos(response.data)
            })
            .catch(erro => {
                console.log(erro)
            })
    },[])

    const excluir = (pratoOnDeleted: IPrato) => {
        http.delete<IPrato>(`pratos/${pratoOnDeleted.id}/`)
            .then(() => {
                const listPrato = pratos.filter((prato) => prato.id != pratoOnDeleted.id)
                setPratos([...listPrato])
            })
    }

    return ( 
        <TableContainer component={Paper} sx={{ paddingTop: 5}} >
            <Link to={"/admin/prato/novo"}>
                <Button variant="outlined">
                    Criar Prato
                </Button>
            </Link>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Descrição
                        </TableCell>
                        <TableCell>
                            Imagem
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
                    {pratos.map(prato => <TableRow key={prato.id}>
                        <TableCell>
                            {prato.nome}
                        </TableCell>
                        <TableCell style={{ width: 50, overflow: "hidden"}}>
                            {prato.descricao}
                        </TableCell>
                        <TableCell>
                            <CardMedia
                                component="img"
                                sx={{ width: 100 }}
                                image={prato.imagem}
                                alt="Live from space album cover"
                            />
                        </TableCell>
                        <TableCell>
                            <Link to={`/admin/pratos/${prato.id}`}>
                                <EditIcon aria-label="Editar" sx={{color: "black"}} />
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Button>
                                <DeleteOutlineIcon aria-label="Excluir" color="error" 
                                    onClick={() => excluir(prato)}
                                />
                            </Button>
                        </TableCell>
                    </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
    )
}
 
export default AdministratorPratos;