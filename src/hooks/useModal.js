import { useState } from 'react'
export const useModal = () => {
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('error')
    const [msjModal, setMsjModal] = useState(null)
    const handleClose = () => setShowModal(false);
    /*
        Esta func recibe un str con el mensaje que se
        desea setear como mensaje de error en el modal
    */
    const handleError = (msj) => {
        setMsjModal(msj)
        setModalType('error')
        setShowModal(true)
    }
    /*
        Idem anterior, pero en este caso se usa
        para manejar una ejecucion exitosa
    */
    const handleSucces = (msj) =>{
        setMsjModal(msj)
        setModalType('ok')
        setShowModal(true)
    }
    return ({
        showModal,
        setShowModal,
        modalType,
        setModalType,
        msjModal,
        setMsjModal,
        handleClose,
        handleError,
        handleSucces
    })
}

