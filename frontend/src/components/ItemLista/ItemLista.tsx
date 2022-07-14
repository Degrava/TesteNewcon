import { Link, useNavigate } from 'react-router-dom';
import { FiTrash, FiEdit3 } from "react-icons/fi";
import './styles.css'
import { PontoTuristico } from '../../model/PontoTuristico';

type ItemListaProps = {
    item: PontoTuristico;
    eventoDeletar: (...args: any[]) => any;
}

export default function ItemLista(props: ItemListaProps) {
    return (
        <div className='container-item'>
            <div className='container-info'>
                <p className='item-nome'>{props.item.Nome}</p>
                <p className='item-descricao'>{props.item.Descricao}</p>
            </div>
            <div className='container-opcoes'>
                <Link className='botao-editar' to={"Detalhes/" + props.item.Id}>
                    <FiEdit3 size={25} />
                </Link>
                <Link className='botao-excluir' onClick={() => props.eventoDeletar(props.item.Id)} to={"/"}>
                    <FiTrash size={25} />
                </Link>
            </div>
        </div>
    );
}