import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useModal } from "./useModal";
import { useDispatch } from "react-redux";
import { getAllApartments } from "../redux/apartmentSlice";

const BASE_URL = import.meta.env.VITE_API_URL;

const initialFormData = {

  apartmentName : "",
  location : "",
  bedroom : 0,
  bathroom : 0,
  parking :false,
  rent : false,
  food : false,
  laundry : false,
  pictures : [],
  defaultSpecialDate : {
    price:0,
    startDate: "",
    endDate: ""
  },
  specialDates : [],
  description : "",
  more: []
};

const useAppartementsForm = () => {
  const dispatch = useDispatch();
  const {
    showModal,
    openModal,
    closeModal,
    openEditModal,
    closeEditModal,
    editModal,
    editApartment,
    setEditApartment,
    deleteAppModal,
    OpenDeleteAppModal,
    closeDeleteAppModal,
    oneAppartementData,
  } = useModal();
  const [formData, setFormData] = useState(initialFormData);
  const [inputRows, setInputRows] = useState([]);

  useEffect(() => {
    if (!showModal) {
      setFormData(initialFormData);
    }
  }, [showModal]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parent]: {
          ...prevFormData[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddRow = () => {
    setInputRows([...inputRows, { price: "", startDate: "", endDate: "" }]);
  };

  const handleSpecialDateInputChange = (index, event) => {
    const { name, value } = event.target;
    const newSpecialDate = [...formData.specialDates];
    newSpecialDate[index] = { ...newSpecialDate[index], [name]: value };
    setFormData((prevFormData) => ({
      ...prevFormData,
      specialDates: newSpecialDate,
    }));
  };

  const handleCounterChange = (type, value) => {
    const updatedValue = parseInt(formData[type]) + value;
    setFormData({ ...formData, [type]: updatedValue });
  };

  const handleImageChange = async (event) => {
    const selectedImages = event.target.files;
    const uploadedImages = [];

    for (let i = 0; i < selectedImages.length; i++) {
      const file = selectedImages[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cityflat");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dlspkc0so/image/upload",
          formData
        );

        if (!response) {
          throw new Error(`Failed to upload image: ${response.statusText}`);
        }

        uploadedImages.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const newPictures = uploadedImages.slice(0, 4);
    const moreImages = uploadedImages.slice(4);

    setFormData((prevFormData) => ({
      ...prevFormData,
      pictures: [...prevFormData.pictures, ...newPictures],
      more: [...prevFormData.more, ...moreImages],
    }));
  };

  const handleRemoveImage = (id) => {
    const updatedPictures = formData.pictures.filter(
      (image) => image.id !== id
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      pictures: updatedPictures,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${BASE_URL}/appartments/addapartment`, {
        apartmentName: formData.apartmentName,
        location: formData.location,
        bedroom: formData.bedroom,
        bathroom: formData.bathroom,
        parking: formData.parking,
        rent: formData.rent,
        food: formData.food,
        laundry: formData.laundry,
        pictures: formData.pictures,
        defaultSpecialDate: {
          price: formData.defaultSpecialDate.price,
          startDate: formData.defaultSpecialDate.startDate,
          endDate: formData.defaultSpecialDate.endDate,
        },
        specialDates: formData.specialDates,
        description: formData.description,
      });
      setFormData(initialFormData);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT FUNCTION

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEditApartment((prevEditApartment) => ({
        ...prevEditApartment,
        [parent]: {
          ...prevEditApartment[parent],
          [child]: value,
        },
      }));
    } else {
      setEditApartment((prevEditApartment) => ({
        ...prevEditApartment,
        [name]: value,
      }));
    }
  };

  const handleEditSpecialDateInputChange = (index, event) => {
    const { name, value } = event.target;
    setEditApartment((prevEditApartment) => {
      const newSpecialDate = prevEditApartment.specialDate.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: value };
        }
        return item;
      });
      return { ...prevEditApartment, specialDate: newSpecialDate };
    });
  };

  const handleEditAddRow = () => {
    setEditApartment((prevEditApartment) => ({
      ...prevEditApartment,
      specialDate: [
        ...prevEditApartment.specialDate,
        { price: "", startDate: "", endDate: "" },
      ],
    }));
  };

  const handleEditCounterChange = (type, value) => {
    setEditApartment((prevEditApartment) => {
      const updatedValue = parseInt(prevEditApartment[type]) + value;
      return { ...prevEditApartment, [type]: updatedValue };
    });
  };

  const handleEditServiceChange = (service) => {
    setEditApartment((prevEditApartment) => ({
      ...prevEditApartment,
      [service]: !prevEditApartment[service],
    }));
  };

  const handleEditImageChange = async (event) => {
    const selectedImages = event.target.files;
    const uploadedImages = [];

    for (let i = 0; i < selectedImages.length; i++) {
      const file = selectedImages[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cityflat");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dlspkc0so/image/upload",
          formData
        );

        if (!response) {
          throw new Error(`Failed to upload image: ${response.statusText}`);
        }

        uploadedImages.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const newPictures = uploadedImages.slice(0, 4);
    const moreImages = uploadedImages.slice(4);

    setEditApartment((prevEditApartment) => ({
      ...prevEditApartment,
      pictures: [...prevEditApartment.pictures, ...newPictures],
      more: [...prevEditApartment.more, ...moreImages],
    }));
  };

  const handleEditRemoveImage = (id) => {
    const updatedPictures = editApartment.pictures.filter(
      (image, index) => index !== id
    );
    setEditApartment((prevEditApartment) => ({
      ...prevEditApartment,
      pictures: updatedPictures,
    }));
  };

   const handleEditSubmit = async (e, id) => {
     e.preventDefault();
     try {
       await axios.put(`${BASE_URL}/appartments/edit/${id}`, editApartment);
       dispatch(getAllApartments());
       closeEditModal();
     } catch (error) {
       console.log(error);
       }
     console.log(editApartment)
   };

  return {
    handleEditSubmit,
    handleEditImageChange,
    handleEditRemoveImage,
    handleEditServiceChange,
    oneAppartementData,
    handleEditCounterChange,
    formData,
    showModal,
    closeModal,
    openModal,
    inputRows,
    setFormData,
    handleInputChange,
    handleAddRow,
    openEditModal,
    closeEditModal,
    editModal,
    handleSpecialDateInputChange,
    handleCounterChange,
    handleImageChange,
    handleEditAddRow,
    handleRemoveImage,
    handleSubmit,
    editApartment,
    handleEditInputChange,
    handleEditSpecialDateInputChange,
    deleteAppModal,
    OpenDeleteAppModal,
    closeDeleteAppModal,
  };
};

export default useAppartementsForm;
