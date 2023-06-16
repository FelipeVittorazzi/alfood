import { useEffect, useState } from 'react';
import axios from 'axios';

import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { IPagination } from '../../interfaces/IPagination';

const ListaRestaurantes = () => {

 const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
 const [nextPagination, setNextPagination] = useState('')

  useEffect(() => {
    // Obeter Restaurantes
    axios.get<IPagination<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
    .then(response => {
      setRestaurantes(response.data.results)
      setNextPagination(response.data.next)
    })
    .catch(erro => {
      console.log(erro)
    })
  }, [])

  const verMais = () => {
    axios.get<IPagination<IRestaurante>>(nextPagination)
    .then(response => {
      setRestaurantes([...restaurantes, ...response.data.results])
      setNextPagination(response.data.next)
    })
    .catch(erro => {
      console.log(erro)
    })
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {nextPagination && <button onClick={verMais}>
      Ver Mais
    </button>}
  </section>)
}

export default ListaRestaurantes