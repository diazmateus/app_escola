import React, { Component } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import URL_API from "../../config";

class ComboAlunos extends Component {

    constructor(){
        super();
        this.state = {
            alunos: ''
        }
    }

    componentDidMount(){
        this.buscaAlunos();
    }

    buscaAlunos(){
        axios.get(URL_API + '/alunos')
            .then((response) => {
                this.setState({alunos: response.data});
            })
            .catch(function () {
                toast.error("Erro ao buscar alunos!", {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    }

    render(){

        let opcoes = <option>Carregando...</option>

        if(this.state.alunos !== ''){
            opcoes = this.state.alunos.map(item => {
                return (
                    <option value={item._id}>{item.nome}</option>
                )
            });
        }

        return opcoes
    }

}

export default ComboAlunos;