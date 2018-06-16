import React, { Component } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import URL_API from "../../config";

class ComboCursos extends Component {

    constructor(){
        super();
        this.state = {
            cursos: ''
        }
    }

    componentDidMount(){
        this.buscaAlunos();
    }

    buscaAlunos(){
        axios.get(URL_API + '/cursos')
            .then((response) => {
                this.setState({cursos: response.data});
            })
            .catch(function () {
                toast.error("Erro ao buscar cursos!", {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    }

    render(){

        let opcoes = <option>Carregando...</option>

            if(this.state.cursos !== ''){
                opcoes = this.state.cursos.map(item => {
                    return (
                       <option value={item._id}>{item.titulo}</option>
                    )
                });
            }

        return opcoes
    }

}

export default ComboCursos;