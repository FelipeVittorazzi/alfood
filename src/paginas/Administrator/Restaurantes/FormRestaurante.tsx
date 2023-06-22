import { TextField, Button, Grid, Container, Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import IRestaurante from '../../../interfaces/IRestaurante'
import http from '../../../http'

const FormRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            http.get<IRestaurante>(`restaurantes/${params.id}/`)
                .then(response => {
                    setNomeRestaurante(response.data.nome)
                })
        }
    }, [params])

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (params.id) { 
            http.put<IRestaurante[]>(`restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso!")
                })

        } else {
            http.post<IRestaurante[]>('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!")
                })
        }
    }

    return (  
        <Container sx={{ marginTop: 20}}>
            <Grid
                container
                spacing={2}
                sx={{ display: 'flex', justifyContent: 'center'}}
            >
                <Box component="form" onSubmit={onSubmitForm}>
                    <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                    <Grid sx={{marginBottom: 1}}>
                        <TextField
                            value={nomeRestaurante}
                            onChange={ event => setNomeRestaurante(event.target.value) }
                            id="standard-basic"
                            label="Restaurante"
                            variant="standard"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid>
                        <Button
                            sx={{ width: '100%'}}   
                            type="submit"
                            variant="outlined"
                            fullWidth>
                            Salvar
                        </Button>
                    </Grid>
                </Box>
            </Grid>
        </Container>
    )
}
 
export default FormRestaurante