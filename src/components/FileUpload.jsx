import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ReactLoading from "react-loading";

function FileUpload() {
  const [formData, setFormData] = useState({
    name: "",
    tags: "",
    image: null,
    email: "hitendrasisodia18@gmail.com",
  });
  const [selectedOption, setSelectedOption] = useState("Image Upload");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false); // State to track URL copying

  function changeHandler(event) {
    if (event.target.name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { name, tags, image, email } = formData;

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("tags", tags);
    formdata.append("email", email);
    formdata.append("image", image);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    try {
      let response = await axios.post(
        "http://localhost:4000/api/v1/imageUpload",
        formdata,
        config
      );
      if (response.status === 200) {
        toast.success("Added Successfully");
        setImageUrl(response.data.imageUrl);
        setIsCopied(false);
      } else if (response.status === 401) {
        toast.error(response.message);
      } else {
        toast.error("Error");
      }
    } catch (e) {
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = imageUrl;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setIsCopied(true);
  };

  return (
    <div className="app-container">
      {loading ? (
        <div className="loading-screen">
          <ReactLoading type="spin" height={45} width={45} />
        </div>
      ) : imageUrl ? (
<div className="desktop-image-url">
  <p className="text-[1.875rem] text-richblack-5 mb-1 leading-[1.375rem] pb-4">Image URL:</p>
  <div className="image-url-container">
    <p className="text-richblack-3 overflow-ellipsis  m-2 rounded-lg  bg-richblack-800 p-5">
      {imageUrl}
    </p>
    <button
      className={` py-2 px-4 pb-3 rounded-md font-medium ml-2 hover:scale-105 transition-transform mt-4 ${
        isCopied ? "bg-green-500" : "bg-yellow-500 "
      }`}
      onClick={copyToClipboard}
    >
      {isCopied ? "Copied!" : "Copy to Clipboard"}
    </button>
  </div>
</div>

      ) : (
        <form
          onSubmit={submitHandler}
          className="flex flex-col w-full gap-4"
          action="http://localhost:4000/api/v1/imageUpload"
          method="POST"
          encType="multipart/form-data"
        >
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Select an Upload Option<sup className="text-pink-200">*</sup>
            </p>
            <div className="relative hover:scale-105 transition-transform">
              <select
                name="uploadOption"
                onChange={(e) => setSelectedOption(e.target.value)}
                value={selectedOption}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[10px] pt-1 cursor opacity-75"
              >
                <option value="Image Upload opacity-75">Image Upload</option>
                <option value="Video Upload opacity-75">Video Upload</option>
                <option value="Image Size Reduce Upload opacity-75">Image Size Reduce Upload</option>
              </select>
            </div>
          </label>
          {selectedOption === "Image Upload" && (
            <label className="w-full">
              <p className="text-sm text-richblack-5 mb-1 leading-[1.375rem]">
                Image Upload<sup className="text-pink-200">*</sup>
              </p>
              <div className="relative bg-richblack-800 rounded-[0.5rem] w-full h-[2.5rem] flex items-center justify-center cursor-pointer p-7 hover:scale-105 transition-transform text-richblack-5  ">
                <span className="text-richblack-5 opacity-75">Upload an Image</span>
                <input
                  type="file"
                  required
                  name="image"
                  onChange={changeHandler}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
              </div>
            </label>
          )}
          {selectedOption === "Video Upload" && (
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Video Upload<sup className="text-pink-200">*</sup>
              </p>
              <input
                type="file"
                required
                name="email"
                onChange={changeHandler}
                placeholder="Upload a Video"
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] hover:scale-105 transition-transform"
              />
            </label>
          )}
          {selectedOption === "Image Size Reduce Upload" && (
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Image Size Reduce Upload<sup className="text-pink-200">*</sup>
              </p>
              <input
                type="file"
                required
                name="email"
                onChange={changeHandler}
                placeholder="Upload an Image for Size Reduction"
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] hover:scale-105 transition-transform"
              />
            </label>
          )}
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              name="name"
              onChange={changeHandler}
              placeholder="Enter Name of Image"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] hover:scale-105 transition-transform"
            />
          </label>
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Tags<sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              name="tags"
              onChange={changeHandler}
              placeholder="Enter Tag for the Images"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] hover:scale-105 transition-transform"
            />
          </label>
          <button className="bg-yellow-500 py-2 rounded-md font-medium mt-4 hover:scale-105 transition-transform mb-10 pb-3">
            Generate Sharable Link
          </button>
        </form>
      )}
    </div>
  );
}

export default FileUpload;
