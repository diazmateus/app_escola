import React, { Component } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {Redirect} from 'react-router-dom'
import URL_API from '../../config';

class Alunos extends Component {

    constructor(){
        super();
        this.state = {
            alunos: '',
            validacao: false,
            editando: '',
            visualizaAluno: '',
            search: ''
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

    cadastraAlunos(){

        let nome = this.refs.nome.value;
        let email = this.refs.email.value;
        let data_nascimento = this.refs.nascimento.value;

        if(nome === '' || email === '') {
            this.setState({validacao: true})
        } else {
            axios({
                method: 'post',
                url: URL_API + '/alunos/cadastrar',
                data: {
                    "nome": nome,
                    "email": email,
                    "data_nascimento": data_nascimento
                }
            }).then(() => {
                toast.success("Aluno cadastrado com sucesso!", {
                    position: toast.POSITION.TOP_CENTER
                });
                    this.resetCampos();
                    this.buscaAlunos();
                }).catch(function (error) {
                toast.error("Erro ao cadastrar aluno!", {
                    position: toast.POSITION.TOP_CENTER
                });
                });

            this.setState({validacao: false})
        }
    }

    excluirAluno(id){
        axios({
            method: 'delete',
            url: URL_API + '/alunos/deleta/' + id,
        }).then(() => {
            toast.success("Aluno excluído com sucesso!", {
                position: toast.POSITION.TOP_CENTER
            });
            this.buscaAlunos();
            this.resetCampos();
        }).catch(function () {
            toast.error("Erro ao excluir aluno!", {
                position: toast.POSITION.TOP_CENTER
            });
        });
    }

    editarAluno(id){
        axios({
            method: 'get',
            url: URL_API + '/alunos/buscar/' + id,
        }).then((response) => {
            response = response.data[0];
            this.refs.nome.value = response.nome;
            this.refs.email.value = response.email;
            this.refs.nascimento.value = response.data_nascimento;
            this.setState({editando: response})
        }).catch(function () {
            toast.error("Erro ao recuperar informações do aluno!", {
                position: toast.POSITION.TOP_CENTER
            });
        });
    }

    editaAluno(){

        let nome = this.refs.nome.value;
        let email = this.refs.email.value;
        let data_nascimento = this.refs.nascimento.value;

        if(nome === '' || email === '') {
            this.setState({validacao: true})
        } else {
            axios({
                method: 'post',
                url: URL_API + '/alunos/editar',
                data: {
                    "id": this.state.editando._id,
                    "nome": nome,
                    "email": email,
                    "data_nascimento": data_nascimento
                }
            }).then(() => {
                toast.success("Aluno editado com sucesso!", {
                    position: toast.POSITION.TOP_CENTER
                });
                this.resetCampos();
                this.buscaAlunos();
            }).catch(function () {
                toast.error("Erro ao editar aluno!", {
                    position: toast.POSITION.TOP_CENTER
                });
            });

            this.setState({validacao: false, editando: ''})
        }
    }

    resetCampos() {
        this.refs.nome.value = '';
        this.refs.email.value = '';
        this.refs.nascimento.value ='dd/mm/yyyy';
        this.setState({validacao: false, editando: ''})
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

    verAluno(aluno){
        this.setState({visualizaAluno: aluno});
    }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0, 20)})
    }

    render(){
        if(this.state.visualizaAluno !== ''){
            return (
                <Redirect
                    to={{
                        pathname: "/detalhe_aluno",
                        state: {aluno:  this.state.visualizaAluno}
                    }}
                />
            )
        }


        let alunos = '';
        if(this.state.alunos !== ''){

            let filtro = this.state.alunos.filter(
                (aluno) => {
                    return aluno.nome.toLowerCase().indexOf(this.state.search) !== -1 ||
                    aluno.email.toLowerCase().indexOf(this.state.search) !== -1
                }

            )

           alunos = filtro.map((item, i) => {
               return (
                   <tr key={item._id}>
                       <th scope="row" onClick={()=>{this.verAluno(item)}}>{i+1}</th>
                       <td onClick={()=>{this.verAluno(item)}}>{item.nome}</td>
                       <td onClick={()=>{this.verAluno(item)}}>{item.email}</td>
                       <td onClick={()=>{this.verAluno(item)}}>{this.formataData(item.data_nascimento)}</td>
                       <td>
                           <button className="btn btn-flat btn-warning btn-sm margin-left-5" onClick={()=>{
                               this.editarAluno(item._id)
                           }}>
                               <i className="fa fa-pencil"/>
                           </button>
                           {/*<button className="btn btn-flat btn-danger btn-sm margin-left-5" onClick={()=>{*/}
                               {/*this.excluirAluno(item._id)*/}
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
                    Os campos <strong>Nome</strong> e <strong>E-mail</strong>, são de preenchimento obrigatório!
                </div>
        }

        let botao = '';

        if(this.state.editando !== ''){
            botao =
                <button className="btn btn-warning btn-flat pull-right" onClick={()=>{
                    this.editaAluno();
                }}>
                    <i className="fa fa-pencil"/> Editar
                </button>
        } else {
            botao =
                <button className="btn btn-success btn-flat pull-right" onClick={()=>{
                    this.cadastraAlunos();
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
                                       <h4>MANUTENÇÃO DE ALUNOS</h4>
                                        <hr/>

                                        <form>
                                            <div className="form-group">
                                                <label >Nome do aluno</label>
                                                <input type="text" className="form-control" id="nome" ref="nome" placeholder="Digite aqui o nome do aluno, ex.: João da Silva" />
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label >E-mail</label>
                                                        <input type="email" className="form-control" ref="email" placeholder="Digite aqui o e-mail, ex.: joao@email.com" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label >Data de nascimento</label>
                                                        <input type="date" ref="nascimento" className="form-control"/>
                                                    </div>
                                                </div>
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


                                    <div className="col-sm-12">
                                        <h4>Lista de alunos</h4>
                                        <hr/>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Pesquisa por e-mail e nome</label>
                                            <input type="text" className="form-control" value={this.state.search}
                                                   onChange={this.updateSearch.bind(this)} placeholder="Digite parte do nome ou e-mail para pesquisar"/>
                                        </div>

                                        <div className="table-responsive">
                                            <table className="table table-hover table-sm">
                                                <thead className="bg-primary">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Nome do Aluno</th>
                                                    <th scope="col">E-mail</th>
                                                    <th scope="col">Data de Nascimento</th>
                                                    <th scope="col">Opções</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {alunos}
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

export default Alunos;