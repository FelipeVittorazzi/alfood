import { TextField, Button, Grid, Container, Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import IPrato from '../../../interfaces/IPrato'
import http from '../../../http'

const FormPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            http.get<IPrato>(`pratos/${params.id}/`)
                .then(response => {
                    setNomePrato(response.data.nome)
                })
        }
    }, [params])

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (params.id) { 
            http.put<IPrato[]>(`pratos/${params.id}/`, {
                nome: nomePrato
            })
                .then(() => {
                    alert("Prato atualizado com sucesso!")
                })

        } else {
            http.post<IPrato[]>('pratos/', {
                nome: nomePrato
            })
                .then(() => {
                    alert("Prato cadastrado com sucesso!")
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
                    <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
                    <Grid sx={{marginBottom: 1}}>
                        <TextField
                            value={nomePrato}
                            onChange={ event => setNomePrato(event.target.value) }
                            id="standard-basic"
                            label="Prato"
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
 
export default FormPrato