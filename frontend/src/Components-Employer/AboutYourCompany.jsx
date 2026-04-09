// import React, { useState, useEffect } from "react";
// import { Footer } from "../Components-LandingPage/Footer";
// import { EHeader } from "./EHeader";
// import "./AboutYourCompany.css";
// import fileIcon from "../assets/Employer/fileIcon.png"
// import { useNavigate } from "react-router-dom";
// import { useJobs } from "../JobContext";
// import api from "../api/axios";

// export const AboutYourCompany = ({ hideNavigation = false, setActiveTab }) => {

//     const navigate = useNavigate();
//     const { setCompanyProfile } = useJobs();
//     const [isLoading, setIsLoading] = useState(false);
//     const [backendError, setBackendError] = useState("");
//     const [isFetching, setIsFetching] = useState(true);
//     const [existingLogo, setExistingLogo] = useState(null);

//     const [formData, setFormData] = useState({
//         companyName: "",
//         companyMoto: "",
//         contactPerson: "",
//         contactNumber: "",
//         companyMail: "",
//         website: "",
//         companySize: "",
//         address1: "",
//         address2: "",
//         about: "",
//         companyLogo: null
//     });

//     const [errors, setErrors] = useState({});

//     // ✅ Fetch existing company profile on component mount
//     useEffect(() => {
//         const fetchCompanyProfile = async () => {
//             try {
//                 setIsFetching(true);
//                 const response = await api.get("/company/profile/");
//                 const profile = response.data;
                
//                 console.log("✅ Fetched company profile:", profile);
                
//                 setFormData({
//                     companyName: profile.company_name || "",
//                     companyMoto: profile.company_moto || "",
//                     contactPerson: profile.contact_person || "",
//                     contactNumber: profile.contact_number || "",
//                     companyMail: profile.company_email || "",
//                     website: profile.website || "",
//                     companySize: profile.company_size || "",
//                     address1: profile.address1 || "",
//                     address2: profile.address2 || "",
//                     about: profile.about || "",
//                     companyLogo: null
//                 });
                
//                 setExistingLogo(profile.company_logo);
                
//             } catch (err) {
//                 console.error("Error fetching company profile:", err);
//                 if (err.response?.status === 404) {
//                     console.log("No existing company profile found, will create new");
//                 }
//             } finally {
//                 setIsFetching(false);
//             }
//         };
        
//         fetchCompanyProfile();
//     }, []);

//     const validateForm = () => {
//         const newErrors = {};

//         if (!formData.companyName?.trim()) newErrors.companyName = "Company Name is required";
//         if (!formData.companyMoto?.trim()) newErrors.companyMoto = "Company Moto is required";
//         if (!formData.contactPerson?.trim()) newErrors.contactPerson = "Contact Person is required";
        
//         if (!formData.contactNumber?.trim()) {
//             newErrors.contactNumber = "Contact Number is required";
//         } else if (!/^[6-9]\d{9}$/.test(formData.contactNumber)) {
//             newErrors.contactNumber = "Enter valid 10-digit mobile number";
//         }
        
//         if (!formData.companyMail?.trim()) {
//             newErrors.companyMail = "Company Mail Id is required";
//         } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.companyMail)) {
//             newErrors.companyMail = "Enter valid email address";
//         }
        
//         if (!formData.website?.trim()) {
//             newErrors.website = "Company Website is required";
//         } else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.website)) {
//             newErrors.website = "Enter valid website URL (e.g., https://example.com)";
//         }
        
//         if (!formData.companySize?.trim()) newErrors.companySize = "Company Size is required";
//         if (!formData.address1?.trim()) newErrors.address1 = "Company Address is required";
//         if (!formData.about?.trim()) newErrors.about = "About Company is required";
        
//         // Logo validation - only required if no existing logo and no new file
//         if (!formData.companyLogo && !existingLogo) {
//             newErrors.companyLogo = "Company Logo is required";
//         }

//         setErrors(newErrors);
       
//         console.log("Validation Errors detected: ", newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
       
//         setErrors(prev => ({ ...prev, [name]: "" }));
//         setBackendError("");

//         if (files) {
//             const file = files[0];

//             const allowedTypes = [
//                 "image/png",
//                 "image/jpeg",
//                 "image/jpg",
//                 "image/webp"
//             ];

//             const maxSize = 5 * 1024 * 1024;

//             if (!allowedTypes.includes(file.type)) {
//                 setErrors(prev => ({ ...prev, companyLogo: "Only image files (PNG, JPG, JPEG, WEBP) are allowed!" }));
//                 return;
//             }

//             if (file.size > maxSize) {
//                 setErrors(prev => ({ ...prev, companyLogo: "File size should be less than 5MB" }));
//                 return;
//             }

//             setFormData({
//                 ...formData,
//                 [name]: file
//             });

//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: value
//             });
//         }
//     };

//     const submitToBackend = async (data) => {
//         setIsLoading(true);
//         setBackendError("");
        
//         try {
//             const formDataToSend = new FormData();
//             formDataToSend.append('company_name', data.companyName);
//             formDataToSend.append('company_moto', data.companyMoto);
//             formDataToSend.append('contact_person', data.contactPerson);
//             formDataToSend.append('contact_number', data.contactNumber);
//             formDataToSend.append('company_email', data.companyMail);
//             formDataToSend.append('website', data.website);
//             formDataToSend.append('company_size', data.companySize);
//             formDataToSend.append('address1', data.address1);
//             if (data.address2) {
//                 formDataToSend.append('address2', data.address2);
//             }
//             formDataToSend.append('about', data.about);
            
//             if (data.companyLogo) {
//                 formDataToSend.append('company_logo', data.companyLogo);
//             }
            
//             let response;
            
//             if (existingLogo) {
//                 response = await api.patch("/company/profile/update/", formDataToSend, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 console.log("✅ Company profile updated:", response.data);
//             } else {
//                 response = await api.post("/company/profile/create/", formDataToSend, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 console.log("✅ Company profile created:", response.data);
//             }
            
//             if (response.status === 200 || response.status === 201) {
//                 return { success: true, data: response.data };
//             } else {
//                 return { success: false, error: "Failed to save company profile" };
//             }
            
//         } catch (err) {
//             console.error("API Error:", err);
            
//             if (err.response?.data) {
//                 const backendErrors = err.response.data;
//                 const newErrors = {};
                
//                 if (backendErrors.company_name) newErrors.companyName = backendErrors.company_name[0];
//                 if (backendErrors.company_moto) newErrors.companyMoto = backendErrors.company_moto[0];
//                 if (backendErrors.contact_person) newErrors.contactPerson = backendErrors.contact_person[0];
//                 if (backendErrors.contact_number) newErrors.contactNumber = backendErrors.contact_number[0];
//                 if (backendErrors.company_email) newErrors.companyMail = backendErrors.company_email[0];
//                 if (backendErrors.website) newErrors.website = backendErrors.website[0];
//                 if (backendErrors.company_size) newErrors.companySize = backendErrors.company_size[0];
//                 if (backendErrors.address1) newErrors.address1 = backendErrors.address1[0];
//                 if (backendErrors.about) newErrors.about = backendErrors.about[0];
//                 if (backendErrors.company_logo) newErrors.companyLogo = backendErrors.company_logo[0];
                
//                 setErrors(newErrors);
//                 return { success: false, error: "Validation failed" };
//             } else {
//                 return { success: false, error: err.message || "Network error" };
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // ✅ Next button - Save and go to verification page
//     const handleNext = async (e) => {
//         e.preventDefault();

//         const isValid = validateForm();
//         if (!isValid) {
//             console.log("Form has errors. Stopping navigation.");
//             return;
//         }

//         console.log("Form Data Ready for Backend:", formData);
        
//         const result = await submitToBackend(formData);
        
//         if (result.success) {
//             setCompanyProfile(formData);
//             navigate('/Job-portal/Employer/about-your-company/company-verification');
//         } else if (result.error === "Validation failed") {
//             console.log("Validation errors from backend");
//         } else {
//             setBackendError(result.error || "Failed to save company profile. Please try again.");
//         }
//     };

//     // ✅ Save button (from Dashboard My Profile) - Save and stay in Dashboard
//     const handleSave = async (e) => {
//         e.preventDefault();

//         const isValid = validateForm();
//         if (!isValid) {
//             console.log("Form has errors. Stopping to save.");
//             return;
//         }

//         console.log("Saving Company Profile:", formData);
        
//         const result = await submitToBackend(formData);
        
//         if (result.success) {
//             setCompanyProfile(formData);
//             setActiveTab("Dashboard");
//         } else if (result.error === "Validation failed") {
//             console.log("Validation errors from backend");
//         } else {
//             setBackendError(result.error || "Failed to save company profile. Please try again.");
//         }
//     };

//     // Show loading while fetching
//     if (isFetching) {
//         return (
//             <>
//                 {!hideNavigation && <EHeader />}
//                 <div className="aboutcompany-container">
//                     <h2 className="aboutcompany-title">About Your Company</h2>
//                     <div style={{ textAlign: "center", padding: "50px" }}>
//                         Loading company profile...
//                     </div>
//                 </div>
//                 {!hideNavigation && <Footer />}
//             </>
//         );
//     }

//     return (
//         <>
//             {!hideNavigation && <EHeader />}
 
//             <div className="aboutcompany-container">
//                 <h2 className="aboutcompany-title">About Your Company</h2>
 
//                 {backendError && (
//                     <div className="backend-error-message" style={{
//                         backgroundColor: '#ffebee',
//                         color: '#d32f2f',
//                         padding: '10px',
//                         borderRadius: '5px',
//                         marginBottom: '20px',
//                         textAlign: 'center'
//                     }}>
//                         {backendError}
//                     </div>
//                 )}
 
//                 <form className="aboutcompany-form">
 
//                     <div className="aboutcompany-form-group">
//                         <label>Company Name</label>
//                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                             <input
//                                 className={errors.companyName ? "input-error" : ""}
//                                 type="text"
//                                 name="companyName"
//                                 placeholder="e.g., job portal"
//                                 value={formData.companyName}
//                                 onChange={handleChange}
//                                 disabled={isLoading}
//                             />
//                             {errors.companyName && <span className="error-msg">{errors.companyName}</span>}
//                         </div>
//                     </div>
 
//                     <div className="aboutcompany-form-group">
//                         <label>Company Moto</label>
//                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                             <input
//                                 className={errors.companyMoto ? "input-error" : ""}
//                                 type="text"
//                                 name="companyMoto"
//                                 value={formData.companyMoto}
//                                 onChange={handleChange}
//                                 disabled={isLoading}
//                             />
//                             {errors.companyMoto && <span className="error-msg">{errors.companyMoto}</span>}
//                         </div>
//                     </div>
 
//                     <div className="aboutcompany-form-group">
//                         <label>Contact Person</label>
//                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                             <input
//                                 className={errors.contactPerson ? "input-error" : ""}
//                                 type="text"
//                                 name="contactPerson"
//                                 placeholder="e.g., vijay"
//                                 value={formData.contactPerson}
//                                 onChange={handleChange}
//                                 disabled={isLoading}
//                             />
//                             {errors.contactPerson && <span className="error-msg">{errors.contactPerson}</span>}
//                         </div>
//                     </div>
 
//                     <div className="aboutcompany-form-group">
//                         <label>Contact Number</label>
//                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                             <input
//                                 className={errors.contactNumber ? "input-error" : ""}
//                                 type="tel"
//                                 name="contactNumber"
//                                 placeholder="e.g., 9876543210"
//                                 value={formData.contactNumber}
//                                 onChange={handleChange}
//                                 disabled={isLoading}
//                             />
//                             {errors.contactNumber && <span className="error-msg">{errors.contactNumber}</span>}
//                         </div>
//                     </div>
 
//                     <div className="aboutcompany-form-group">
//                         <label>Company Mail Id</label>
//                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                             <input
//                                 className={errors.companyMail ? "input-error" : ""}
//                                 type="email"
//                                 name="companyMail"
//                                 placeholder="e.g., hr@example.com"
//                                 value={formData.companyMail}
//                                 onChange={handleChange}
//                                 disabled={isLoading}
//                             />
//                             {errors.companyMail && <span className="error-msg">{errors.companyMail}</span>}
//                         </div>
//                     </div>
 
//                     <div className="aboutcompany-form-group">
//                         <label>Company Web Site</label>
//                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                             <input
//                                 className={errors.website ? "input-error" : ""}
//                                 type="text"
//                                 name="website"
//                                 placeholder="e.g., https://example.com"
//                                 value={formData.website}
//                                 onChange={handleChange}
//                                 disabled={isLoading}
//                             />
//                             {errors.website && <span className="error-msg">{errors.website}</span>}
//                         </div>
//                     </div>
 
//                     <div className="aboutcompany-form-group">
//                         <label>Company Logo</label>
//                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                             <div className={`aboutcompany-file-upload-box ${errors.companyLogo ? "input-error" : ""}`} style={errors.companyLogo ? { borderColor: '#d93025' } : {}}>
 
//                                 <input
//                                     type="file"
//                                     name="companyLogo"
//                                     accept="image/png, image/jpeg, image/jpg, image/webp"
//                                     id="logoUpload"
//                                     onChange={handleChange}
//                                     hidden
//                                     disabled={isLoading}
//                                 />
 
//                                 {/* Show existing logo if no new file selected */}
//                                 {!formData.companyLogo && existingLogo && (
//                                     <div style={{ padding: "15px", textAlign: "center" }}>
//                                         <img 
//                                             src={existingLogo} 
//                                             alt="Current Logo" 
//                                             style={{ maxWidth: "100px", maxHeight: "100px", marginBottom: "10px", borderRadius: "8px" }}
//                                         />
//                                         <p style={{ margin: "5px 0", fontSize: "12px", color: "#666" }}>Current Logo</p>
//                                         <label htmlFor="logoUpload" style={{ cursor: "pointer", color: "#007bff", fontSize: "12px" }}>
//                                             Click to change
//                                         </label>
//                                     </div>
//                                 )}
 
//                                 {!formData.companyLogo && !existingLogo && (
//                                     <label htmlFor="logoUpload" className="aboutcompany-upload-placeholder">
//                                         Click to Upload Logo
//                                     </label>
//                                 )}
 
//                                 {formData.companyLogo && (
//                                     <div className="aboutcompany-file-preview">
//                                         <label htmlFor="logoUpload" className="aboutcompany-file-left clickable-area">
//                                             <img src={fileIcon} alt="file" />
//                                             <div>
//                                                 <p>{formData.companyLogo.name}</p>
//                                                 <span>
//                                                     {(formData.companyLogo.size / 1024 / 1024).toFixed(2)} MB
//                                                 </span>
//                                             </div>
//                                         </label>
//                                     </div>
//                                 )}
//                             </div>
//                             {errors.companyLogo && <span className="error-msg">{errors.companyLogo}</span>}
//                         </div>
//                     </div>
 
//                     <div className="aboutcompany-form-group">
//                         <label>Company Size</label>
//                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                             <input
//                                 className={errors.companySize ? "input-error" : ""}
//                                 type="text"
//                                 name="companySize"
//                                 placeholder="e.g., 100-500 employees"
//                                 value={formData.companySize}
//                                 onChange={handleChange}
//                                 disabled={isLoading}
//                             />
//                             {errors.companySize && <span className="error-msg">{errors.companySize}</span>}
//                         </div>
//                     </div>
 
//                     <div className="aboutcompany-form-group">
//                         <label>Company Address</label>
//                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                             <input
//                                 className={errors.address1 ? "input-error" : ""}
//                                 type="text"
//                                 name="address1"
//                                 placeholder="e.g., Hyderabad, India"
//                                 value={formData.address1}
//                                 onChange={handleChange}
//                                 disabled={isLoading}
//                             />
//                             {errors.address1 && <span className="error-msg">{errors.address1}</span>}
//                         </div>
//                     </div>
 
//                     <div className="aboutcompany-form-group">
//                         <label>Company Address 2 (Optional)</label>
//                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                             <input
//                                 type="text"
//                                 name="address2"
//                                 placeholder="e.g., Floor 3, Building A"
//                                 value={formData.address2}
//                                 onChange={handleChange}
//                                 disabled={isLoading}
//                             />
//                         </div>
//                     </div>
 
//                     <div className="aboutcompany-form-group">
//                         <label>About Company</label>
//                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                             <textarea
//                                 className={errors.about ? "input-error" : ""}
//                                 rows="5"
//                                 name="about"
//                                 value={formData.about}
//                                 onChange={handleChange}
//                                 disabled={isLoading}
//                             />
//                             {errors.about && <span className="error-msg">{errors.about}</span>}
//                         </div>
//                     </div>
 
//                     {!hideNavigation && (
//                         <div className="aboutcompany-form-buttons">
//                             <button 
//                                 type="button" 
//                                 className="aboutcompany-back-btn"
//                                 onClick={() => navigate(-1)}
//                                 disabled={isLoading}
//                             >
//                                 Back
//                             </button>
//                             <button 
//                                 type="button" 
//                                 className="aboutcompany-next-btn"
//                                 onClick={handleNext}
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? "Saving..." : "Next"}
//                             </button>
//                         </div>
//                     )}
 
//                     {hideNavigation && (
//                         <div>
//                             <button 
//                                 type="button" 
//                                 className="aboutcompany-save-btn"
//                                 onClick={handleSave}
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? "Saving..." : "Save"}
//                             </button>
//                         </div>
//                     )}
 
//                 </form>
//             </div>
 
//             {!hideNavigation && <Footer />}
//         </>
//     );
// };  





// import React, { useState, useEffect } from "react";
// import { Footer } from "../Components-LandingPage/Footer";
// import { EHeader } from "./EHeader";
// import "./AboutYourCompany.css";
// import fileIcon from "../assets/Employer/fileIcon.png";
// import { useNavigate } from "react-router-dom";
// import { useJobs } from "../JobContext";
// import api from "../api/axios";
 
// export const AboutYourCompany = ({ hideNavigation = false, setActiveTab }) => {
//   const navigate = useNavigate();
//   const { setCompanyProfile } = useJobs();
//   const [isLoading, setIsLoading] = useState(false);
//   const [backendError, setBackendError] = useState("");
//   const [isFetching, setIsFetching] = useState(true);
//   const [existingLogo, setExistingLogo] = useState(null);
 
//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyMoto: "",
//     contactPerson: "",
//     contactNumber: "",
//     companyMail: "",
//     website: "",
//     companySize: "",
//     address1: "",
//     address2: "",
//     about: "",
//     companyLogo: null,
//   });
 
//   const [errors, setErrors] = useState({});
 
//   // Fetch existing company profile on component mount
//   useEffect(() => {
//     const fetchCompanyProfile = async () => {
//       try {
//         setIsFetching(true);
//         console.log("Fetching company profile from: /api/company/profile/");
       
//         const response = await api.get("/company/profile/");
//         console.log("✅ Fetched company profile response:", response.data);
       
//         const profile = response.data;
       
//         setFormData({
//           companyName: profile.company_name || "",
//           companyMoto: profile.company_moto || "",
//           contactPerson: profile.contact_person || "",
//           contactNumber: profile.contact_number || "",
//           companyMail: profile.company_email || "",
//           website: profile.website || "",
//           companySize: profile.company_size || "",
//           address1: profile.address1 || "",
//           address2: profile.address2 || "",
//           about: profile.about || "",
//           companyLogo: null,
//         });
       
//         setExistingLogo(profile.company_logo);
//       } catch (err) {
//         console.error("Error fetching company profile:", err);
//         console.log("Error response status:", err.response?.status);
//         console.log("Error response data:", err.response?.data);
       
//         if (err.response?.status === 404) {
//           console.log("No existing company profile found (404), will create new");
//           // This is normal - no profile exists yet
//           setFormData({
//             companyName: "",
//             companyMoto: "",
//             contactPerson: "",
//             contactNumber: "",
//             companyMail: "",
//             website: "",
//             companySize: "",
//             address1: "",
//             address2: "",
//             about: "",
//             companyLogo: null,
//           });
//           setExistingLogo(null);
//         } else if (err.response?.status === 401) {
//           console.log("Unauthorized - user not logged in");
//           setBackendError("Please login to continue");
//           setTimeout(() => {
//             navigate("/Job-portal/employer/login");
//           }, 2000);
//         } else {
//           setBackendError("Failed to load company profile. Please refresh the page.");
//         }
//       } finally {
//         setIsFetching(false);
//       }
//     };
   
//     fetchCompanyProfile();
//   }, [navigate]);
 
//   const validateForm = () => {
//     const newErrors = {};
 
//     if (!formData.companyName?.trim()) {
//       newErrors.companyName = "Company Name is required";
//     }
   
//     if (!formData.companyMoto?.trim()) {
//       newErrors.companyMoto = "Company Moto is required";
//     }
   
//     if (!formData.contactPerson?.trim()) {
//       newErrors.contactPerson = "Contact Person is required";
//     }
   
//     if (!formData.contactNumber?.trim()) {
//       newErrors.contactNumber = "Contact Number is required";
//     } else if (!/^[6-9]\d{9}$/.test(formData.contactNumber)) {
//       newErrors.contactNumber = "Enter valid 10-digit mobile number";
//     }
   
//     if (!formData.companyMail?.trim()) {
//       newErrors.companyMail = "Company Mail Id is required";
//     } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.companyMail)) {
//       newErrors.companyMail = "Enter valid email address";
//     }
   
//     if (!formData.website?.trim()) {
//       newErrors.website = "Company Website is required";
//     } else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.website)) {
//       newErrors.website = "Enter valid website URL (e.g., https://example.com)";
//     }
   
//     if (!formData.companySize?.trim()) {
//       newErrors.companySize = "Company Size is required";
//     }
   
//     if (!formData.address1?.trim()) {
//       newErrors.address1 = "Company Address is required";
//     }
   
//     if (!formData.about?.trim()) {
//       newErrors.about = "About Company is required";
//     }
   
//     // Logo validation - only required if no existing logo and no new file
//     if (!formData.companyLogo && !existingLogo) {
//       newErrors.companyLogo = "Company Logo is required";
//     }
 
//     setErrors(newErrors);
//     console.log("Validation Errors detected: ", newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
 
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
   
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//     setBackendError("");
 
//     if (files) {
//       const file = files[0];
 
//       const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
//       const maxSize = 5 * 1024 * 1024;
 
//       if (!allowedTypes.includes(file.type)) {
//         setErrors((prev) => ({
//           ...prev,
//           companyLogo: "Only image files (PNG, JPG, JPEG, WEBP) are allowed!",
//         }));
//         return;
//       }
 
//       if (file.size > maxSize) {
//         setErrors((prev) => ({
//           ...prev,
//           companyLogo: "File size should be less than 5MB",
//         }));
//         return;
//       }
 
//       setFormData({
//         ...formData,
//         [name]: file,
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };
 
//   const submitToBackend = async (data) => {
//     setIsLoading(true);
//     setBackendError("");
 
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("company_name", data.companyName);
//       formDataToSend.append("company_moto", data.companyMoto);
//       formDataToSend.append("contact_person", data.contactPerson);
//       formDataToSend.append("contact_number", data.contactNumber);
//       formDataToSend.append("company_email", data.companyMail);
//       formDataToSend.append("website", data.website);
//       formDataToSend.append("company_size", data.companySize);
//       formDataToSend.append("address1", data.address1);
//       if (data.address2) {
//         formDataToSend.append("address2", data.address2);
//       }
//       formDataToSend.append("about", data.about);
 
//       if (data.companyLogo) {
//         formDataToSend.append("company_logo", data.companyLogo);
//       }
 
//       let response;
 
//       // If we have existing logo (profile exists), update it
//       if (existingLogo !== null) {
//         console.log("Updating existing profile...");
//         response = await api.patch("/company/profile/update/", formDataToSend, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         console.log("✅ Company profile updated:", response.data);
//       } else {
//         console.log("Creating new profile...");
//         response = await api.post("/company/profile/create/", formDataToSend, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         console.log("✅ Company profile created:", response.data);
//       }
 
//       if (response.status === 200 || response.status === 201) {
//         // Update existingLogo after successful save
//         if (response.data.company_logo) {
//           setExistingLogo(response.data.company_logo);
//         }
//         return { success: true, data: response.data };
//       } else {
//         return { success: false, error: "Failed to save company profile" };
//       }
//     } catch (err) {
//       console.error("API Error:", err);
//       console.log("Error response:", err.response);
 
//       if (err.response?.status === 400) {
//         // Validation errors from backend
//         const backendErrors = err.response.data;
//         const newErrors = {};
 
//         // Map backend field names to frontend field names
//         const fieldMapping = {
//           company_name: "companyName",
//           company_moto: "companyMoto",
//           contact_person: "contactPerson",
//           contact_number: "contactNumber",
//           company_email: "companyMail",
//           website: "website",
//           company_size: "companySize",
//           address1: "address1",
//           about: "about",
//           company_logo: "companyLogo",
//         };
 
//         Object.keys(backendErrors).forEach((key) => {
//           const frontendKey = fieldMapping[key];
//           if (frontendKey) {
//             newErrors[frontendKey] = Array.isArray(backendErrors[key])
//               ? backendErrors[key][0]
//               : backendErrors[key];
//           }
//         });
 
//         setErrors(newErrors);
//         return { success: false, error: "Validation failed" };
//       } else if (err.response?.status === 401) {
//         return { success: false, error: "Session expired. Please login again." };
//       } else if (err.response?.status === 403) {
//         return {
//           success: false,
//           error: "You don't have permission to perform this action.",
//         };
//       } else {
//         return {
//           success: false,
//           error: err.response?.data?.error || "Network error. Please try again.",
//         };
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };
 
//   // Next button - Save and go to verification page
//   const handleNext = async (e) => {
//     e.preventDefault();
 
//     const isValid = validateForm();
//     if (!isValid) {
//       console.log("Form has errors. Stopping navigation.");
//       return;
//     }
 
//     console.log("Form Data Ready for Backend:", formData);
 
//     const result = await submitToBackend(formData);
 
//     if (result.success) {
//       setCompanyProfile(formData);
//       navigate("/Job-portal/Employer/about-your-company/company-verification");
//     } else if (result.error === "Validation failed") {
//       console.log("Validation errors from backend");
//     } else {
//       setBackendError(result.error || "Failed to save company profile. Please try again.");
//     }
//   };
 
//   // Save button (from Dashboard My Profile) - Save and stay in Dashboard
//   const handleSave = async (e) => {
//     e.preventDefault();
 
//     const isValid = validateForm();
//     if (!isValid) {
//       console.log("Form has errors. Stopping to save.");
//       return;
//     }
 
//     console.log("Saving Company Profile:", formData);
 
//     const result = await submitToBackend(formData);
 
//     if (result.success) {
//       setCompanyProfile(formData);
//       if (setActiveTab) {
//         setActiveTab("Dashboard");
//       }
//     } else if (result.error === "Validation failed") {
//       console.log("Validation errors from backend");
//     } else {
//       setBackendError(result.error || "Failed to save company profile. Please try again.");
//     }
//   };
 
//   // Show loading while fetching
//   if (isFetching) {
//     return (
//       <>
//         {!hideNavigation && <EHeader />}
//         <div className="aboutcompany-container">
//           <h2 className="aboutcompany-title">About Your Company</h2>
//           <div style={{ textAlign: "center", padding: "50px" }}>
//             Loading company profile...
//           </div>
//         </div>
//         {!hideNavigation && <Footer />}
//       </>
//     );
//   }
 
//   return (
//     <>
//       {!hideNavigation && <EHeader />}
 
//       <div className="aboutcompany-container">
//         <h2 className="aboutcompany-title">About Your Company</h2>
 
//         {backendError && (
//           <div
//             className="backend-error-message"
//             style={{
//               backgroundColor: "#ffebee",
//               color: "#d32f2f",
//               padding: "10px",
//               borderRadius: "5px",
//               marginBottom: "20px",
//               textAlign: "center",
//             }}
//           >
//             {backendError}
//           </div>
//         )}
 
//         <form className="aboutcompany-form">
//           <div className="aboutcompany-form-group">
//             <label>Company Name</label>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//               <input
//                 className={errors.companyName ? "input-error" : ""}
//                 type="text"
//                 name="companyName"
//                 placeholder="e.g., job portal"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 disabled={isLoading}
//               />
//               {errors.companyName && (
//                 <span className="error-msg">{errors.companyName}</span>
//               )}
//             </div>
//           </div>
 
//           <div className="aboutcompany-form-group">
//             <label>Company Moto</label>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//               <input
//                 className={errors.companyMoto ? "input-error" : ""}
//                 type="text"
//                 name="companyMoto"
//                 value={formData.companyMoto}
//                 onChange={handleChange}
//                 disabled={isLoading}
//               />
//               {errors.companyMoto && (
//                 <span className="error-msg">{errors.companyMoto}</span>
//               )}
//             </div>
//           </div>
 
//           <div className="aboutcompany-form-group">
//             <label>Contact Person</label>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//               <input
//                 className={errors.contactPerson ? "input-error" : ""}
//                 type="text"
//                 name="contactPerson"
//                 placeholder="e.g., vijay"
//                 value={formData.contactPerson}
//                 onChange={handleChange}
//                 disabled={isLoading}
//               />
//               {errors.contactPerson && (
//                 <span className="error-msg">{errors.contactPerson}</span>
//               )}
//             </div>
//           </div>
 
//           <div className="aboutcompany-form-group">
//             <label>Contact Number</label>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//               <input
//                 className={errors.contactNumber ? "input-error" : ""}
//                 type="tel"
//                 name="contactNumber"
//                 placeholder="e.g., 9876543210"
//                 value={formData.contactNumber}
//                 onChange={handleChange}
//                 disabled={isLoading}
//               />
//               {errors.contactNumber && (
//                 <span className="error-msg">{errors.contactNumber}</span>
//               )}
//             </div>
//           </div>
 
//           <div className="aboutcompany-form-group">
//             <label>Company Mail Id</label>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//               <input
//                 className={errors.companyMail ? "input-error" : ""}
//                 type="email"
//                 name="companyMail"
//                 placeholder="e.g., hr@example.com"
//                 value={formData.companyMail}
//                 onChange={handleChange}
//                 disabled={isLoading}
//               />
//               {errors.companyMail && (
//                 <span className="error-msg">{errors.companyMail}</span>
//               )}
//             </div>
//           </div>
 
//           <div className="aboutcompany-form-group">
//             <label>Company Web Site</label>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//               <input
//                 className={errors.website ? "input-error" : ""}
//                 type="text"
//                 name="website"
//                 placeholder="e.g., https://example.com"
//                 value={formData.website}
//                 onChange={handleChange}
//                 disabled={isLoading}
//               />
//               {errors.website && <span className="error-msg">{errors.website}</span>}
//             </div>
//           </div>
 
//           <div className="aboutcompany-form-group">
//             <label>Company Logo</label>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//               <div
//                 className={`aboutcompany-file-upload-box ${
//                   errors.companyLogo ? "input-error" : ""
//                 }`}
//                 style={errors.companyLogo ? { borderColor: "#d93025" } : {}}
//               >
//                 <input
//                   type="file"
//                   name="companyLogo"
//                   accept="image/png, image/jpeg, image/jpg, image/webp"
//                   id="logoUpload"
//                   onChange={handleChange}
//                   hidden
//                   disabled={isLoading}
//                 />
 
//                 {/* Show existing logo if no new file selected */}
//                 {!formData.companyLogo && existingLogo && (
//                   <div style={{ padding: "15px", textAlign: "center" }}>
//                     <img
//                       src={existingLogo}
//                       alt="Current Logo"
//                       style={{
//                         maxWidth: "100px",
//                         maxHeight: "100px",
//                         marginBottom: "10px",
//                         borderRadius: "8px",
//                       }}
//                     />
//                     <p style={{ margin: "5px 0", fontSize: "12px", color: "#666" }}>
//                       Current Logo
//                     </p>
//                     <label
//                       htmlFor="logoUpload"
//                       style={{
//                         cursor: "pointer",
//                         color: "#007bff",
//                         fontSize: "12px",
//                       }}
//                     >
//                       Click to change
//                     </label>
//                   </div>
//                 )}
 
//                 {!formData.companyLogo && !existingLogo && (
//                   <label htmlFor="logoUpload" className="aboutcompany-upload-placeholder">
//                     Click to Upload Logo
//                   </label>
//                 )}
 
//                 {formData.companyLogo && (
//                   <div className="aboutcompany-file-preview">
//                     <label
//                       htmlFor="logoUpload"
//                       className="aboutcompany-file-left clickable-area"
//                     >
//                       <img src={fileIcon} alt="file" />
//                       <div>
//                         <p>{formData.companyLogo.name}</p>
//                         <span>
//                           {(formData.companyLogo.size / 1024 / 1024).toFixed(2)} MB
//                         </span>
//                       </div>
//                     </label>
//                   </div>
//                 )}
//               </div>
//               {errors.companyLogo && (
//                 <span className="error-msg">{errors.companyLogo}</span>
//               )}
//             </div>
//           </div>
 
//           <div className="aboutcompany-form-group">
//             <label>Company Size</label>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//               <input
//                 className={errors.companySize ? "input-error" : ""}
//                 type="text"
//                 name="companySize"
//                 placeholder="e.g., 100-500 employees"
//                 value={formData.companySize}
//                 onChange={handleChange}
//                 disabled={isLoading}
//               />
//               {errors.companySize && (
//                 <span className="error-msg">{errors.companySize}</span>
//               )}
//             </div>
//           </div>
 
//           <div className="aboutcompany-form-group">
//             <label>Company Address</label>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//               <input
//                 className={errors.address1 ? "input-error" : ""}
//                 type="text"
//                 name="address1"
//                 placeholder="e.g., Hyderabad, India"
//                 value={formData.address1}
//                 onChange={handleChange}
//                 disabled={isLoading}
//               />
//               {errors.address1 && <span className="error-msg">{errors.address1}</span>}
//             </div>
//           </div>
 
//           <div className="aboutcompany-form-group">
//             <label>Company Address 2 (Optional)</label>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//               <input
//                 type="text"
//                 name="address2"
//                 placeholder="e.g., Floor 3, Building A"
//                 value={formData.address2}
//                 onChange={handleChange}
//                 disabled={isLoading}
//               />
//             </div>
//           </div>
 
//           <div className="aboutcompany-form-group">
//             <label>About Company</label>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//               <textarea
//                 className={errors.about ? "input-error" : ""}
//                 rows="5"
//                 name="about"
//                 value={formData.about}
//                 onChange={handleChange}
//                 disabled={isLoading}
//               />
//               {errors.about && <span className="error-msg">{errors.about}</span>}
//             </div>
//           </div>
 
//           {!hideNavigation && (
//             <div className="aboutcompany-form-buttons">
//               <button
//                 type="button"
//                 className="aboutcompany-back-btn"
//                 onClick={() => navigate(-1)}
//                 disabled={isLoading}
//               >
//                 Back
//               </button>
//               <button
//                 type="button"
//                 className="aboutcompany-next-btn"
//                 onClick={handleNext}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Saving..." : "Next"}
//               </button>
//             </div>
//           )}
 
//           {hideNavigation && (
//             <div>
//               <button
//                 type="button"
//                 className="aboutcompany-save-btn"
//                 onClick={handleSave}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Saving..." : "Save"}
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
 
//       {!hideNavigation && <Footer />}
//     </>
//   );
// };   




import React, { useState, useEffect } from "react";
import { Footer } from "../Components-LandingPage/Footer";
import { EHeader } from "./EHeader";
import "./AboutYourCompany.css";
import fileIcon from "../assets/Employer/fileIcon.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useJobs } from "../JobContext";
import api from "../api/axios";

export const AboutYourCompany = ({ hideNavigation = false, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCompanyProfile } = useJobs();
  const [isLoading, setIsLoading] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [existingLogo, setExistingLogo] = useState(null);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);
  
  // Check if coming from signup
  const fromSignup = location.state?.fromSignup || false;

  const [formData, setFormData] = useState({
    companyName: "",
    companyMoto: "",
    contactPerson: "",
    contactNumber: "",
    companyMail: "",
    website: "",
    companySize: "",
    address1: "",
    address2: "",
    about: "",
    companyLogo: null,
  });

  const [errors, setErrors] = useState({});

  // ✅ Fetch existing profile only if NOT coming from signup
  // useEffect(() => {
  //   if (!fromSignup && !hideNavigation) {
  //     fetchExistingProfile();
  //   }
  // }, [fromSignup, hideNavigation]);  

  // ✅ Fetch existing profile when:
// - Not coming from signup (fromSignup = false)
// - And either in dashboard mode (hideNavigation = true) or standalone mode
useEffect(() => {
  // Always fetch if not from signup
  if (!fromSignup) {
    fetchExistingProfile();
  } else {
    // Coming from signup - no need to fetch, it's a new profile
    console.log("Coming from signup, skipping profile fetch");
    setIsLoading(false);
  }
}, [fromSignup]);

  // const fetchExistingProfile = async () => {
  //   try {
  //     setIsLoading(true);
  //     console.log("Fetching existing company profile...");
      
  //     const response = await api.get("/company/profile/");
  //     console.log("✅ Existing profile found:", response.data);
      
  //     const profile = response.data;
  //     setFormData({
  //       companyName: profile.company_name || "",
  //       companyMoto: profile.company_moto || "",
  //       contactPerson: profile.contact_person || "",
  //       contactNumber: profile.contact_number || "",
  //       companyMail: profile.company_email || "",
  //       website: profile.website || "",
  //       companySize: profile.company_size || "",
  //       address1: profile.address1 || "",
  //       address2: profile.address2 || "",
  //       about: profile.about || "",
  //       companyLogo: null,
  //     });
      
  //     setExistingLogo(profile.company_logo);
  //     setHasExistingProfile(true);
  //   } catch (err) {
  //     if (err.response?.status === 404) {
  //       console.log("No existing profile found");
  //       setHasExistingProfile(false);
  //     } else if (err.response?.status === 401) {
  //       console.log("Unauthorized - redirecting to login");
  //       navigate("/Job-portal/employer/login");
  //     } else {
  //       console.error("Error fetching profile:", err);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };




  const fetchExistingProfile = async () => {
  try {
    setIsLoading(true);
    console.log("Fetching existing company profile for dashboard...");
    
    const response = await api.get("/company/profile/");
    console.log("✅ Existing profile found:", response.data);
    
    const profile = response.data;
    setFormData({
      companyName: profile.company_name || "",
      companyMoto: profile.company_moto || "",
      contactPerson: profile.contact_person || "",
      contactNumber: profile.contact_number || "",
      companyMail: profile.company_email || "",
      website: profile.website || "",
      companySize: profile.company_size || "",
      address1: profile.address1 || "",
      address2: profile.address2 || "",
      about: profile.about || "",
      companyLogo: null,
    });
    
    setExistingLogo(profile.company_logo);
    setHasExistingProfile(true);
    
  } catch (err) {
    if (err.response?.status === 404) {
      console.log("No existing profile found");
      setHasExistingProfile(false);
      setExistingLogo(null);
      // Don't redirect in dashboard mode, just show empty form
      if (!hideNavigation) {
        setBackendError("No company profile found. Please create one.");
      }
    } else if (err.response?.status === 401) {
      console.log("Unauthorized - redirecting to login");
      if (!hideNavigation) {
        navigate("/Job-portal/employer/login");
      } else {
        setBackendError("Session expired. Please login again.");
      }
    } else {
      console.error("Error fetching profile:", err);
      setBackendError("Failed to load company profile");
    }
  } finally {
    setIsLoading(false);
  }
};


  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName?.trim()) newErrors.companyName = "Company Name is required";
    if (!formData.companyMoto?.trim()) newErrors.companyMoto = "Company Moto is required";
    if (!formData.contactPerson?.trim()) newErrors.contactPerson = "Contact Person is required";
    
    if (!formData.contactNumber?.trim()) {
      newErrors.contactNumber = "Contact Number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Enter valid 10-digit mobile number";
    }
    
    if (!formData.companyMail?.trim()) {
      newErrors.companyMail = "Company Mail Id is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.companyMail)) {
      newErrors.companyMail = "Enter valid email address";
    }
    
    if (!formData.website?.trim()) {
      newErrors.website = "Company Website is required";
    } else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.website)) {
      newErrors.website = "Enter valid website URL (e.g., https://example.com)";
    }
    
    if (!formData.companySize?.trim()) newErrors.companySize = "Company Size is required";
    if (!formData.address1?.trim()) newErrors.address1 = "Company Address is required";
    if (!formData.about?.trim()) newErrors.about = "About Company is required";
    
    // Logo validation
    if (!formData.companyLogo && !existingLogo) {
      newErrors.companyLogo = "Company Logo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {

    // const { name, value, files } = e?.target;
    const target = e?.target;
  if (!target) return;
  
  const { name, value, files } = target;  

  
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setBackendError("");

    if (files) {
      const file = files[0];
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      const maxSize = 5 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, companyLogo: "Only image files are allowed!" }));
        return;
      }

      if (file.size > maxSize) {
        setErrors((prev) => ({ ...prev, companyLogo: "File size should be less than 5MB" }));
        return;
      }

      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Create new company profile
  const createCompanyProfile = async (data) => {
    setIsLoading(true);
    setBackendError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("company_name", data.companyName);
      formDataToSend.append("company_moto", data.companyMoto);
      formDataToSend.append("contact_person", data.contactPerson);
      formDataToSend.append("contact_number", data.contactNumber);
      formDataToSend.append("company_email", data.companyMail);
      formDataToSend.append("website", data.website);
      formDataToSend.append("company_size", data.companySize);
      formDataToSend.append("address1", data.address1);
      if (data.address2) formDataToSend.append("address2", data.address2);
      formDataToSend.append("about", data.about);
      if (data.companyLogo) formDataToSend.append("company_logo", data.companyLogo);

      const response = await api.post("/company/profile/create/", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Company profile created:", response.data);
      return { success: true, data: response.data };
    } catch (err) {
      console.error("Create profile error:", err);
      
      if (err.response?.status === 400) {
        const backendErrors = err.response.data;
        const newErrors = {};
        const fieldMapping = {
          company_name: "companyName", company_moto: "companyMoto",
          contact_person: "contactPerson", contact_number: "contactNumber",
          company_email: "companyMail", website: "website",
          company_size: "companySize", address1: "address1",
          about: "about", company_logo: "companyLogo",
        };
        
        Object.keys(backendErrors).forEach((key) => {
          const frontendKey = fieldMapping[key];
          if (frontendKey) {
            newErrors[frontendKey] = Array.isArray(backendErrors[key])
              ? backendErrors[key][0] : backendErrors[key];
          }
        });
        setErrors(newErrors);
        return { success: false, error: "Validation failed" };
      }
      
      return { success: false, error: err.response?.data?.error || "Network error" };
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Update existing company profile
  const updateCompanyProfile = async (data) => {
    setIsLoading(true);
    setBackendError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("company_name", data.companyName);
      formDataToSend.append("company_moto", data.companyMoto);
      formDataToSend.append("contact_person", data.contactPerson);
      formDataToSend.append("contact_number", data.contactNumber);
      formDataToSend.append("company_email", data.companyMail);
      formDataToSend.append("website", data.website);
      formDataToSend.append("company_size", data.companySize);
      formDataToSend.append("address1", data.address1);
      if (data.address2) formDataToSend.append("address2", data.address2);
      formDataToSend.append("about", data.about);
      if (data.companyLogo) formDataToSend.append("company_logo", data.companyLogo);

      const response = await api.patch("/company/profile/update/", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Company profile updated:", response.data);
      return { success: true, data: response.data };
    } catch (err) {
      console.error("Update profile error:", err);
      
      if (err.response?.status === 400) {
        const backendErrors = err.response.data;
        const newErrors = {};
        const fieldMapping = {
          company_name: "companyName", company_moto: "companyMoto",
          contact_person: "contactPerson", contact_number: "contactNumber",
          company_email: "companyMail", website: "website",
          company_size: "companySize", address1: "address1",
          about: "about", company_logo: "companyLogo",
        };
        
        Object.keys(backendErrors).forEach((key) => {
          const frontendKey = fieldMapping[key];
          if (frontendKey) {
            newErrors[frontendKey] = Array.isArray(backendErrors[key])
              ? backendErrors[key][0] : backendErrors[key];
          }
        });
        setErrors(newErrors);
        return { success: false, error: "Validation failed" };
      }
      
      return { success: false, error: err.response?.data?.error || "Network error" };
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Next button - Create or Update based on context
  const handleNext = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      console.log("Form has errors");
      return;
    }

    console.log("Saving company profile...");
    
    let result;
    // If coming from signup OR no existing profile, create new
    if (fromSignup || !hasExistingProfile) {
      result = await createCompanyProfile(formData);
    } else {
      result = await updateCompanyProfile(formData);
    }

    if (result.success) {
      setCompanyProfile({
        ...formData,
        id: result.data.id,
        companyLogo: result.data.company_logo
      });
      
      // Navigate to verification page
      navigate("/Job-portal/Employer/about-your-company/company-verification", {
        state: { 
          fromSignup: fromSignup,
          profileId: result.data.id 
        }
      });
    } else if (result.error !== "Validation failed") {
      setBackendError(result.error || "Failed to save company profile");
    }
  };

  // ✅ Save button for dashboard
  // const handleSave = async (e) => {
  //   e.preventDefault();

  //   const isValid = validateForm();
  //   if (!isValid) return;

  //   let result;
  //   if (hasExistingProfile) {
  //     result = await updateCompanyProfile(formData);
  //   } else {
  //     result = await createCompanyProfile(formData);
  //   }

  //   if (result.success) {
  //     setCompanyProfile({
  //       ...formData,
  //       id: result.data.id,
  //       companyLogo: result.data.company_logo
  //     });
  //     alert("Company profile saved successfully!");
  //     if (setActiveTab) setActiveTab("Dashboard");
  //   } else if (result.error !== "Validation failed") {
  //     setBackendError(result.error || "Failed to save");
  //   }
  // };  


  // Save button (from Dashboard My Profile) - Save and stay in Dashboard
const handleSave = async (e) => {
  e.preventDefault();

  const isValid = validateForm();
  if (!isValid) return;

  console.log("Saving Company Profile from Dashboard:", formData);
  
  let result;
  if (hasExistingProfile) {
    result = await updateCompanyProfile(formData);
  } else {
    result = await createCompanyProfile(formData);
  }

  if (result.success) {
    setCompanyProfile({
      ...formData,
      id: result.data.id,
      companyLogo: result.data.company_logo
    });
    
    // Update existing logo and profile flag
    setExistingLogo(result.data.company_logo);
    setHasExistingProfile(true);
    
    alert("Company profile saved successfully!");
    
    // Stay on dashboard, just refresh the data
    // setActiveTab("Dashboard"); // This is already called from EmployerDashboard
    
  } else if (result.error !== "Validation failed") {
    setBackendError(result.error || "Failed to save");
  }
};

  // Loading state
  if (isLoading && !fromSignup) {
    return (
      <>
        {!hideNavigation && <EHeader />}
        <div className="aboutcompany-container">
          <h2 className="aboutcompany-title">About Your Company</h2>
          <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
        </div>
        {!hideNavigation && <Footer />}
      </>
    );
  }

  return (
    <>
      {!hideNavigation && <EHeader />}

      <div className="aboutcompany-container">
        <h2 className="aboutcompany-title">
          About Your Company
          {fromSignup && <span style={{ fontSize: "14px", color: "#666", marginLeft: "10px" }}>(Step 1 of 2)</span>}
        </h2>

        {backendError && (
          <div className="backend-error-message" style={{
            backgroundColor: "#ffebee", color: "#d32f2f",
            padding: "10px", borderRadius: "5px", marginBottom: "20px", textAlign: "center"
          }}>
            {backendError}
          </div>
        )}

        <form className="aboutcompany-form">
          {/* Company Name */}
          <div className="aboutcompany-form-group">
            <label>Company Name *</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                className={errors.companyName ? "input-error" : ""}
                type="text"
                name="companyName"
                placeholder="e.g., Tech Solutions Pvt Ltd"
                value={formData.companyName}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.companyName && <span className="error-msg">{errors.companyName}</span>}
            </div>
          </div>

          {/* Company Moto */}
          <div className="aboutcompany-form-group">
            <label>Company Moto *</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                className={errors.companyMoto ? "input-error" : ""}
                type="text"
                name="companyMoto"
                placeholder="e.g., Innovating for a better tomorrow"
                value={formData.companyMoto}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.companyMoto && <span className="error-msg">{errors.companyMoto}</span>}
            </div>
          </div>

          {/* Contact Person */}
          <div className="aboutcompany-form-group">
            <label>Contact Person *</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                className={errors.contactPerson ? "input-error" : ""}
                type="text"
                name="contactPerson"
                placeholder="e.g., John Doe"
                value={formData.contactPerson}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.contactPerson && <span className="error-msg">{errors.contactPerson}</span>}
            </div>
          </div>

          {/* Contact Number */}
          <div className="aboutcompany-form-group">
            <label>Contact Number *</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                className={errors.contactNumber ? "input-error" : ""}
                type="tel"
                name="contactNumber"
                placeholder="e.g., 9876543210"
                value={formData.contactNumber}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.contactNumber && <span className="error-msg">{errors.contactNumber}</span>}
            </div>
          </div>

          {/* Company Email */}
          <div className="aboutcompany-form-group">
            <label>Company Mail Id *</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                className={errors.companyMail ? "input-error" : ""}
                type="email"
                name="companyMail"
                placeholder="e.g., hr@company.com"
                value={formData.companyMail}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.companyMail && <span className="error-msg">{errors.companyMail}</span>}
            </div>
          </div>

          {/* Website */}
          <div className="aboutcompany-form-group">
            <label>Company Website *</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                className={errors.website ? "input-error" : ""}
                type="text"
                name="website"
                placeholder="e.g., https://www.company.com"
                value={formData.website}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.website && <span className="error-msg">{errors.website}</span>}
            </div>
          </div>

          {/* Company Logo */}
          <div className="aboutcompany-form-group">
            <label>Company Logo *</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div className={`aboutcompany-file-upload-box ${errors.companyLogo ? "input-error" : ""}`}>
                <input
                  type="file"
                  name="companyLogo"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  id="logoUpload"
                  onChange={handleChange}
                  hidden
                  disabled={isLoading}
                />

                {!formData.companyLogo && !existingLogo && (
                  <label htmlFor="logoUpload" className="aboutcompany-upload-placeholder">
                    Click to Upload Logo
                  </label>
                )}

                {existingLogo && !formData.companyLogo && (
                  <div style={{ padding: "15px", textAlign: "center" }}>
                    <img src={existingLogo} alt="Current Logo" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                    <label htmlFor="logoUpload" style={{ cursor: "pointer", color: "#007bff", display: "block" }}>
                      Click to change
                    </label>
                  </div>
                )}

                {formData.companyLogo && (
                  <div className="aboutcompany-file-preview">
                    <label htmlFor="logoUpload" className="aboutcompany-file-left clickable-area">
                      <img src={fileIcon} alt="file" />
                      <div>
                        <p>{formData.companyLogo.name}</p>
                        <span>{(formData.companyLogo.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
              {errors.companyLogo && <span className="error-msg">{errors.companyLogo}</span>}
            </div>
          </div>

          {/* Company Size */}
          <div className="aboutcompany-form-group">
            <label>Company Size *</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <select
                className={errors.companySize ? "input-error" : ""}
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
              {errors.companySize && <span className="error-msg">{errors.companySize}</span>}
            </div>
          </div>

          {/* Address 1 */}
          <div className="aboutcompany-form-group">
            <label>Company Address *</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                className={errors.address1 ? "input-error" : ""}
                type="text"
                name="address1"
                placeholder="e.g., Hyderabad, India"
                value={formData.address1}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.address1 && <span className="error-msg">{errors.address1}</span>}
            </div>
          </div>

          {/* Address 2 (Optional) */}
          <div className="aboutcompany-form-group">
            <label>Company Address 2 (Optional)</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                name="address2"
                placeholder="e.g., Floor 3, Building A"
                value={formData.address2}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* About Company */}
          <div className="aboutcompany-form-group">
            <label>About Company *</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <textarea
                className={errors.about ? "input-error" : ""}
                rows="5"
                name="about"
                placeholder="Tell us about your company, mission, values, and what makes you unique..."
                value={formData.about}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.about && <span className="error-msg">{errors.about}</span>}
            </div>
          </div>

          {!hideNavigation && (
            <div className="aboutcompany-form-buttons">
              <button type="button" className="aboutcompany-back-btn" onClick={() => navigate(-1)} disabled={isLoading}>
                Back
              </button>
              <button type="button" className="aboutcompany-next-btn" onClick={handleNext} disabled={isLoading}>
                {isLoading ? "Saving..." : "Next"}
              </button>
            </div>
          )}

          {hideNavigation && (
            <div>
              <button type="button" className="aboutcompany-save-btn" onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>

      {!hideNavigation && <Footer />}
    </>
  );
};