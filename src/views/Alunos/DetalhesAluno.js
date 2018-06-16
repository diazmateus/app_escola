import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class DetalhesAluno extends Component {

    constructor(){
        super();
        this.state = {
            aluno: '',
            back: false
        }
    }

    componentDidMount(){
        try {
            this.setState({aluno: this.props.location.state.aluno})
        } catch(e){
            this.back();
        }
    }

    formataData(d){
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
                        pathname: "/alunos"
                    }}
                />
            )
        }

        return(
            <div className="margin-top-25">
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-center">Dados do Aluno</h3>
                       <h4><strong>Nome do aluno: </strong>{this.state.aluno.nome}</h4>
                       <h4><strong>E-mail: </strong>{this.state.aluno.email}</h4>
                       <h4><strong>Data de Nascimento: </strong>{this.formataData(this.state.aluno.data_nascimento)}</h4>

                        <hr/>

                        <button className="btn btn-primary btn-flat" onClick={() => {
                            this.back()
                        }}>Voltar</button>

                    </div>
                </div>
            </div>
        )

    }
}

export default DetalhesAluno;