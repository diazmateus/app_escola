import DefaultLayout from './containers/DefaultLayout';
import Alunos from "./views/Alunos/Alunos";
import Cursos from "./views/Cursos/Cursos";
import Matriculas from "./views/Matriculas/Matriculas";

import DetalhesAluno from "./views/Alunos/DetalhesAluno";
import DetalhesCurso from "./views/Cursos/DetalhesCurso";
import DetalhesMatricula from "./views/Matriculas/DetalhesMatricula";

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/alunos', exact: true, name: 'Alunos', component: Alunos },
  { path: '/cursos', exact: true, name: 'Cursos', component: Cursos },
  { path: '/matriculas', exact: true, name: 'Matriculas', component: Matriculas },
  { path: '/detalhe_aluno', exact: true, name: 'Detalhes Aluno', component: DetalhesAluno },
  { path: '/detalhe_curso', exact: true, name: 'Detalhes Curso', component: DetalhesCurso },
  { path: '/detalhe_matricula', exact: true, name: 'Detalhes Matricula', component: DetalhesMatricula },

];

export default routes;