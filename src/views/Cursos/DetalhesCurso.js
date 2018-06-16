import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class DetalhesCurso extends Component {

    constructor(){
        super();
        this.state = {
            curso: '',
            back: false
        }
    }

    componentDidMount(){
        try {
            this.setState({curso: this.props.location.state.curso})
        } catch(e){
            this.back();
        }
    }

    back(){
        this.setState({back: true});
    }

    render(){

        if(this.state.back === true){
            return (
                <Redirect
                    to={{
                        pathname: "/cursos"
                    }}
                />
            )
        }

        return(
            <div className="margin-top-25">
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-center">Dados do Aluno</h3>
                       <h4><strong>Título do Curso: </strong>{this.state.curso.titulo}</h4>
                       <h4><strong>Descrição: </strong>{this.state.curso.descricao}</h4>

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

export default DetalhesCurso;