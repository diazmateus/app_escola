import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import URL_API from "../../config";
import ComboAlunos from './ComboAlunos';
import ComboCursos from "./ComboCursos";
import {Redirect} from 'react-router-dom'

class Matriculas extends Component {

    constructor(){
        super();
        this.state = {
            matriculas: '',
            validacao: false,
            editando: '',
            visualizarMatricula:  '',
            search: ''
        }
    }

    componentDidMount(){
        this.buscaMatriculas();
    }

    buscaMatriculas(){
        axios.get(URL_API + '/matriculas')
            .then((response) => {
                this.setState({matriculas: response.data});
            })
            .catch(function () {
                toast.error("Erro ao buscar cursos!", {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    }

    cadastraMatricula(){

        let aluno = this.refs.aluno.value;
        let curso = this.refs.curso.value;

        if(aluno === '' || curso === '') {
            this.setState({validacao: true})
        } else {
            axios({
                method: 'post',
                url: URL_API + '/matriculas/cadastrar',
                data: {
                    "aluno": aluno,
                    "curso": curso,
                }
            }).then(() => {
                toast.success("Matrícula efetuada com sucesso!", {
                    position: toast.POSITION.TOP_CENTER
                });
                this.resetCampos();
                this.buscaMatriculas();
            }).catch(function (error) {
                toast.error("Erro ao cadastrar matricula!", {
                    position: toast.POSITION.TOP_CENTER
                });
            });

            this.setState({validacao: false})
        }
    }

    excluirMatricula(id){
        axios({
            method: 'delete',
            url: URL_API + '/matriculas/deleta/' + id,
        }).then(() => {
            toast.success("Matricula excluída com sucesso!", {
                position: toast.POSITION.TOP_CENTER
            });
            this.buscaMatriculas();
            this.resetCampos();
        }).catch(function () {
            toast.error("Erro ao excluir matricula!", {
                position: toast.POSITION.TOP_CENTER
            });
        });
    }

    editaMatricula(id){
        axios({
            method: 'get',
            url: URL_API + '/matriculas/buscar/' + id,
        }).then((response) => {
            response = response.data[0];
            let element = document.getElementById('selectAluno');
            element.value = response.aluno._id;
            let element2 = document.getElementById('selectCurso');
            element2.value = response.curso._id;
            this.setState({editando: response})
        }).catch(function () {
            toast.error("Erro ao recuperar informações do curso!", {
                position: toast.POSITION.TOP_CENTER
            });
        });
    }

    editarMatricula(){

        let aluno = this.refs.aluno.value;
        let curso = this.refs.curso.value;

        if(aluno === '' || curso === '') {
            this.setState({validacao: true})
        } else {
            axios({
                method: 'post',
                url: URL_API + '/matriculas/editar',
                data: {
                    "id": this.state.editando._id,
                    "aluno": aluno,
                    "curso": curso,
                }
            }).then(() => {
                toast.success("Matrícula editada com sucesso!", {
                    position: toast.POSITION.TOP_CENTER
                });
                this.resetCampos();
                this.buscaMatriculas();
            }).catch(function () {
                toast.error("Erro ao editar matricula!", {
                    position: toast.POSITION.TOP_CENTER
                });
            });

            this.setState({validacao: false, editando: ''})
        }
    }

    resetCampos() {
        this.refs.aluno.value = '';
        this.refs.curso.value = '';
        this.setState({validacao: false, editando: ''})
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

    verMatricula(curso){
        this.setState({visualizarMatricula: curso});
    }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0, 20)})
    }

    render() {
        if(this.state.visualizarMatricula !== '') {
            return (
                <Redirect
                    to={{
                        pathname: "/detalhe_matricula",
                        state: {matricula:  this.state.visualizarMatricula}
                    }}
                />
            )
        }

        let cursos = '';
        if(this.state.matriculas !== ''){

            let filtro = this.state.matriculas.filter(
                (matricula) => {
                    return matricula.aluno.nome.toLowerCase().indexOf(this.state.search) !== -1
                }

            )

            cursos = filtro.map((item, i) => {
                return (
                    <tr key={item._id}>
                        <th scope="row" onClick={()=>{this.verMatricula(item)}}>{i+1}</th>
                        <td onClick={()=>{this.verMatricula(item)}}>{item.aluno.nome}</td>
                        <td onClick={()=>{this.verMatricula(item)}}>{item.curso.titulo}</td>
                        <td onClick={()=>{this.verMatricula(item)}}>{this.formataData(item.data)}</td>
                        <td>
                            <button className="btn btn-flat btn-warning btn-sm margin-left-5" onClick={()=>{
                                this.editaMatricula(item._id)
                            }}>
                                <i className="fa fa-pencil"/>
                            </button>
                            <button className="btn btn-flat btn-danger btn-sm margin-left-5" onClick={()=>{
                                this.excluirMatricula(item._id)
                            }}>
                                <i className="fa fa-trash"/>
                            </button>
                        </td>
                    </tr>
                )
            });
        }

        let erro = '';

        if(this.state.validacao === true){
            erro =
                <div className="alert alert-danger" role="alert">
                    Todos os campos são de preenchimento obrigatório!
                </div>
        }

        let botao = '';

        if(this.state.editando !== ''){
            botao =
                <button className="btn btn-warning btn-flat pull-right" onClick={()=>{
                    this.editarMatricula();
                }}>
                    <i className="fa fa-pencil"/> Editar Matrícula
                </button>
        } else {
            botao =
                <button className="btn btn-success btn-flat pull-right" onClick={()=>{
                    this.cadastraMatricula();
                }}>
                    <i className="fa fa-plus"/> Matricular
                </button>
        }

        return(
            <div className="margin-top-25">
                <div className="animated fadeIn">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>MANUTENÇÃO DE MATRÍCULAS</h4>
                                    <hr/>

                                    <form>
                                        <div className="form-group">
                                            <label >Selecione o Aluno</label>
                                            <select className="form-control" ref="aluno" id="selectAluno">
                                                <ComboAlunos/>
                                            </select>

                                        </div>
                                        <div className="form-group">
                                            <label >Selecione o Curso</label>
                                            <select className="form-control" ref="curso" id="selectCurso">
                                                <ComboCursos/>
                                            </select>
                                            
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
                                    <h4>Lista de matriculas</h4>
                                    <hr/>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Pesquisa por nome do aluno</label>
                                        <input type="text" className="form-control" value={this.state.search}
                                               onChange={this.updateSearch.bind(this)} placeholder="Digite parte do nome para pesquisar"/>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-hover table-sm">
                                            <thead className="bg-primary">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Aluno</th>
                                                <th scope="col">Curso</th>
                                                <th scope="col">Data da Matricula</th>
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

export default Matriculas;