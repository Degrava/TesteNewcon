import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


import "./styles.css";
import logoImg from '../../assets/placeholder.png'
import ItemLista from "../../components/ItemLista/ItemLista";
import Paginacao from "../../components/Paginacao.tsx/Paginacao";
import { PontoTuristico } from "../../model/PontoTuristico";


export function Home() {

    const [pontos, setPontos] = useState<PontoTuristico[]>([]);
    const [pontosFiltrados, setPontosFiltrados] = useState<PontoTuristico[]>([]);
    const [paginaAtual, setPaginaAtual] = useState<number>(1);
    const [itensPorPagina, setItensPorPagina] = useState<number>(5);
    const indexUltimoItem = paginaAtual * itensPorPagina;
    const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
    const pontosAtuais: PontoTuristico[] = pontosFiltrados.slice(indexPrimeiroItem, indexUltimoItem);


    useEffect(() => {
        axios.get("https://localhost:7291/api/PontoTuristico")
            .then(response => {
                setPontos(response.data);
            })
    }, [])

    useEffect(() => {
        pontos.sort((a, b) => {
            if (a.DataCadastro > b.DataCadastro) return -1;
            if (a.DataCadastro < b.DataCadastro) return 1;
            return 0;
        });
        setPontosFiltrados(pontos);
    }, [pontos])


    function ExcluirItem(id: number) {
        axios.delete("https://localhost:7291/api/PontoTuristico/" + id)
        .catch(() => {
            alert("Ocorreu um erro, tente novamente!");
        });

        setPontos(pontos.filter(ponto => ponto.Id !== id));
    }

    function FiltraPontosTuristicos(pesquisa: string) {
        if (pesquisa !== '') {
            const filtrados: PontoTuristico[] = pontos.filter(ponto => {
                return ponto.Nome.toLocaleLowerCase().indexOf(pesquisa.toLocaleLowerCase()) > -1 ||
                    ponto.Descricao.toLocaleLowerCase().indexOf(pesquisa.toLocaleLowerCase()) > -1 ||
                    ponto.Localizacao.toLocaleLowerCase().indexOf(pesquisa.toLocaleLowerCase()) > -1
            })
            setPontosFiltrados(filtrados);
        }
        else {
            setPontosFiltrados(pontos);
        }
    }

    const paginar = (numeroPagina: number) => setPaginaAtual(numeroPagina);

    return (
        <div className="container-home">
            <header>
                <img src={logoImg} />
                <Link className="botao-link" to="Cadastrar">Novo Ponto Turístico</Link>
            </header>
            <div className="conteudo">
                <input className="input-busca" type="text" onChange={(e) => FiltraPontosTuristicos(e.target.value)} placeholder="Busque pontos turísticos por nome, descrição ou localização." />
                {
                    pontosFiltrados.length > 0
                        ?
                        pontosAtuais.map(ponto => {
                            return (
                                <ItemLista key={ponto.Id} item={ponto} eventoDeletar={ExcluirItem} />
                            )
                        })
                        :
                        <p style={{ marginTop: 100, alignSelf: 'center', fontSize: 16, fontWeight: 'bold' }}>Nenhum ponto turístico com as informações digitadas encontrado...</p>
                }
                <div className="container-paginacao">
                    <Paginacao
                        itensPorPagina={itensPorPagina}
                        totalItens={pontosFiltrados.length}
                        paginar={paginar}
                    />
                </div>
            </div>
        </div>
    );
}