using backend.Models;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Text.Json;
using System.Text.Unicode;

namespace backend
{
    public static class SqlHelper
    {
        static string connectionString = @"Data Source=DESKTOP-7JPLA67;Initial Catalog=TesteNewcon;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";


        public static void Executar(string procedure, params SqlParameter[] parametros)
        {
            using (SqlConnection conexao = new SqlConnection(connectionString))
            {
                using (SqlCommand comando = new SqlCommand(procedure, conexao))
                {
                    comando.CommandType = CommandType.StoredProcedure;
                    comando.Parameters.AddRange(parametros);

                    conexao.Open();
                    comando.ExecuteNonQuery();
                }
            }
        }

        public static string ExecutarReader(string procedure, bool resultadoUnico = false, params SqlParameter[] parametros)
        {
            using (SqlConnection conexao = new SqlConnection(connectionString))
            {
                conexao.Open();
                using (SqlCommand comando = new SqlCommand(procedure, conexao))
                {
                    comando.CommandType = CommandType.StoredProcedure;
                    comando.Parameters.AddRange(parametros);

                    using (SqlDataReader reader = comando.ExecuteReader())
                    {
                        IList<PontoTuristico> resultados = new List<PontoTuristico>();
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                                resultados.Add(new PontoTuristico(reader.GetFieldValue<int>("Id"), reader.GetFieldValue<string>("Nome"), reader.GetFieldValue<string>("Descricao"), reader.GetFieldValue<string>("Localizacao"), reader.GetFieldValue<DateTime>("DataCadastro")));
                        }

                        JsonSerializerOptions opcoes = new JsonSerializerOptions();
                        opcoes.Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping;
                        if (resultadoUnico)
                        {
                            string JsonString = JsonSerializer.Serialize(resultados.SingleOrDefault(), opcoes);
                            return JsonString;
                        }
                        else
                        {
                            string JsonString = JsonSerializer.Serialize(resultados, opcoes);
                            return JsonString;
                        }
                    }
                }
            }
        }
    }
}
