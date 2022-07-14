import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

type PontoTuristico = {
    Id: number;
    Nome: string;
    Descricao: string;
    Localizacao: string;
    DataCadastro: Date;
}

export default function Cadastro() {

    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [uf, setUf] = useState<string>("");
    const [referencia, setReferencia] = useState<string>("");

    const listaUf: string[] = ['', 'RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF'];
    const isEmptyString = (data: string): boolean => typeof data === "string" && data.trim().length == 0;

    const navegacao = useNavigate();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let localizacao: string = "";
        if (!isEmptyString(uf) && !isEmptyString(cidade))
            localizacao = cidade + "/" + uf;
        else if (!isEmptyString(referencia))
            localizacao = referencia;
        else
            alert("Informe uma Cidade/UF ou uma referência.");

        const novoPonto: PontoTuristico = { Id: 0, Nome: nome, Descricao: descricao, Localizacao: localizacao, DataCadastro: new Date() };
        console.log(novoPonto);
        axios.post("https://localhost:7291/api/PontoTuristico", novoPonto)
            .catch(() => {
                alert("Ocorreu um erro, tente novamente!");
            });

        navegacao("/");
    }

    return (
        <div className="container-cadastro">
            <div className="conteudo">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome do Ponto Turístico"
                        required={true}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <div className="grupo-input">
                        <select
                            style={{ width: 85 }}
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                        >
                            {
                                listaUf.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })
                            }
                        </select>
                        <input
                            type="text"
                            placeholder="Cidade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Referência"
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        required={true}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button className="botao" type="submit">Finalizar</button>
                        <Link style={{ width: 180 }} to={"/"}>
                            <button className="botao-cancelar" type="button">Cancelar</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}