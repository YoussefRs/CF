import { useState } from "react";

// Custom hook for managing modal state
export const useModal = () => {
  
  const [oneAppartementData, setOneAppartmentData] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editApartment, setEditApartment] = useState(null);
  const [deleteAppModal, setDeleteAppModal] = useState(false)

  const openEditModal = (apartment) => {
    setEditModal(true);
    setEditApartment(apartment); 
    console.log(apartment)
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal2 = () => {
    setShowModal2(true);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };

  const OpenDeleteAppModal = (appartement) => {
    setOneAppartmentData(appartement)
    setDeleteAppModal(true)
  }
  const closeDeleteAppModal = () => {
    setDeleteAppModal(false)
  }
  
  return {
    oneAppartementData,
    showModal,
    openModal,
    closeModal,
    showModal2,
    openModal2,
    closeModal2,
    editModal,
    openEditModal,
    closeEditModal,
    editApartment,
    setEditApartment,
    OpenDeleteAppModal,
    deleteAppModal,
    closeDeleteAppModal
  };
};
