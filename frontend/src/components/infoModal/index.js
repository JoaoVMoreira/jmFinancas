import Modal from 'react-modal'
import { BsFillCircleFill } from "react-icons/bs";
import base from '../../axios/config';
import styles from './infos.module.scss'
import { IoMdArrowRoundBack } from "react-icons/io";

export default function InfoModal({conteudo, close, isOpen}){

    var teste = 'Yellow'
    if (conteudo.tipo === "Gasto") {
        teste = "red"
    } else if (conteudo.tipo === "Ganho") {
        teste = "green"
    }


    async function handleDelete(){
        try{
            const deleteTransacao = await base.delete('/transacao',{
                params:{
                    id: conteudo.id
                }
            })
            alert('Transação deletada')
            close()

        }catch(error){
            alert('Ocorreu um erro')
        }
    }

    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={close}
        overlayClassName={styles.overlay}
        className={styles.modal}>
            <div className={styles.conteiner}>
                <div className={styles.header}>
                    <h1><BsFillCircleFill color={teste}/>{conteudo.titulo}</h1>
                    <button onClick={close}><IoMdArrowRoundBack /></button>
                </div>
                <div className={styles.content}>
                    <div className={styles.leftContent}>
                        <span>{conteudo.tipo}</span>
                        <span>{conteudo.categoria}</span>
                        <span>{conteudo.valor}</span>
                        <button onClick={handleDelete}>Apagar movimentação</button>
                    </div>
                    <span className={styles.descricao}>{conteudo.descricao}</span>
                </div>
            </div>
        </Modal>
    )
}