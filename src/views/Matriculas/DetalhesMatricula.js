import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class DetalhesMatricula extends Component {

    constructor(){
        super();
        this.state = {
            matricula: '',
            back: false
        }
    }

    componentDidMount(){
        try {
            this.setState({matricula: this.props.location.state.matricula})
        } catch(e){
            this.back();
        }
    }

    formataData(d){
        d = d.split("T")[0]
        let data = new Date(d);
        let dia = data.getDate();
        if (dia.toString().length === 1)
            dia = "0"+dia;
        let mes = data.getMonth()+1;
        if (mes.toString().length === 1)
            mes = "0"+mes;
        let ano = data.getFullYear();
        return dia+"/"+mes+"/"+ano;
    }

    back(){
        this.setState({back: true});
    }

    render(){

        if(this.state.back === true){
            return (
                <Redirect
                    to={{
                        pathname: "/matriculas"
                    }}
                />
            )
        }

        if(this.state.matricula !== '') {
            return (
                <div className="margin-top-25">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center">Dados da Matrícula</h3>
                            <h4><strong>Nome do aluno: </strong>{this.state.matricula.aluno.nome}</h4>
                            <h4><strong>E-mail: </strong>{this.state.matricula.aluno.email}</h4>
                            <h4><strong>Data de
                                Nascimento: </strong>{this.formataData(this.state.matricula.aluno.data_nascimento)}</h4>
                            <br/>
                            <h4><strong>Título do Curso: </strong>{this.state.matricula.curso.titulo}</h4>
                            <h4><strong>Descrição: </strong>{this.state.matricula.curso.descricao}</h4>
                            <hr/>

                            <button className="btn btn-primary btn-flat" onClick={() => {
                                this.back()
                            }}>Voltar
                            </button>

                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <h1>Erro</h1>
            )
        }

    }
}

export default DetalhesMatricula;