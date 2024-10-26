import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASEURL;

ChartJS.register(ArcElement, Tooltip, Legend);

function EditRelation() {
  const navigate = useNavigate();
  const id = useParams().id;

  const [relation, setRelation] = useState({});
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);
  const [mainInformationTab, setMainInformationTab] = useState(true);
  const [locationTab, setLocationTab] = useState(false);
  const [paymentInformationTab, setPaymentInformationTab] = useState(false);

  const fetchRelation = async () => {
    try {
      const response = await fetch(`${baseUrl}/relation/${id}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setRelation(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchRelation();
  }, [id]);

  const handleCode = (e) => {
    setRelation({
      ...relation,
      code: e.target.value,
    });
  };
  const handleReferenceCode = (e) => {
    setRelation({
      ...relation,
      referenceCode: e.target.value,
    });
  };
  const handleCompanyName = (e) => {
    setRelation({
      ...relation,
      companyName: e.target.value,
    });
  };
  const handleCountry = (e) => {
    setRelation({
      ...relation,
      country: e.target.value,
    });
  };
  const handleExternalId = (e) => {
    setRelation({
      ...relation,
      externalId: e.target.value,
    });
  };
  const handleEmailReminder = (e) => {
    setRelation({
      ...relation,
      emailReminder: e.target.value,
    });
  };
  const handleEmailInvoice = (e) => {
    setRelation({
      ...relation,
      emailInvoice: e.target.value,
    });
  };
  const handleGroup = (e) => {
    setRelation({
      ...relation,
      group: e.target.value,
    });
  };
  const handleTag = (e) => {
    setRelation({
      ...relation,
      tag: e.target.value,
    });
  };
  const handleName = (e) => {
    setRelation({
      ...relation,
      name: e.target.value,
    });
  };
  const handleTitle = (e) => {
    setRelation({
      ...relation,
      title: e.target.value,
    });
  };
  const handleEmail = (e) => {
    setRelation({
      ...relation,
      email: e.target.value,
    });
  };
  const handleTelephone = (e) => {
    setRelation({
      ...relation,
      telephone: e.target.value,
    });
  };
  const handleMobile = (e) => {
    setRelation({
      ...relation,
      mobile: e.target.value,
    });
  };
  const handleLocation = (e) => {
    setRelation({
      ...relation,
      location: e.target.value,
    });
  };

  const updateRelation = async () => {
    const response = await fetch(`${baseUrl}/relation/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(relation),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    navigate(`/`);
  };

  useEffect(() => {}, [updatePage]);

  const UpdateRelationCancel = () => {
    navigate("/");
  };

  const handleMainInformationTab = () => {
    setMainInformationTab(true);
    setLocationTab(false);
    setPaymentInformationTab(false);
  };

  const handleLocationTab = () => {
    setMainInformationTab(false);
    setLocationTab(true);
    setPaymentInformationTab(false);
  };

  const handlePaymentInformationTab = () => {
    setMainInformationTab(false);
    setLocationTab(false);
    setPaymentInformationTab(true);
  };

  return (
    <>
      {/* Table  */}
      <div className="col-span-12 lg:col-span-10  flex justify-center px-4 rounded-3xl bg-gray-100">
        <div className=" flex flex-col gap-5 w-full">
          <div className="overflow-x-auto rounded-3xl border border-gray-200 ">
            {/* users table */}
            <div className="flex justify-between pt-12 pb-4 px-4 md:px-12">
              <div className="flex gap-4 justify-center items-center ">
                <span className="font-bold text-headerColor text-2xl">
                  New Relation
                </span>
              </div>
            </div>
            {/* form */}
            <div className="grid grid-cols-6 md:grid-cols-7 py-4 mx-4 md:mx-12 rounded-lg gap-10">
              <div className="col-span-6 md:col-span-1 flex flex-col justify-start items-start">
                <button
                  className="px-4 py-4 text-start font-bold border-gray-100 hover:bg-buttonBg hover:border-secondColor border-l-4 w-full  transition ease-in-out duration-300 hover:text-white"
                  onClick={handleMainInformationTab}
                >
                  Main Information
                </button>
                <button
                  className="px-4 py-4 text-start font-bold border-gray-100 hover:bg-buttonBg hover:border-secondColor border-l-4 w-full  transition ease-in-out duration-300 hover:text-white"
                  onClick={handleLocationTab}
                >
                  Location
                </button>
                <button
                  className="px-4 py-4 text-start font-bold border-gray-100 hover:bg-buttonBg hover:border-secondColor border-l-4 w-full  transition ease-in-out duration-300 hover:text-white"
                  onClick={handlePaymentInformationTab}
                >
                  Payment Information
                </button>
              </div>
              {mainInformationTab == true ? (
                <div className="col-span-6">
                  {/* first box */}
                  <div className="bg-white p-5 rounded-lg mb-4 grid grid-cols-2 gap-10">
                    <div>
                      <label
                        for="code"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Code <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="code"
                        onChange={handleCode}
                        value={relation.code}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="Please input"
                      />
                    </div>
                    <div>
                      <label
                        for="referenceCode"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Reference Code
                      </label>
                      <input
                        type="text"
                        id="referenceCode"
                        onChange={handleReferenceCode}
                        value={relation.referenceCode}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="Please input"
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        for="companyName"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Company Name <span className="text-red-700">*</span>
                      </label>
                      <select
                        id="companyName"
                        onChange={handleCompanyName}
                        value={relation.companyName}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                      >
                        <option selected>Select company name</option>
                        <option value="provenant">Provenant</option>
                        <option value="apple">Apple</option>
                        <option value="google">Google</option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="country"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        country
                      </label>
                      <input
                        type="text"
                        id="country"
                        onChange={handleCountry}
                        value={relation.country}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="Please input"
                      />
                    </div>
                    <div>
                      <label
                        for="externalId"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        External ID
                      </label>
                      <input
                        type="text"
                        id="externalId"
                        onChange={handleExternalId}
                        value={relation.externalId}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="Please input"
                      />
                    </div>
                    <div>
                      <label
                        for="emailReminder"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email (Reminders)
                      </label>
                      <input
                        type="text"
                        id="emailReminder"
                        onChange={handleEmailReminder}
                        value={relation.emailReminder}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="Please input"
                      />
                    </div>
                    <div>
                      <label
                        for="emailInvoice"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email (Invoices)
                      </label>
                      <input
                        type="text"
                        id="emailInvoice"
                        onChange={handleEmailInvoice}
                        value={relation.emailInvoice}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="Please input"
                      />
                    </div>
                    <div>
                      <label
                        for="group"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Group
                      </label>
                      <select
                        id="group"
                        onChange={handleGroup}
                        value={relation.group}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                      >
                        <option selected>Group</option>
                        <option value="group1">Group 1</option>
                        <option value="group2">Group 2</option>
                        <option value="group3">Group 3</option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="tag"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tags
                      </label>
                      <select
                        id="tag"
                        onChange={handleTag}
                        value={relation.tag}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                      >
                        <option selected>Please Select</option>
                        <option value="tag1">tag1</option>
                        <option value="tag2">tag2</option>
                        <option value="tag3">tag3</option>
                      </select>
                    </div>
                  </div>
                  {/* second box */}
                  <div className="bg-white p-5 rounded-lg mb-4 grid grid-cols-2 gap-10">
                    <div className="col-span-2 flex justify-start">
                      <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                        <input
                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
                        />
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor="inlineRadio1"
                        >
                          Create New Contract
                        </label>
                      </div>
                      <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                        <input
                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="option2"
                        />
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor="inlineRadio2"
                        >
                          Select From Existing
                        </label>
                      </div>
                    </div>
                    <div className="">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={handleName}
                        value={relation.name}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="Please input"
                      />
                    </div>
                    <div>
                      <label
                        for="title"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        onChange={handleTitle}
                        value={relation.title}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="Please input"
                      />
                    </div>
                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        onChange={handleEmail}
                        value={relation.email}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="Please input"
                      />
                    </div>
                    <div>
                      <label
                        for="telephone"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Telephone
                      </label>
                      <input
                        type="text"
                        id="telephone"
                        onChange={handleTelephone}
                        value={relation.telephone}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="+31 "
                      />
                    </div>
                    <div>
                      <label
                        for="mobile"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mobile
                      </label>
                      <input
                        type="text"
                        id="mobile"
                        onChange={handleMobile}
                        value={relation.mobile}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="+31 "
                      />
                    </div>
                  </div>
                  <button
                    className="bg-secondColor hover:bg-blue-700 text-white font-bold text-lg mb-2 p-4 px-6 w-full rounded-md transition ease-in-out"
                    onClick={updateRelation}
                  >
                    Update Relation
                  </button>
                  <button
                    className="bg-tableBg20 hover:bg-gray-200 text-secondColor font-bold text-lg p-4 px-6 text-bold w-full rounded-md transition ease-in-out"
                    onClick={UpdateRelationCancel}
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
              {locationTab == true ? (
                <div className="col-span-6">
                  {/* first box */}
                  <div className="bg-white p-5 rounded-lg mb-4 grid grid-cols-2 gap-10">
                    <div>
                      <label
                        for="location"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        onChange={handleLocation}
                        value={relation.location}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="Please input"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditRelation;
