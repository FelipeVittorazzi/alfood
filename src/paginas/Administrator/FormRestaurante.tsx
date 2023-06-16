import { TextField, Button, Grid, Container } from '@mui/material'
import IRestaurante from '../../interfaces/IRestaurante'
import axios from 'axios'
import { useEffect, useState } from 'react'

const FormRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        axios.post<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/', {
            nome: nomeRestaurante
        })
            .then(() => {
                alert("Restaurante Cadastradi com Sucesso")
            })
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