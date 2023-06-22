import { TextField, Button, Grid, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react'
import http from '../../../http'
import ITag from '../../../interfaces/ITag'
import IRestaurante from '../../../interfaces/IRestaurante'

const FormPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [desc, setDesc] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)
    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')

    useEffect(() => {
        http.get< { tags: ITag[] } >('tags/')
        .then(response => setTags(response.data.tags))

        http.get<IRestaurante[]>('restaurantes/')
        .then(response => setRestaurantes(response.data))
    }, [])

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData();

        formData.append('nome', nomePrato)
        formData.append('descricao', desc)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)
        
        if (imagem) {
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => alert('Prato cadastrado com sucesso!'))
            .catch(erro => console.log(erro))
    }

    const selectedArcquive = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImagem(event.target.files[0])
        } else {
            setImagem(null)
        }
    }

    return (  
        <Container sx={{ marginTop: 20}}>
            <Grid
                container
                spacing={2}
                sx={{ display: 'flex', justifyContent: 'center'}}
            >
                <Box component="form" onSubmit={onSubmitForm} sx={{width: "50%"}}>
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
                    <Grid sx={{marginBottom: 1}}>
                        <TextField
                            value={desc}
                            onChange={ event => setDesc(event.target.value) }
                            id="standard-basic"
                            label="Descrição do Prato"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid container sx={{marginBottom: 1, justifyContent: 'space-between'}}>
                        <Grid item={true} xs={5}>
                            <FormControl margin="dense" fullWidth>
                                <InputLabel id="select-tag">Tag</InputLabel>
                                <Select labelId="select-tag" value={tag} onChange={event => setTag(event.target.value)}  variant="standard" required> 
                                    {tags.map(tag =>
                                        <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item={true} xs={5}>
                            <FormControl margin="dense" fullWidth>
                                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                                <Select labelId="select-restaurante" value={restaurante} onChange={event => setRestaurante(event.target.value)}  variant="standard" required>
                                    {restaurantes.map(restaurante =>
                                        <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    
                    <Grid>
                        <input type='file' onChange={selectedArcquive} accept=".png,.jpeg,.jpg,.gif"></input>
                    </Grid>
                    <Grid>
                        <Button
                            sx={{ width: '100%', mt: 1}}   
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