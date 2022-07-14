using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PontoTuristicoController : ControllerBase
    {
        // GET: api/<PontoTuristicoController>
        [HttpGet]
        public string Get()
        {
            string resultado = SqlHelper.ExecutarReader("dbo.ListarPontos");
            return resultado;
        }

        // GET api/<PontoTuristicoController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            SqlParameter paramId = new SqlParameter("@Id", SqlDbType.Int);

            paramId.Value = id;

            string resultado = SqlHelper.ExecutarReader("dbo.BuscarPonto", true, paramId);
            return resultado;
        }

        // POST api/<PontoTuristicoController>
        [HttpPost]
        public void Post([FromBody]PontoTuristico objeto)
        {
            SqlParameter paramNome = new SqlParameter("@Nome", SqlDbType.VarChar);
            SqlParameter paramDescricao = new SqlParameter("@Descricao", SqlDbType.VarChar);
            SqlParameter paramLocalizacao = new SqlParameter("@Localizacao", SqlDbType.VarChar);
            SqlParameter paramDataCadastro = new SqlParameter("@DataCadastro", SqlDbType.DateTime);

            paramNome.Value = objeto.Nome;
            paramDescricao.Value = objeto.Descricao;
            paramLocalizacao.Value = objeto.Localizacao;
            paramDataCadastro.Value = DateTime.Now;

            SqlHelper.Executar("dbo.AdicionarPonto", paramNome, paramDescricao, paramLocalizacao, paramDataCadastro);
        }

        // PUT api/<PontoTuristicoController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] PontoTuristico objeto)
        {
            SqlParameter paramId = new SqlParameter("@Id", SqlDbType.Int);
            SqlParameter paramNome = new SqlParameter("@Nome", SqlDbType.VarChar);
            SqlParameter paramDescricao = new SqlParameter("@Descricao", SqlDbType.VarChar);
            SqlParameter paramLocalizacao = new SqlParameter("@Localizacao", SqlDbType.VarChar);

            paramId.Value = id;
            paramNome.Value = objeto.Nome;
            paramDescricao.Value = objeto.Descricao;
            paramLocalizacao.Value = objeto.Localizacao;

            SqlHelper.Executar("dbo.AlterarPonto", paramId, paramNome, paramDescricao, paramLocalizacao);
        }

        // DELETE api/<PontoTuristicoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            SqlParameter paramId = new SqlParameter("@Id", SqlDbType.Int);
            paramId.Value = id;

            SqlHelper.Executar("dbo.ExcluirPonto", paramId);
        }
    }
}
