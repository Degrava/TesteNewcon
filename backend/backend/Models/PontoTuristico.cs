﻿using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class PontoTuristico
    {
        public PontoTuristico(long id, string nome, string descricao, string localizacao, DateTime dataCadastro)
        {
            Id = id;
            Nome = nome;
            Descricao = descricao;
            Localizacao = localizacao;
            DataCadastro = dataCadastro;
        }

        public long Id { get; set; }
        public string? Nome { get; set; }
        public string? Descricao { get; set; }
        public string? Localizacao { get; set; }
        public DateTime DataCadastro { get; set; }
    }
}
