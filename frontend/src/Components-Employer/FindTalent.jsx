// import React, { useMemo, useState } from "react";
// import "./FindTalent.css";
// import { useJobs } from "../JobContext";
// import { useNavigate } from "react-router-dom";
// import { ProfileCard } from "./ProfileCard";
// import api from "../api/axios";

// export const FindTalent = () => {
//   const { Alluser, startConversation } = useJobs();
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedLanguages, setSelectedLanguages] = useState([]);
//   const [selectedEdu, setSelectedEdu] = useState([]);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [maxExp, setMaxExp] = useState(10);

//   const [showAllLangs, setShowAllLangs] = useState(false);
//   const [showAllEdu, setShowAllEdu] = useState(false);
//   const [showAllSkills, setShowAllSkills] = useState(false);

//   /* ---------------- FILTER OPTIONS ---------------- */

//   const filterOptions = useMemo(() => {
//     const languages = new Set();
//     const education = new Set();
//     const skills = new Set();

//     Alluser?.forEach((user) => {
//       user.languages?.forEach((lang) => {
//         if (lang.name) languages.add(lang.name);
//       });

//       user.skills?.forEach((skill) => {
//         if (skill.name) skills.add(skill.name);
//       });

//       user.educations?.forEach((edu) => {
//         if (edu.degree) education.add(edu.degree);
//       });
//     });

//     return {
//       languages: Array.from(languages),
//       education: Array.from(education),
//       skills: Array.from(skills),
//     };
//   }, [Alluser]);

//   /* ---------------- FILTER HANDLER ---------------- */

//   const handleFilterChange = (value, state, setState) => {
//     setState(
//       state.includes(value)
//         ? state.filter((item) => item !== value)
//         : [...state, value]
//     );
//   };

//   /* ---------------- FILTERED TALENT ---------------- */

//   const filteredTalent = useMemo(() => {
//     return Alluser?.filter((user) => {
//       const userSkills = user.skills?.map((s) => s.name) || [];
//       const userLanguages = user.languages?.map((l) => l.name) || [];
//       const userEducation = user.educations?.map((e) => e.degree) || [];

//       const matchesSearch =
//         searchTerm === "" ||
//         userSkills.some((s) =>
//           s.toLowerCase().includes(searchTerm.toLowerCase())
//         ) ||
//         userEducation.some((e) =>
//           e?.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//       const matchesLanguage =
//         selectedLanguages.length === 0 ||
//         userLanguages.some((lang) => selectedLanguages.includes(lang));

//       const matchesEducation =
//         selectedEdu.length === 0 ||
//         userEducation.some((edu) => selectedEdu.includes(edu));

//       const matchesSkills =
//         selectedSkills.length === 0 ||
//         selectedSkills.every((skill) => userSkills.includes(skill));

//       const expNumber = parseFloat(user.total_experience_years || 0);
//       const matchesExperience = expNumber <= maxExp;

//       return (
//         matchesSearch &&
//         matchesLanguage &&
//         matchesEducation &&
//         matchesSkills &&
//         matchesExperience
//       );
//     });
//   }, [
//     Alluser,
//     searchTerm,
//     selectedLanguages,
//     selectedEdu,
//     selectedSkills,
//     maxExp,
//   ]);

//   const getVisibleItems = (items, showAll) =>
//     showAll ? items : items.slice(0, 3);

//   /* ---------------- UI ---------------- */


//   // Add this before the return to see the data structure
// console.log("Alluser sample:", Alluser?.map(u => ({
//   profileId: u.id,
//   userId: u.user?.id,
//   user_id: u.user_id,
//   name: u.full_name
// })));

//   return (
//     <div className="talent-page-container">
//       {/* SEARCH */}

//       <section className="FindTalent-search-section">
//         <div className="FindTalent-search-wrapper">
//           <input
//             type="text"
//             placeholder="Search by Skills or Education"
//             className="FindTalent-search-input"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button className="FindTalent-search-button">Search</button>
//         </div>

//         <h1 className="FindTalent-results-title">
//           Jobseekers based on your search
//         </h1>
//       </section>

//       <div className="FindTalent-layout-body">
//         {/* ---------------- FILTER SIDEBAR ---------------- */}

//         <div className="FindTalent-filters-sidebar">
//           <div className="FindTalent-filter-top">
//             <span className="FindTalent-filter-label">Apply Filters</span>

//             <span
//               className="FindTalent-clear-btn"
//               onClick={() => {
//                 setSelectedLanguages([]);
//                 setSelectedEdu([]);
//                 setSelectedSkills([]);
//                 setMaxExp(10);
//                 setSearchTerm("");
//               }}
//             >
//               Clear filter
//             </span>
//           </div>

//           {/* LANGUAGES */}

//           <div className="FindTalent-filter-category">
//             <h3>Languages</h3>

//             {getVisibleItems(filterOptions.languages, showAllLangs).map(
//               (lang) => (
//                 <div key={lang} className="FindTalent-checkbox-item">
//                   <input
//                     type="checkbox"
//                     checked={selectedLanguages.includes(lang)}
//                     onChange={() =>
//                       handleFilterChange(
//                         lang,
//                         selectedLanguages,
//                         setSelectedLanguages
//                       )
//                     }
//                   />
//                   {lang}
//                 </div>
//               )
//             )}

//             {filterOptions.languages.length > 3 && (
//               <span
//                 className="FindTalent-view-more-link"
//                 onClick={() => setShowAllLangs(!showAllLangs)}
//               >
//                 {showAllLangs ? "View Less" : "View More"}
//               </span>
//             )}
//           </div>

//           {/* EXPERIENCE */}

//           <div className="FindTalent-filter-category">
//             <h3>Experience</h3>

//             <input
//               type="range"
//               min="0"
//               max="10"
//               value={maxExp}
//               onChange={(e) => setMaxExp(e.target.value)}
//               className="FindTalent-exp-slider"
//             />

//             <p>{maxExp} Years</p>
//           </div>

//           {/* EDUCATION */}

//           <div className="FindTalent-filter-category">
//             <h3>Education</h3>

//             {getVisibleItems(filterOptions.education, showAllEdu).map(
//               (edu) => (
//                 <div key={edu} className="FindTalent-checkbox-item">
//                   <input
//                     type="checkbox"
//                     checked={selectedEdu.includes(edu)}
//                     onChange={() =>
//                       handleFilterChange(edu, selectedEdu, setSelectedEdu)
//                     }
//                   />
//                   {edu}
//                 </div>
//               )
//             )}

//             {filterOptions.education.length > 3 && (
//               <span
//                 className="FindTalent-view-more-link"
//                 onClick={() => setShowAllEdu(!showAllEdu)}
//               >
//                 {showAllEdu ? "View Less" : "View More"}
//               </span>
//             )}
//           </div>

//           {/* SKILLS */}

//           <div className="FindTalent-filter-category">
//             <h3>Skills</h3>

//             {getVisibleItems(filterOptions.skills, showAllSkills).map(
//               (skill) => (
//                 <div key={skill} className="FindTalent-checkbox-item">
//                   <input
//                     type="checkbox"
//                     checked={selectedSkills.includes(skill)}
//                     onChange={() =>
//                       handleFilterChange(
//                         skill,
//                         selectedSkills,
//                         setSelectedSkills
//                       )
//                     }
//                   />
//                   {skill}
//                 </div>
//               )
//             )}

//             {filterOptions.skills.length > 3 && (
//               <span
//                 className="FindTalent-view-more-link"
//                 onClick={() => setShowAllSkills(!showAllSkills)}
//               >
//                 {showAllSkills ? "View Less" : "View More"}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* ---------------- TALENT LIST ---------------- */}

//         <div className="FindTalent-talent-list">
//           {filteredTalent?.map((user, index) => (
//             // <ProfileCard key={index} user={user} showActions={true} onChat={()=>startConversation(user.id)} />
//             // CORRECT code:
//             <ProfileCard
//               key={index}
//               user={user}
//               showActions={true}
//               onChat={() => startConversation(user.user?.id || user.user_id)}  // ← FIX: send actual user ID
//             />
//           ))}

//           {filteredTalent?.length > 0 && (
//             <button className="FindTalent-load-more-btn">View more</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };   






// import React, { useMemo, useState, useEffect } from 'react';
// import './FindTalent.css';
// import { useJobs } from '../JobContext';
// import { useNavigate } from 'react-router-dom';
// import { ProfileCard } from './ProfileCard';

// export const FindTalent = () => {
//   // Get data from JobContext
//   const { Alluser, startConversation, loading } = useJobs();
//   const navigate = useNavigate();
  
//   // States for Filters
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedLanguages, setSelectedLanguages] = useState([]);
//   const [selectedEdu, setSelectedEdu] = useState([]);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [maxExp, setMaxExp] = useState(10);

//   // States for "View More" toggles
//   const [showAllLangs, setShowAllLangs] = useState(false);
//   const [showAllEdu, setShowAllEdu] = useState(false);
//   const [showAllSkills, setShowAllSkills] = useState(false);

//   // Debug: Log Alluser data structure
//   useEffect(() => {
//     if (Alluser && Alluser.length > 0) {
//       console.log("FindTalent - Alluser data:", Alluser);
//       console.log("Sample user structure:", Alluser[0]);
//     }
//   }, [Alluser]);

//   // --- Dynamic Data Extraction based on backend structure ---
//   const filterOptions = useMemo(() => {
//     const languages = new Set();
//     const education = new Set();
//     const skills = new Set();

//     if (!Alluser || Alluser.length === 0) {
//       return { languages: [], education: [], skills: [] };
//     }

//     Alluser.forEach(user => {
//       // Extract languages from the correct structure
//       if (user.languages && Array.isArray(user.languages)) {
//         user.languages.forEach(lang => {
//           if (lang.name) languages.add(lang.name);
//         });
//       }

//       // Extract education from educations array
//       if (user.educations && Array.isArray(user.educations)) {
//         user.educations.forEach(edu => {
//           if (edu.degree) education.add(edu.degree);
//         });
//       }

//       // Extract skills from skills array
//       if (user.skills && Array.isArray(user.skills)) {
//         user.skills.forEach(skill => {
//           if (skill.name) skills.add(skill.name);
//         });
//       }

//       // Also check profile if it exists (nested structure)
//       if (user.profile) {
//         if (user.profile.languages) {
//           user.profile.languages.forEach(lang => {
//             if (lang.name) languages.add(lang.name);
//           });
//         }
//         if (user.profile.educations) {
//           user.profile.educations.forEach(edu => {
//             if (edu.degree) education.add(edu.degree);
//           });
//         }
//         if (user.profile.skills) {
//           user.profile.skills.forEach(skill => {
//             if (skill.name) skills.add(skill.name);
//           });
//         }
//       }
//     });

//     return {
//       languages: Array.from(languages).filter(Boolean).sort(),
//       education: Array.from(education).filter(Boolean).sort(),
//       skills: Array.from(skills).filter(Boolean).sort(),
//     };
//   }, [Alluser]);

//   // Handle filter changes
//   const handleFilterChange = (value, state, setState) => {
//     setState(
//       state.includes(value) 
//         ? state.filter(i => i !== value) 
//         : [...state, value]
//     );
//   };

//   // Filter talent based on all criteria
//   const filteredTalent = useMemo(() => {
//     if (!Alluser || Alluser.length === 0) return [];

//     return Alluser.filter((user) => {
//       // Extract skills names
//       const userSkills = user.skills?.map(s => s.name) || [];
      
//       // Extract language names
//       const userLanguages = user.languages?.map(l => l.name) || [];
      
//       // Extract education degrees
//       const userEducation = user.educations?.map(e => e.degree) || [];

//       // Search term matching
//       const searchLower = searchTerm.toLowerCase().trim();
//       let matchesSearch = true;
      
//       if (searchLower) {
//         const searchableText = [
//           user.full_name || '',
//           user.current_job_title || '',
//           user.current_company || '',
//           ...userSkills,
//           ...userEducation
//         ].join(' ').toLowerCase();
        
//         matchesSearch = searchableText.includes(searchLower);
//       }

//       // Language matching
//       const matchesLanguage = selectedLanguages.length === 0 ||
//         userLanguages.some(lang => selectedLanguages.includes(lang));

//       // Education matching
//       const matchesEducation = selectedEdu.length === 0 ||
//         userEducation.some(edu => selectedEdu.includes(edu));

//       // Skills matching
//       const matchesSkills = selectedSkills.length === 0 ||
//         selectedSkills.every(skill => userSkills.includes(skill));

//       // Experience calculation
//       let expNumber = 0;
//       if (user.total_experience_years !== undefined) {
//         expNumber = parseFloat(user.total_experience_years) || 0;
//       } else if (user.profile?.total_experience_years) {
//         expNumber = parseFloat(user.profile.total_experience_years) || 0;
//       }
      
//       const matchesExperience = expNumber <= maxExp;

//       return matchesSearch && matchesLanguage && matchesEducation && matchesSkills && matchesExperience;
//     });
//   }, [searchTerm, selectedLanguages, selectedEdu, selectedSkills, maxExp, Alluser]);

//   // Handle connect button click
//   const handleConnect = async (user) => {
//     try {
//       console.log("Connecting with user:", user);
      
//       // Get the actual user ID (from user object, not profile ID)
//       const userId = user.user?.id || user.user_id;
      
//       if (!userId) {
//         console.error("No user ID found:", user);
//         alert("Unable to start conversation. User ID not found.");
//         return;
//       }
      
//       console.log("Starting conversation with user ID:", userId);
//       const conversationId = await startConversation(
//         userId, 
//         `Hi ${user.full_name}, I'm interested in your profile.`
//       );
      
//       if (conversationId) {
//         navigate(`/Job-portal/employer-chat/${conversationId}`);
//       }
//     } catch (error) {
//       console.error("Failed to start conversation:", error);
//       alert("Failed to start conversation. Please try again.");
//     }
//   };

//   // Helper to get visible items for "View More"
//   const getVisibleItems = (items, showAll) => {
//     if (!items || items.length === 0) return [];
//     return showAll ? items : items.slice(0, 5);
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setSelectedLanguages([]);
//     setSelectedEdu([]);
//     setSelectedSkills([]);
//     setMaxExp(10);
//     setSearchTerm('');
//     setShowAllLangs(false);
//     setShowAllEdu(false);
//     setShowAllSkills(false);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="talent-page-container">
//         <div className="loading-spinner">Loading talent pool...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="talent-page-container">
//       {/* Search Section */}
//       <section className="FindTalent-search-section"> 
//         <div className="FindTalent-search-wrapper">
//           <input
//             type="text"
//             placeholder="Search by Skills, Education, or Job Title"
//             className="FindTalent-search-input"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button className="FindTalent-search-button">Search</button>
//         </div>
//         <h1 style={{ marginTop: "40px" }} className="FindTalent-results-title">
//           Jobseekers based on your search ({filteredTalent.length})
//         </h1>
//       </section>

//       <div className="FindTalent-layout-body">
//         {/* Filters Sidebar */}
//         <div className="FindTalent-filters-sidebar">
//           <div className="FindTalent-filter-top">
//             <span className="FindTalent-filter-label">Apply filters</span>
//             <span className="FindTalent-clear-btn" onClick={clearFilters}>
//               Clear all
//             </span>
//           </div>

//           {/* Languages Filter */}
//           {filterOptions.languages.length > 0 && (
//             <div className="FindTalent-filter-category">
//               <h3>Languages</h3>
//               {getVisibleItems(filterOptions.languages, showAllLangs).map(lang => (
//                 <div key={lang} className="FindTalent-checkbox-item">
//                   <input 
//                     type="checkbox" 
//                     id={`lang-${lang}`}
//                     checked={selectedLanguages.includes(lang)} 
//                     onChange={() => handleFilterChange(lang, selectedLanguages, setSelectedLanguages)} 
//                   />
//                   <label htmlFor={`lang-${lang}`}>{lang}</label>
//                 </div>
//               ))}
//               {filterOptions.languages.length > 5 && (
//                 <span className="FindTalent-view-more-link" onClick={() => setShowAllLangs(!showAllLangs)}>
//                   {showAllLangs ? "View Less" : `View More (${filterOptions.languages.length - 5}+)`}
//                 </span>
//               )}
//             </div>
//           )}

//           {/* Experience Filter */}
//           <div className="FindTalent-filter-category">
//             <h3>Experience (Max: {maxExp} years)</h3>
//             <input 
//               type="range" 
//               min="0" 
//               max="20" 
//               value={maxExp} 
//               onChange={(e) => setMaxExp(parseInt(e.target.value))} 
//               className="FindTalent-exp-slider" 
//             />
//             <div className="FindTalent-range-values">
//               <span>0 yrs</span>
//               <span>{maxExp} yrs</span>
//             </div>
//           </div>

//           {/* Education Filter */}
//           {filterOptions.education.length > 0 && (
//             <div className="FindTalent-filter-category">
//               <h3>Education</h3>
//               {getVisibleItems(filterOptions.education, showAllEdu).map(edu => (
//                 <div key={edu} className="FindTalent-checkbox-item">
//                   <input 
//                     type="checkbox" 
//                     id={`edu-${edu}`}
//                     checked={selectedEdu.includes(edu)} 
//                     onChange={() => handleFilterChange(edu, selectedEdu, setSelectedEdu)} 
//                   />
//                   <label htmlFor={`edu-${edu}`}>{edu}</label>
//                 </div>
//               ))}
//               {filterOptions.education.length > 5 && (
//                 <span className="FindTalent-view-more-link" onClick={() => setShowAllEdu(!showAllEdu)}>
//                   {showAllEdu ? "View Less" : `View More (${filterOptions.education.length - 5}+)`}
//                 </span>
//               )}
//             </div>
//           )}

//           {/* Skills Filter */}
//           {filterOptions.skills.length > 0 && (
//             <div className="FindTalent-filter-category">
//               <h3>Skills</h3>
//               {getVisibleItems(filterOptions.skills, showAllSkills).map(skill => (
//                 <div key={skill} className="FindTalent-checkbox-item">
//                   <input 
//                     type="checkbox" 
//                     id={`skill-${skill}`}
//                     checked={selectedSkills.includes(skill)} 
//                     onChange={() => handleFilterChange(skill, selectedSkills, setSelectedSkills)} 
//                   />
//                   <label htmlFor={`skill-${skill}`}>{skill}</label>
//                 </div>
//               ))}
//               {filterOptions.skills.length > 5 && (
//                 <span className="FindTalent-view-more-link" onClick={() => setShowAllSkills(!showAllSkills)}>
//                   {showAllSkills ? "View Less" : `View More (${filterOptions.skills.length - 5}+)`}
//                 </span>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Talent List */}
//         <div className="FindTalent-talent-list">
//           {filteredTalent.length > 0 ? (
//             filteredTalent.map((user, index) => (
//               <ProfileCard 
//                 key={user.id || index} 
//                 user={user} 
//                 showActions={true}
//                 onConnect={() => handleConnect(user)}
//               />
//             ))
//           ) : (
//             <div className="FindTalent-no-results">
//               <h3>No job seekers found</h3>
//               <p>Try adjusting your filters or search term</p>
//               <button className="FindTalent-clear-filters-btn" onClick={clearFilters}>
//                 Clear all filters
//               </button>
//             </div>
//           )}
          
//           {filteredTalent.length > 0 && filteredTalent.length >= 10 && (
//             <button className="FindTalent-load-more-btn">Load More</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }; 

import React, { useMemo, useState, useEffect } from 'react';
import './FindTalent.css';
import { useJobs } from '../JobContext';
import { ProfileCard } from './ProfileCard';
import { useNavigate } from 'react-router-dom';


export const FindTalent = () => {
  // Get data from JobContext
  const { Alluser } = useJobs();
  const navigate = useNavigate();
  
  // States for Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedEdu, setSelectedEdu] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [maxExp, setMaxExp] = useState(10);

  // States for "View More" toggles
  const [showAllLangs, setShowAllLangs] = useState(false);
  const [showAllEdu, setShowAllEdu] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);



    // ✅ Filter out employers from Alluser
  const jobseekersOnly = useMemo(() => {
    if (!Alluser || Alluser.length === 0) return [];
    
    // Filter based on user_type
    return Alluser.filter(user => {
      // Check user_type in different possible locations
      const userType = user.user?.user_type || 
                      user.user_type || 
                      user.role ||
                      user.profile?.user_type;
      
      // Keep only jobseekers (exclude employers)
      return userType !== 'employer';
    });
  }, [Alluser]);

  // Debug: Log filtered data
  useEffect(() => {
    console.log("Original Alluser count:", Alluser?.length);
    console.log("Jobseekers only count:", jobseekersOnly?.length);
    
    if (jobseekersOnly && jobseekersOnly.length > 0) {
      console.log("First jobseeker:", jobseekersOnly[0]);
    }
  }, [Alluser, jobseekersOnly]);


  // Debug: Log Alluser data structure
  useEffect(() => {
    if (Alluser && Alluser.length > 0) {
      console.log("FindTalent - Alluser data:", Alluser);
      console.log("Sample user structure:", Alluser[0]);
      console.log("Sample user profile:", Alluser[0].profile);
      console.log("Sample user languages:", Alluser[0].profile?.languages);
      console.log("Sample user educations:", Alluser[0].profile?.educations);
      console.log("Sample user skills:", Alluser[0].profile?.skills);
    }
  }, [Alluser]);


  // ✅ Add authentication check
  useEffect(() => {
    const userType = localStorage.getItem('user_type');
    if (userType !== 'employer') {
      // Redirect jobseekers away from this page
      navigate('/Job-portal/jobseeker/');
    }
  }, [navigate]);

  // --- Dynamic Data Extraction based on backend structure ---
  const filterOptions = useMemo(() => {
    const languages = new Set();
    const education = new Set();
    const skills = new Set();

    if (!Alluser || Alluser.length === 0) {
      return { languages: [], education: [], skills: [] };
    }

    Alluser.forEach(user => {
      // Check profile.languages first (data is in profile)
      if (user.profile?.languages && Array.isArray(user.profile.languages)) {
        user.profile.languages.forEach(lang => {
          if (lang.name) languages.add(lang.name);
        });
      }
      
      // Check profile.educations
      if (user.profile?.educations && Array.isArray(user.profile.educations)) {
        user.profile.educations.forEach(edu => {
          if (edu.degree) education.add(edu.degree);
        });
      }
      
      // Check profile.skills
      if (user.profile?.skills && Array.isArray(user.profile.skills)) {
        user.profile.skills.forEach(skill => {
          if (skill.name) skills.add(skill.name);
        });
      }
      
      // Also check direct properties as fallback
      if (user.languages && Array.isArray(user.languages)) {
        user.languages.forEach(lang => {
          if (lang.name) languages.add(lang.name);
        });
      }
      
      if (user.educations && Array.isArray(user.educations)) {
        user.educations.forEach(edu => {
          if (edu.degree) education.add(edu.degree);
        });
      }
      
      if (user.skills && Array.isArray(user.skills)) {
        user.skills.forEach(skill => {
          if (skill.name) skills.add(skill.name);
        });
      }
    });

    console.log("Extracted languages:", Array.from(languages));
    console.log("Extracted education:", Array.from(education));
    console.log("Extracted skills:", Array.from(skills));

    return {
      languages: Array.from(languages).filter(Boolean).sort(),
      education: Array.from(education).filter(Boolean).sort(),
      skills: Array.from(skills).filter(Boolean).sort(),
    };
  }, [Alluser]);

  // Handle filter changes
  const handleFilterChange = (value, state, setState) => {
    setState(
      state.includes(value) 
        ? state.filter(i => i !== value) 
        : [...state, value]
    );
  };

  // Filter talent based on all criteria
  const filteredTalent = useMemo(() => {
    if (!Alluser || Alluser.length === 0) return [];

    return Alluser.filter((user) => {
      // Extract skills names from profile first
      const userSkills = user.profile?.skills?.map(s => s.name) || 
                        user.skills?.map(s => s.name) || [];
      
      // Extract language names from profile first
      const userLanguages = user.profile?.languages?.map(l => l.name) || 
                           user.languages?.map(l => l.name) || [];
      
      // Extract education degrees from profile first
      const userEducation = user.profile?.educations?.map(e => e.degree) || 
                           user.educations?.map(e => e.degree) || [];

      // Search term matching
      const searchLower = searchTerm.toLowerCase().trim();
      let matchesSearch = true;
      
      if (searchLower) {
        const searchableText = [
          user.full_name || '',
          user.current_job_title || user.profile?.current_job_title || '',
          user.current_company || user.profile?.current_company || '',
          ...userSkills,
          ...userEducation
        ].join(' ').toLowerCase();
        
        matchesSearch = searchableText.includes(searchLower);
      }

      // Language matching
      const matchesLanguage = selectedLanguages.length === 0 ||
        userLanguages.some(lang => selectedLanguages.includes(lang));

      // Education matching
      const matchesEducation = selectedEdu.length === 0 ||
        userEducation.some(edu => selectedEdu.includes(edu));

      // Skills matching
      const matchesSkills = selectedSkills.length === 0 ||
        selectedSkills.every(skill => userSkills.includes(skill));

      // Experience calculation
      let expNumber = 0;
      if (user.total_experience_years !== undefined) {
        expNumber = parseFloat(user.total_experience_years) || 0;
      } else if (user.profile?.total_experience_years) {
        expNumber = parseFloat(user.profile.total_experience_years) || 0;
      }
      
      const matchesExperience = expNumber <= maxExp;

      return matchesSearch && matchesLanguage && matchesEducation && matchesSkills && matchesExperience;
    });
  }, [searchTerm, selectedLanguages, selectedEdu, selectedSkills, maxExp, Alluser]);

  // Helper to get visible items for "View More"
  const getVisibleItems = (items, showAll) => {
    if (!items || items.length === 0) return [];
    return showAll ? items : items.slice(0, 5);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedLanguages([]);
    setSelectedEdu([]);
    setSelectedSkills([]);
    setMaxExp(10);
    setSearchTerm('');
    setShowAllLangs(false);
    setShowAllEdu(false);
    setShowAllSkills(false);
  };

  return (
    <div className="talent-page-container">
      {/* Search Section */}
      <section className="FindTalent-search-section"> 
        <div className="FindTalent-search-wrapper">
          <input
            type="text"
            placeholder="Search by Skills, Education, or Job Title"
            className="FindTalent-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="FindTalent-search-button">Search</button>
        </div>
        <h1 style={{ marginTop: "40px" }} className="FindTalent-results-title">
          Jobseekers based on your search ({filteredTalent.length})
        </h1>
      </section>

      <div className="FindTalent-layout-body">
        {/* Filters Sidebar */}
        <div className="FindTalent-filters-sidebar">
          <div className="FindTalent-filter-top">
            <span className="FindTalent-filter-label">Apply filters</span>
            <span className="FindTalent-clear-btn" onClick={clearFilters}>
              Clear all
            </span>
          </div>

          {/* Languages Filter */}
          {filterOptions.languages.length > 0 && (
            <div className="FindTalent-filter-category">
              <h3>Languages</h3>
              {getVisibleItems(filterOptions.languages, showAllLangs).map(lang => (
                <div key={lang} className="FindTalent-checkbox-item">
                  <input 
                    type="checkbox" 
                    id={`lang-${lang}`}
                    checked={selectedLanguages.includes(lang)} 
                    onChange={() => handleFilterChange(lang, selectedLanguages, setSelectedLanguages)} 
                  />
                  <label htmlFor={`lang-${lang}`}>{lang}</label>
                </div>
              ))}
              {filterOptions.languages.length > 5 && (
                <span className="FindTalent-view-more-link" onClick={() => setShowAllLangs(!showAllLangs)}>
                  {showAllLangs ? "View Less" : `View More (${filterOptions.languages.length - 5}+)`}
                </span>
              )}
            </div>
          )}

          {/* Experience Filter */}
          <div className="FindTalent-filter-category">
            <h3>Experience (Max: {maxExp} years)</h3>
            <input 
              type="range" 
              min="0" 
              max="20" 
              value={maxExp} 
              onChange={(e) => setMaxExp(parseInt(e.target.value))} 
              className="FindTalent-exp-slider" 
            />
            <div className="FindTalent-range-values">
              <span>0 yrs</span>
              <span>{maxExp} yrs</span>
            </div>
          </div>

          {/* Education Filter */}
          {filterOptions.education.length > 0 && (
            <div className="FindTalent-filter-category">
              <h3>Education</h3>
              {getVisibleItems(filterOptions.education, showAllEdu).map(edu => (
                <div key={edu} className="FindTalent-checkbox-item">
                  <input 
                    type="checkbox" 
                    id={`edu-${edu}`}
                    checked={selectedEdu.includes(edu)} 
                    onChange={() => handleFilterChange(edu, selectedEdu, setSelectedEdu)} 
                  />
                  <label htmlFor={`edu-${edu}`}>{edu}</label>
                </div>
              ))}
              {filterOptions.education.length > 5 && (
                <span className="FindTalent-view-more-link" onClick={() => setShowAllEdu(!showAllEdu)}>
                  {showAllEdu ? "View Less" : `View More (${filterOptions.education.length - 5}+)`}
                </span>
              )}
            </div>
          )}

          {/* Skills Filter */}
          {filterOptions.skills.length > 0 && (
            <div className="FindTalent-filter-category">
              <h3>Skills</h3>
              {getVisibleItems(filterOptions.skills, showAllSkills).map(skill => (
                <div key={skill} className="FindTalent-checkbox-item">
                  <input 
                    type="checkbox" 
                    id={`skill-${skill}`}
                    checked={selectedSkills.includes(skill)} 
                    onChange={() => handleFilterChange(skill, selectedSkills, setSelectedSkills)} 
                  />
                  <label htmlFor={`skill-${skill}`}>{skill}</label>
                </div>
              ))}
              {filterOptions.skills.length > 5 && (
                <span className="FindTalent-view-more-link" onClick={() => setShowAllSkills(!showAllSkills)}>
                  {showAllSkills ? "View Less" : `View More (${filterOptions.skills.length - 5}+)`}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Talent List */}
        <div className="FindTalent-talent-list">
          {filteredTalent.length > 0 ? (
            filteredTalent.map((user, index) => (
              <ProfileCard 
                key={user.id || index} 
                user={user} 
                showActions={true}
              />
            ))
          ) : (
            <div className="FindTalent-no-results">
              <h3>No job seekers found</h3>
              <p>Try adjusting your filters or search term</p>
              <button className="FindTalent-clear-filters-btn" onClick={clearFilters}>
                Clear all filters
              </button>
            </div>
          )}
          
          {filteredTalent.length > 0 && filteredTalent.length >= 10 && (
            <button className="FindTalent-load-more-btn">Load More</button>
          )}
        </div>
      </div>
    </div>
  );
};