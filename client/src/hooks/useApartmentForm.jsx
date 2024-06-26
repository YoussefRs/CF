import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useModal } from "./useModal";
import { useDispatch } from "react-redux";
import { getAllApartments } from "../redux/apartmentSlice";

const BASE_URL = import.meta.env.VITE_API_URL;

const initialFormData = {
  apartmentName: "",
  location: "",
  bedroom: 0,
  bathroom: 0,
  parking: false,
  rent: false,
  food: false,
  laundry: false,
  pictures: [],
  defaultSpecialDate: {
    price: 0,
    startDate: "",
    endDate: "",
  },
  specialDates: [],
  description: "",
  more: [],
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
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

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

  // const handleImageChange = async (event, setSubmitEnabled) => {
  //   const selectedImages = event.target.files;
  //   const uploadedImages = [];

  //   for (let i = 0; i < selectedImages.length; i++) {
  //     const file = selectedImages[i];
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", "cityflat");

  //     try {
  //       const response = await axios.post(
  //         "https://api.cloudinary.com/v1_1/dlspkc0so/image/upload",
  //         formData
  //       );

  //       if (!response) {
  //         throw new Error(`Failed to upload image: ${response.statusText}`);
  //       }

  //       uploadedImages.push(response.data.secure_url);
  //       // setSubmitEnabled(true);
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //     }
  //   }

  //   const newPictures = uploadedImages.slice(0, 4);
  //   const moreImages = uploadedImages.slice(4);

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     pictures: [...prevFormData.pictures, ...newPictures],
  //     more: [...prevFormData.more, ...moreImages],
  //   }));
  // };

  // const handleRemoveImage = (id) => {
  //   const updatedPictures = formData.pictures.filter(
  //     (image) => image.id !== id
  //   );
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     pictures: updatedPictures,
  //   }));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoadingAdd(true);
      // Upload images to Cloudinary
      const uploadedImages = await Promise.all(
        formData.pictures.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "cityflat");

          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dlspkc0so/image/upload",
            formData
          );

          if (!response.data.secure_url) {
            throw new Error("Failed to upload image");
          }

          return response.data.secure_url;
        })
      );

      // Submit form data with uploaded image URLs
      await axios.post(`${BASE_URL}/appartments/addapartment`, {
        apartmentName: formData.apartmentName,
        location: formData.location,
        bedroom: formData.bedroom,
        bathroom: formData.bathroom,
        parking: formData.parking,
        rent: formData.rent,
        food: formData.food,
        laundry: formData.laundry,
        pictures: uploadedImages, // Use uploaded image URLs
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
      console.error("Error uploading images or submitting form:", error);
    } finally {
      setLoadingAdd(false);
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
      const newSpecialDate = prevEditApartment.prices.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: value };
        }
        return item;
      });
      return { ...prevEditApartment, prices: newSpecialDate };
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
    const updatedPictures = editApartment.images.filter(
      (image, index) => index !== id
    );
    setEditApartment((prevEditApartment) => ({
      ...prevEditApartment,
      images: updatedPictures,
    }));
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();

    try {
      setLoadingEdit(true);

      // Filter out existing images and get only the new ones to upload
      const newImages = editApartment.images.filter((image) => !image.id);

      // Upload new images to Cloudinary
      const uploadedImages = await Promise.all(
        newImages.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image.file);
          formData.append("upload_preset", "cityflat");

          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dlspkc0so/image/upload",
            formData
          );

          if (!response.data.secure_url) {
            throw new Error("Failed to upload image");
          }

          return response.data.secure_url;
        })
      );

      // Update the editApartment state with the uploaded image URLs
      const updatedImages = newImages.map((image, index) => ({
        ...image,
        image_url: uploadedImages[index],
      }));

      // Update the editApartment state with only the newly uploaded images
      setEditApartment((prevEditApartment) => ({
        ...prevEditApartment,
        images: [
          ...prevEditApartment.images.filter((image) => image.id),
          ...updatedImages,
        ],
      }));

      // Submit form data with uploaded image URLs
      await axios.put(`${BASE_URL}/appartments/${id}`, {
        name: editApartment.name,
        location: editApartment.location,
        bedroom: editApartment.bedroom,
        bathroom: editApartment.bathroom,
        parking: editApartment.parking,
        rent: editApartment.rent,
        food: editApartment.food,
        laundry: editApartment.laundry,
        pictures: uploadedImages, // Use uploaded image URLs
        default_special_date: {
          price: editApartment.default_special_date.price,
          startDate: editApartment.default_special_date.startDate,
          endDate: editApartment.default_special_date.endDate,
        },
        specialDates: editApartment.specialDates,
        description: editApartment.description,
      });

      dispatch(getAllApartments());
      closeEditModal();
    } catch (error) {
      console.error("Error uploading images or submitting form:", error);
    } finally {
      setLoadingEdit(false);
    }
  };

  return {
    handleEditSubmit,
    handleEditImageChange,
    handleEditRemoveImage,
    handleEditServiceChange,
    oneAppartementData,
    handleEditCounterChange,
    loadingEdit,
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
    handleEditAddRow,
    handleSubmit,
    editApartment,
    setEditApartment,
    handleEditInputChange,
    handleEditSpecialDateInputChange,
    deleteAppModal,
    OpenDeleteAppModal,
    closeDeleteAppModal,
    loadingAdd,
  };
};

export default useAppartementsForm;
