import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Redirect} from 'react-router-dom'
import URL_API from "../../config";

class Cursos extends Component {

    constructor(){
        super();
        this.state = {
            cursos: '',
            validacao: false,
            editando: '',
            visualizaCurso: '',
            search: ''
        }
    }

    componentDidMount(){
        this.buscaCursos();
    }

    buscaCursos(){
        axios.get(URL_API + '/cursos')
            .then((response) => {
                this.setState({cursos: response.data});
            })
            .catch(function (error) {
                toast.error("Erro ao buscar cursos!", {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    }

    cadastraCurso(){

        let titulo = this.refs.titulo.value;
        let descricao = this.refs.descricao.value;

        if(titulo === '' || descricao === '') {
            this.setState({validacao: true})
        } else {
            axios({
                method: 'post',
                url: URL_API + '/cursos/cadastrar',
                data: {
                    "titulo": titulo,
                    "descricao": descricao,
                }
            }).then(() => {
                toast.success("Curso cadastrado com sucesso!", {
                    position: toast.POSITION.TOP_CENTER
                });
                this.resetCampos();
                this.buscaCursos();
            }).catch(function (error) {
                toast.error("Erro ao cadastrar curso!", {
                    position: toast.POSITION.TOP_CENTER
                });
            });

            this.setState({validacao: false})
        }
    }

    excluirCurso(id){
        axios({
            method: 'delete',
            url: URL_API + '/cursos/deleta/' + id,
        }).then(() => {
            toast.success("Curso excluído com sucesso!", {
                position: toast.POSITION.TOP_CENTER
            });
            this.buscaCursos();
            this.resetCampos();
        }).catch(function () {
            toast.error("Erro ao excluir curso!", {
                position: toast.POSITION.TOP_CENTER
            });
        });
    }

    editarCurso(id){
        axios({
            method: 'get',
            url: URL_API + '/cursos/buscar/' + id,
        }).then((response) => {
            response = response.data[0];
            this.refs.titulo.value = response.titulo;
            this.refs.descricao.value = response.descricao;
            this.setState({editando: response})
        }).catch(function () {
            toast.error("Erro ao recuperar informações do curso!", {
                position: toast.POSITION.TOP_CENTER
            });
        });
    }

    editaCurso(){

        let titulo = this.refs.titulo.value;
        let descricao = this.refs.descricao.value;

        if(titulo === '' || descricao === '') {
            this.setState({validacao: true})
        } else {
            axios({
                method: 'post',
                url: URL_API + '/cursos/editar',
                data: {
                    "id": this.state.editando._id,
                    "titulo": titulo,
                    "descricao": descricao,
                }
            }).then(() => {
                toast.success("Curso editado com sucesso!", {
                    position: toast.POSITION.TOP_CENTER
                });
                this.resetCampos();
                this.buscaCursos();
            }).catch(function () {
                toast.error("Erro ao editar curso!", {
                    position: toast.POSITION.TOP_CENTER
                });
            });

            this.setState({validacao: false, editando: ''})
        }
    }

    resetCampos() {
        this.refs.titulo.value = '';
        this.refs.descricao.value = '';
        this.setState({validacao: false, editando: ''})
    }

    verCurso(curso){
        this.setState({visualizaCurso: curso});
    }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0, 20)})
    }

    render(){

        if(this.state.visualizaCurso !== ''){
            return (
                <Redirect
                    to={{
                        pathname: "/detalhe_curso",
                        state: {curso:  this.state.visualizaCurso}
                    }}
                />
            )
        }

        let cursos = '';
        if(this.state.cursos !== ''){

            let filtro = this.state.cursos.filter(
                (curso) => {
                    return curso.titulo.toLowerCase().indexOf(this.state.search) !== -1
                }

            )

            cursos = filtro.map((item, i) => {
                return (
                    <tr key={item._id}>
                        <th scope="row" onClick={()=>{this.verCurso(item)}}>{i+1}</th>
                        <td onClick={()=>{this.verCurso(item)}}>{item.titulo}</td>
                        <td onClick={()=>{this.verCurso(item)}}>{item.descricao}</td>
                        <td>
                            <button className="btn btn-flat btn-warning btn-sm margin-left-5" onClick={()=>{
                                this.editarCurso(item._id)
                            }}>
                                <i className="fa fa-pencil"/>
                            </button>
                            {/*<button className="btn btn-flat btn-danger btn-sm margin-left-5" onClick={()=>{*/}
                                {/*this.excluirCurso(item._id)*/}
                            {/*}}>*/}
                                {/*<i className="fa fa-trash"/>*/}
                            {/*</button>*/}
                        </td>
                    </tr>
                )
            });
        }

        let erro = '';

        if(this.state.validacao === true){
            erro =
                <div className="alert alert-danger" role="alert">
                    O campo <strong>Título</strong>, é de preenchimento obrigatório!
                </div>
        }

        let botao = '';

        if(this.state.editando !== ''){
            botao =
                <button className="btn btn-warning btn-flat pull-right" onClick={()=>{
                    this.editaCurso();
                }}>
                    <i className="fa fa-pencil"/> Editar
                </button>
        } else {
            botao =
                <button className="btn btn-success btn-flat pull-right" onClick={()=>{
                    this.cadastraCurso();
                }}>
                    <i className="fa fa-plus"/> Cadastrar
                </button>
        }

        return(
            <div className="margin-top-25">
                <div className="animated fadeIn">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>MANUTENÇÃO DE CURSOS</h4>
                                    <hr/>

                                    <form>
                                        <div className="form-group">
                                            <label >Título</label>
                                            <input type="text" className="form-control" ref="titulo" placeholder="Digite aqui o título do curso. Ex.: Matemática" />
                                        </div>
                                        <div className="form-group">
                                            <label >Descrição</label>
                                            <textarea className="form-control" ref="descricao" cols="30" rows="3" placeholder="Digite a descrição aqui..."/>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    {erro}
                                                </div>
                                                <div className="col-md-6">
                                                    {botao}
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </div>

                                <div className="col-sm-12 margin-top-25">
                                    <h4>Lista de cursos</h4>
                                    <hr/>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Pesquisa por título</label>
                                        <input type="text" className="form-control" value={this.state.search}
                                               onChange={this.updateSearch.bind(this)} placeholder="Digite parte do título para pesquisar"/>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover table-sm">
                                            <thead className="bg-primary">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Título</th>
                                                <th scope="col">Descrição</th>
                                                <th scope="col">Opções</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {cursos}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cursos;