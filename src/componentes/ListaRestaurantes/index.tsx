import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import IRestaurante from '../../interfaces/IRestaurante';
import { IPagination } from '../../interfaces/IPagination';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

interface IParamsSearch {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [nextPage, setNextPage] = useState('')
  const [previousPage, setPreviousPage] = useState('')
  const [resultSearch, setResultSearch] =  useState('')
  const [ordering, setOrdering] =  useState('')

  const loadData = (url: string, options: AxiosRequestConfig = {}) => {
  axios.get<IPagination<IRestaurante>>(url, options) 
    .then(response => {
      setRestaurantes(response.data.results)
      setNextPage(response.data.next)
      setPreviousPage(response.data.previous)
    })
    .catch(erro => {
      console.log(erro)
    })
  }

  const searchRestaurante = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const options = {
      params: {} as IParamsSearch
    }
    if (resultSearch) {
      options.params.search = resultSearch
    }
    if (ordering) {
      options.params.ordering = ordering
    }
    loadData('http://localhost:8000/api/v1/restaurantes/', options)
  }

  useEffect(() => {
    // Obeter Restaurantes
    loadData('http://localhost:8000/api/v1/restaurantes/')
  }, [ordering])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={searchRestaurante} style={{display: 'flex'}}>
      <TextField
        label="Buscar"
        placeholder="Buscar"
        value={resultSearch}
        onChange={event => setResultSearch(event.target.value)}
      />
      <select
        name="select-ordening"
        id="select-ordening"  
        value={ordering}
        onChange={event => setOrdering(event.target.value)}
      >
        <option value="id">ID</option>
        <option value="nome">Nome</option>
      </select>
      <Button type='submit'>
        <SearchIcon aria-label='Buscar'/>
      </Button>
    </form>

    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<Button variant="outlined" onClick={() => loadData(previousPage)} disabled={!previousPage}>
      <NavigateBeforeIcon aria-label="Página anterior" />
    </Button>}
    {<Button variant="outlined" onClick={() => loadData(nextPage)} disabled={!nextPage}>
      <NavigateNextIcon aria-label="Próxima página" />
    </Button>}
  </section>)
}

export default ListaRestaurantes