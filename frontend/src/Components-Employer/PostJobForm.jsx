import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EHeader } from './EHeader';
import { Footer } from '../Components-LandingPage/Footer';
import './PostJobForm.css';
 
export const PostJobForm = () => {
  const navigate = useNavigate();
 
  const categoryOptions = ["Aerospace & Defense", "Ai/MI", "Analytics", "Artificial Intelligence", "Automotive", "Big Data", "Biotechnology", "Business Consulting", "Business Intelligence", "Cloud Computing", "Cloud Services", "Construction", "Consulting", "Consumer Goods", "Consumer Tech", "Corporate", "Corporate Functions", "Customer Support", "Cybersecurity", "Data Infrastructure", "Data Science", "Design", "Digital Marketing", "Digital Media", "E-Commerce", "Ed-Tech", "Energy", "Enterprise Software", "Entertainment", "Finance", "Financial Services", "Fintech", "Fmcg", "Healthcare", "Hospital", "Hr Services", "Human Resources", "Internet", "It Consulting", "It Networking", "IT Services", "Logistics", "Marketing", "Marketing & Advertising", "Martech", "Mobile App Development", "Mobile Development", "Pharmaceutical", "Pharma", "Product Development", "Project Management", "Real Estate", "Recruitment", "Regional Sales", "Renewable Power", "Research", "Retail", "Retail Tech", "Saas", "Sales", "Site Reliability Engineering", "Software Development", "Software Product", "Software Testing", "Subscription Service", "Supply Chain", "Technology", "Telecommunications"];
 
  const educationOptions = [
    "BS", "B.A", "CA", "B.Ed", "M.Com", "B.Sc", "MCA", "BCA", "LLM", "MS/M.Sc", "Diploma", "B.Com", "M.Tech", "MBA/PGDM", "PG Diploma", "B.B.A/ B.M.S", "Medical-MS/MD", "B.Tech/B.E.", "Any Graduate", "Other Post Graduate", "ITI Certification", "Any Postgraduate", "Graduation Not Required", "Post Graduation Not Required", "Bachelor Of Science", "Business Economics"
  ];
 
  const departmentOptions = [
    "Engineering", "Marketing", "Sales", "Human Resources", "Finance",
    "Operations", "Product Management", "Customer Success", "Design",
    "Data Science", "Legal", "Information Technology", "Administrative"
  ];
 
  const [formData, setFormData] = useState({
    job_title: '',  // Changed from jobTitle to match backend
    industry_type: [],  // Changed from category to match backend
    department: [],
    education: [],
    work_type: '',  // Changed from workType to match backend
    shift: '',
    work_duration: '',  // Changed from workDuration to match backend
    salary: '',
    experience: '',
    location: [],  // Changed to array
    openings: '',
    job_category: '',  // Changed from jobCategory to string (not array)
    key_skills: [],  // Changed from keySkills to array
    job_highlights: [''],  // Changed from jobHighlights to match backend
    job_description: '',  // Changed from jobDescription to match backend
    responsibilities: ['']
  });
 
  const [skillsList, setSkillsList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [errors, setErrors] = useState({});
 
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };
 
  const validateForm = () => {
    const newErrors = {};
 
    if (!formData.job_title.trim()) newErrors.job_title = "Job title is required";
    if (formData.industry_type.length === 0) newErrors.industry_type = "Industrial type is required";
    if (formData.department.length === 0) newErrors.department = "Department is required";
    if (!formData.work_type) newErrors.work_type = "Work type is required";
    if (!formData.shift) newErrors.shift = "Shift is required";
    if (!formData.work_duration.trim()) newErrors.work_duration = "Work duration is required";
    if (!formData.salary.trim()) newErrors.salary = "Salary is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (locationList.length === 0) newErrors.location = "At least one Location is required";
    if (!formData.openings.trim()) newErrors.openings = "Openings are required";
    if (!formData.job_category) newErrors.job_category = "Job category is required";
    if (formData.education.length === 0) newErrors.education = "Education is required";
    if (skillsList.length === 0) newErrors.key_skills = "At least one key skill is required";
    if (!formData.job_highlights[0].trim()) newErrors.job_highlights = "At least one highlight is required";
    if (!formData.job_description.trim()) newErrors.job_description = "Job description is required";
    if (!formData.responsibilities[0].trim()) newErrors.responsibilities = "At least one responsibility is required";
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleCheckboxChange = (name, value, allOptions = []) => {
    setErrors({ ...errors, [name]: "" });
    setFormData(prev => {
      const currentList = prev[name] || [];
      if (value === "all") {
        const isAllSelected = currentList.length === allOptions.length;
        return { ...prev, [name]: isAllSelected ? [] : allOptions };
      }
      const newList = currentList.includes(value)
        ? currentList.filter(i => i !== value)
        : [...currentList, value];
      return { ...prev, [name]: newList };
    });
  };
 
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setErrors({ ...errors, [name]: "" });
 
    if (type === 'radio') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
 
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.name === 'key_skills_input') {
      e.preventDefault();
      const newSkill = e.target.value.trim();
      if (newSkill && !skillsList.includes(newSkill)) {
        setSkillsList([...skillsList, newSkill]);
        setFormData({ ...formData, key_skills_input: '' });
        setErrors({ ...errors, key_skills: "" });
      }
    }
  };
 
  const removeSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter(skill => skill !== skillToRemove));
  };
 
  const handleLocationKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.name === 'location_input') {
      e.preventDefault();
      const newLocation = e.target.value.trim();
      if (newLocation && !locationList.includes(newLocation)) {
        setLocationList([...locationList, newLocation]);
        setFormData({ ...formData, location_input: '' });
        setErrors({ ...errors, location: "" });
      }
    }
  };
 
  const removeLocation = (locationToRemove) => {
    setLocationList(locationList.filter(location => location !== locationToRemove));
  };
 
  const handleHighlightChange = (index, value) => {
    const newHighlights = [...formData.job_highlights];
    newHighlights[index] = value;
    setFormData({ ...formData, job_highlights: newHighlights });
    setErrors({ ...errors, job_highlights: "" });
  };
 
  const addHighlightField = () => {
    setFormData({
      ...formData,
      job_highlights: [...formData.job_highlights, ""]
    });
  };
 
  const handleResponsibilityChange = (index, value) => {
    const updatedRes = [...formData.responsibilities];
    updatedRes[index] = value;
    setFormData({ ...formData, responsibilities: updatedRes });
    setErrors({ ...errors, responsibilities: "" });
  };
 
  const addResponsibilityField = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, ""]
    });
  };
 
  const handleSubmit = (e) => {
  if (e) e.preventDefault();
  if (!validateForm()) {
    return false;
  }
 
  // Convert location array to comma-separated string
  const locationString = locationList.join(', ');
 
  // Prepare data for backend - match PostAJob model exactly
  const submissionData = {
    job_title: formData.job_title,
    industry_type: formData.industry_type,
    department: formData.department,
    work_type: formData.work_type,
    shift: formData.shift,
    work_duration: formData.work_duration,
    salary: parseFloat(formData.salary) || 0,
    experience: formData.experience,
    location: locationString,  // Send as string, not array
    openings: parseInt(formData.openings) || 0,
    job_category: formData.job_category,
    education: formData.education,
    key_skills: skillsList,
    job_highlights: formData.job_highlights.filter(h => h && h.trim()),
    job_description: formData.job_description,
    responsibilities: formData.responsibilities.filter(r => r && r.trim())
  };
 
  console.log('📤 Submitting job data:', submissionData);
  navigate('/Job-portal/Employer/PostJobpreview', { state: submissionData });
};
 
  return (
    <>
      <div className="jobpost-page-title">
        <main className="jobpost-main-content">
          <header className="jobpost-form-header">
            <h1>Post a Job</h1>
            <p>Complete the steps below to reach thousands of qualified candidates</p>
          </header>
 
          <div className="jobpost-form-container">
            <form className="jobpost-form" onSubmit={handleSubmit}>
              <div className="jobpost-form-row">
                <label className="jobpost-label">Job title</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <input className={`jobpost-input ${errors.job_title ? "input-error" : ""}`} type="text" name="job_title" placeholder="e.g., Fullstack Developer" value={formData.job_title} onChange={handleChange} />
                  {errors.job_title && <span className="error-msg">{errors.job_title}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row jobpost-top-align">
                <label className="jobpost-label">Industrial type</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className={`jobpost-dropdown ${openDropdown === 'industry_type' ? 'jobpost-is-active' : ''} ${errors.industry_type ? "input-error" : ""}`}>
                    <div className="jobpost-dropdown-trigger" onClick={() => toggleDropdown('industry_type')}>
                      {formData.industry_type.length > 0 ? formData.industry_type.join(', ') : 'Select'}
                      <i className="fas fa-angle-down jobpost-arrow"></i>
                    </div>
                    <div className="jobpost-dropdown-panel">
                      <label className="jobpost-select-all">
                        <input type="checkbox" onChange={() => handleCheckboxChange('industry_type', 'all', categoryOptions)}
                          checked={formData.industry_type.length === categoryOptions.length && categoryOptions.length > 0} />
                        <strong>Select all</strong>
                      </label>
                      <div className="jobpost-options-grid">
                        {categoryOptions.map(cat => (
                          <label key={cat} className="jobpost-option-item">
                            <input type="checkbox" checked={formData.industry_type.includes(cat)} onChange={() => handleCheckboxChange('industry_type', cat)} /> {cat}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  {errors.industry_type && <span className="error-msg">{errors.industry_type}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row jobpost-top-align">
                <label className="jobpost-label">Department</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className={`jobpost-dropdown ${openDropdown === 'department' ? 'jobpost-is-active' : ''} ${errors.department ? "input-error" : ""}`}>
                    <div className="jobpost-dropdown-trigger" onClick={() => toggleDropdown('department')}>
                      {formData.department.length > 0 ? formData.department.join(', ') : 'Select'}
                      <i className="fas fa-angle-down jobpost-arrow"></i>
                    </div>
                    <div className="jobpost-dropdown-panel">
                      <label className="jobpost-select-all">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange('department', 'all', departmentOptions)}
                          checked={formData.department.length === departmentOptions.length}
                        />
                        <strong>Select all Departments</strong>
                      </label>
                      <div className="jobpost-options-grid">
                        {departmentOptions.map(dept => (
                          <label key={dept} className="jobpost-option-item">
                            <input
                              type="checkbox"
                              checked={formData.department.includes(dept)}
                              onChange={() => handleCheckboxChange('department', dept)}
                            />
                            {dept}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  {errors.department && <span className="error-msg">{errors.department}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row">
                <label className="jobpost-label">Work type</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className={`jobpost-radio-container ${errors.work_type ? "input-error" : ""}`}>
                    <label className="jobpost-radio-label">
                      <input type="radio" name="work_type" value="Hybrid" checked={formData.work_type === 'Hybrid'} onChange={handleChange} /> Hybrid
                    </label>
                    <label className="jobpost-radio-label">
                      <input type="radio" name="work_type" value="Remote" checked={formData.work_type === 'Remote'} onChange={handleChange} /> Remote
                    </label>
                    <label className="jobpost-radio-label">
                      <input type="radio" name="work_type" value="On-site" checked={formData.work_type === 'On-site'} onChange={handleChange} /> On-site
                    </label>
                  </div>
                  {errors.work_type && <span className="error-msg">{errors.work_type}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row">
                <label className="jobpost-label">Shift</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className={`jobpost-radio-container ${errors.shift ? "input-error" : ""}`}>
                    <label className="jobpost-radio-label">
                      <input type="radio" name="shift" value="General" checked={formData.shift === 'General'} onChange={handleChange} /> General
                    </label>
                    <label className="jobpost-radio-label">
                      <input type="radio" name="shift" value="Night" checked={formData.shift === 'Night'} onChange={handleChange} /> Night
                    </label>
                    <label className="jobpost-radio-label">
                      <input type="radio" name="shift" value="Rotational" checked={formData.shift === 'Rotational'} onChange={handleChange} /> Rotational
                    </label>
                  </div>
                  {errors.shift && <span className="error-msg">{errors.shift}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row">
                <label className="jobpost-label">Work duration</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <input className={`jobpost-input ${errors.work_duration ? "input-error" : ""}`} type="text" name="work_duration" placeholder='e.g., "3 Months", "6 Months", "permanent"' value={formData.work_duration} onChange={handleChange} />
                  {errors.work_duration && <span className="error-msg">{errors.work_duration}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row">
                <label className="jobpost-label">Salary</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <input className={`jobpost-input ${errors.salary ? "input-error" : ""}`} type="number" name="salary" placeholder="Max Annual CTC in LPA" value={formData.salary} onChange={handleChange} step="0.5" />
                  {errors.salary && <span className="error-msg">{errors.salary}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row">
                <label className="jobpost-label">Experience</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <input className={`jobpost-input ${errors.experience ? "input-error" : ""}`} type="text" name="experience" placeholder="Minimum years required" value={formData.experience} onChange={handleChange} />
                  {errors.experience && <span className="error-msg">{errors.experience}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row">
                <label className="jobpost-label">Location</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className={`jobpost-skills-titile ${errors.location ? "input-error" : ""}`}>
                    <input
                      className="jobpost-input skills-input"
                      style={errors.location ? { borderColor: '#d93025' } : {}}
                      type="text"
                      name="location_input"
                      placeholder="City name (e.g., Bengaluru) - Press Enter to add multiple"
                      value={formData.location_input || ''}
                      onChange={(e) => setFormData({ ...formData, location_input: e.target.value })}
                      onKeyDown={handleLocationKeyDown}
                    />
                    <div className="jobpost-tags-area">
                      {locationList.map((location, index) => (
                        <span key={index} className="jobpost-tag">
                          {location} <button type="button" onClick={() => removeLocation(location)}>×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                  {errors.location && <span className="error-msg">{errors.location}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row">
                <label className="jobpost-label">Openings</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <input className={`jobpost-input ${errors.openings ? "input-error" : ""}`} type="number" name="openings" placeholder="Total vacant positions" value={formData.openings} onChange={handleChange} min="1" />
                  {errors.openings && <span className="error-msg">{errors.openings}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row">
                <label className="jobpost-label">Job category</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className={`jobpost-radio-container ${errors.job_category ? "input-error" : ""}`}>
                    <label className="jobpost-radio-label">
                      <input type="radio" name="job_category" value="Full-time" checked={formData.job_category === 'Full-time'} onChange={handleChange} /> Full-time
                    </label>
                    <label className="jobpost-radio-label">
                      <input type="radio" name="job_category" value="Internship" checked={formData.job_category === 'Internship'} onChange={handleChange} /> Internship
                    </label>
                  </div>
                  {errors.job_category && <span className="error-msg">{errors.job_category}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row jobpost-top-align">
                <label className="jobpost-label">Education</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className={`jobpost-dropdown ${openDropdown === 'education' ? 'jobpost-is-active' : ''} ${errors.education ? "input-error" : ""}`}>
                    <div className="jobpost-dropdown-trigger" onClick={() => toggleDropdown('education')}>
                      {formData.education.length > 0 ? formData.education.join(', ') : 'Select Education'}
                      <i className="fas fa-angle-down jobpost-arrow"></i>
                    </div>
                    <div className="jobpost-dropdown-panel">
                      <div className="jobpost-options-grid">
                        {educationOptions.map(edu => (
                          <label key={edu} className="jobpost-option-item">
                            <input type="checkbox" checked={formData.education.includes(edu)} onChange={() => handleCheckboxChange('education', edu)} /> {edu}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  {errors.education && <span className="error-msg">{errors.education}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row">
                <label className="jobpost-label">Key skills</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className={`jobpost-skills-titile ${errors.key_skills ? "input-error" : ""}`}>
                    <input
                      className="jobpost-input skills-input"
                      style={errors.key_skills ? { borderColor: '#d93025' } : {}}
                      type="text"
                      name="key_skills_input"
                      placeholder="Press Enter to add skills (e.g., Python, AWS, React etc...)"
                      value={formData.key_skills_input || ''}
                      onChange={(e) => setFormData({ ...formData, key_skills_input: e.target.value })}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="jobpost-tags-area">
                      {skillsList.map((skill, index) => (
                        <span key={index} className="jobpost-tag">
                          {skill} <button type="button" onClick={() => removeSkill(skill)}>×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                  {errors.key_skills && <span className="error-msg">{errors.key_skills}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row">
                <label className="jobpost-label">Job highlights</label>
                <div className="highlights-container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {formData.job_highlights.map((highlight, index) => (
                    <div key={index} className="jobpost-input-icon-titile">
                      <input
                        className={`jobpost-input ${errors.job_highlights && index === 0 ? "input-error" : ""}`}
                        type="text"
                        placeholder="Add top 3-5 selling points of the role"
                        value={highlight}
                        onChange={(e) => handleHighlightChange(index, e.target.value)}
                      />
                      {index === formData.job_highlights.length - 1 && (
                        <span className="jobpost-plus-icon" onClick={addHighlightField}>+</span>
                      )}
                    </div>
                  ))}
                  {errors.job_highlights && <span className="error-msg">{errors.job_highlights}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row">
                <label className="jobpost-label">Job description</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <textarea className={`jobpost-textarea ${errors.job_description ? "input-error" : ""}`} name="job_description" placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity unique.... " value={formData.job_description} onChange={handleChange} rows="6"></textarea>
                  {errors.job_description && <span className="error-msg">{errors.job_description}</span>}
                </div>
              </div>
 
              <div className="jobpost-form-row">
                <label className="jobpost-label">Responsibilities</label>
                <div className="responsibilities-list" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {formData.responsibilities.map((res, index) => (
                    <div key={index} className="jobpost-input-icon-titile">
                      <input
                        className={`jobpost-input ${errors.responsibilities && index === 0 ? "input-error" : ""}`}
                        type="text"
                        placeholder="Specific day-to-day tasks"
                        value={res}
                        onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                      />
                      {index === formData.responsibilities.length - 1 && (
                        <span className="jobpost-plus-icon" onClick={addResponsibilityField}>+</span>
                      )}
                    </div>
                  ))}
                  {errors.responsibilities && <span className="error-msg">{errors.responsibilities}</span>}
                </div>
              </div>
            </form>
          </div>
 
          <div className="jobpost-actions">
            <button type="button" className="jobpost-btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
            <button type="button" className="jobpost-btn-preview" onClick={handleSubmit}>Preview</button>
          </div>
        </main>
      </div>
    </>
  );
};