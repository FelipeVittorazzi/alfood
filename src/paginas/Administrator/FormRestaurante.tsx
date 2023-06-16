import axios from 'axios'
import { TextField, Button, Grid, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import IRestaurante from '../../interfaces/IRestaurante'

const FormRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${params.id}/`)
                .then(response => {
                    setNomeRestaurante(response.data.nome)
                })
        }
    }, [params])

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (params.id) { 
            axios.put<IRestaurante[]>(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso!")
                })

        } else {
            axios.post<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!")
                })
        }
    }

    return (  
        <Container
            sx={{ width: `100%`, marginTop: 20}}>
            <Grid
                container
                spacing={2}
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center'}}
            >

                <form onSubmit={onSubmitForm}>
                    <Grid xs={12}>
                        <TextField sx={{ width: '100%'}}
                            value={nomeRestaurante}
                            onChange={ event => setNomeRestaurante(event.target.value) }
                            id="standard-basic"
                            label="Restaurante"
                            variant="standard"
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Button
                            sx={{ width: '100%'}}   
                            type="submit"
                            variant="outlined">
                            Salvar
                        </Button>
                    </Grid>
                </form>
                
            </Grid>
        </Container>
    )
}
 
export default FormRestaurante