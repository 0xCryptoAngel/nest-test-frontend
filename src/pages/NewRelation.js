import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASEURL;

ChartJS.register(ArcElement, Tooltip, Legend);

function NewRelation() {
  const navigate = useNavigate();

  // submit data to server
  const [code, setCode] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [externalId, setExternalId] = useState("");
  const [emailReminder, setEmailReminder] = useState("");
  const [emailInvoice, setEmailInvoice] = useState("");
  const [group, setGroup] = useState("");
  const [tag, setTag] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("Amsterdam, Netherlands");
  const [payment, setPayment] = useState("true");

  const [updatePage, setUpdatePage] = useState(true);

  const [mainInformationTab, setMainInformationTab] = useState(true);
  const [locationTab, setLocationTab] = useState(false);
  const [paymentInformationTab, setPaymentInformationTab] = useState(false);

  const handleCode = (e) => {
    setCode(e.target.value);
  };
  const handleReferenceCode = (e) => {
    setReferenceCode(e.target.value);
  };
  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
  };
  const handleExternalId = (e) => {
    setExternalId(e.target.value);
  };
  const handleEmailReminder = (e) => {
    setEmailReminder(e.target.value);
  };
  const handleEmailInvoice = (e) => {
    setEmailInvoice(e.target.value);
  };
  const handleGroup = (e) => {
    setGroup(e.target.value);
  };
  const handleTag = (e) => {
    setTag(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!emailRegex.test(newEmail)) {
      setErrorMessage("Please enter a valid email address.");
    } else {
      setErrorMessage("");
    }
  };
  const handleTelephone = (e) => {
    setTelephone(e.target.value);
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [errorMessage, setErrorMessage] = useState("");

  const addNewRelation = async () => {
    const payload = {
      code,
      referenceCode,
      companyName,
      country,
      externalId,
      emailReminder,
      emailInvoice,
      group,
      tag,
      name,
      title,
      email,
      telephone,
      mobile,
      location,
      payment,
    };

    const response = await fetch(`${baseUrl}/relation`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.log("Response is not okay");
      return;
    }

    const data = await response.json();
    console.log("Success", data);

    navigate("/", {
      state: {
        ...payload,
      },
    });
  };

  useEffect(() => {}, [updatePage]);

  const addNewRelationCancel = () => {
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
                        value={code}
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
                        value={referenceCode}
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
                        value={companyName}
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
                        value={country}
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
                        value={externalId}
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
                        value={emailReminder}
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
                        value={emailInvoice}
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
                        value={group}
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
                        value={tag}
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
                        value={name}
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
                        value={title}
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
                        value={email}
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
                        value={telephone}
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
                        value={mobile}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
                        placeholder="+31 "
                      />
                    </div>
                  </div>
                  <button
                    className="bg-secondColor hover:bg-blue-700 text-white font-bold text-lg mb-2 p-4 px-6 w-full rounded-md transition ease-in-out"
                    onClick={addNewRelation}
                  >
                    Add New Relation
                  </button>
                  <button
                    className="bg-tableBg20 hover:bg-gray-200 text-secondColor font-bold text-lg p-4 px-6 text-bold w-full rounded-md transition ease-in-out"
                    onClick={addNewRelationCancel}
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
                        value={location}
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

export default NewRelation;
