'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CareerForm({ jobs = [] }) {
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validExts = ['.pdf', '.doc', '.docx'];
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (!validExts.includes(ext)) {
        setErrorMessage('Please upload a PDF, DOC, or DOCX document.');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      // Validate file size (under 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size must be less than 10MB.');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setErrorMessage('');
      setSelectedFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      fileInputRef.current.files = e.dataTransfer.files;
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Verify honeypot
    if (formData.get('_hp')) {
      // Bot detected: simulate success silently
      setStatus('success');
      return;
    }

    try {
      const res = await fetch('https://rgstaffhub.reddingtonglobal.com/api/recruitment/public/apply', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit your application. Please try again.');
      }
      setStatus('success');
    } catch (err) {
      setErrorMessage(err.message || 'Submission failed. Please check your network and try again.');
      setStatus('error');
    }
  }

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setSelectedJob('');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="career-form-card" id="apply-portal">
      <div className="career-form-card__header">
        <div className="badge-tag">Apply Directly</div>
        <h3 className="career-form-card__title">Submit Your Application</h3>
        <p className="career-form-card__sub">
          Ready to make your mark? Fill out the details below and attach your latest resume.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            className="career-status career-status--success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <div className="career-status__icon-wrap">
              <svg className="career-status__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 12.5l3.5 3.5 6.5-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4>Application Received!</h4>
            <p>
              Thank you for applying to <strong>Reddington Global</strong>. Our talent acquisition team will review your qualifications and reach out if your profile matches our current opportunities.
            </p>
            <button type="button" onClick={handleReset} className="btn btn--gold" style={{ marginTop: '20px' }}>
              Submit Another Application
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="ct-form career-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Error Notification */}
            {status === 'error' && errorMessage && (
              <div className="career-error-banner" role="alert">
                <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Name Fields */}
            <div className="ct-form__row">
              <div className="ff">
                <input
                  id="careerFirstName"
                  name="firstName"
                  type="text"
                  placeholder=" "
                  autoComplete="given-name"
                  required
                />
                <label htmlFor="careerFirstName">First Name *</label>
                <span className="ff__bar" aria-hidden="true"></span>
              </div>

              <div className="ff">
                <input
                  id="careerLastName"
                  name="lastName"
                  type="text"
                  placeholder=" "
                  autoComplete="family-name"
                  required
                />
                <label htmlFor="careerLastName">Last Name *</label>
                <span className="ff__bar" aria-hidden="true"></span>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="ct-form__row">
              <div className="ff">
                <input
                  id="careerEmail"
                  name="email"
                  type="email"
                  placeholder=" "
                  autoComplete="email"
                  required
                />
                <label htmlFor="careerEmail">Email Address *</label>
                <span className="ff__bar" aria-hidden="true"></span>
              </div>

              <div className="ff">
                <input
                  id="careerPhone"
                  name="phone"
                  type="tel"
                  placeholder=" "
                  autoComplete="tel"
                  required
                />
                <label htmlFor="careerPhone">Phone Number *</label>
                <span className="ff__bar" aria-hidden="true"></span>
              </div>
            </div>

            {/* Dynamic Jobs Dropdown */}
            <div className="ff ct-form__select-wrap">
              <select
                id="careerJobAppliedFor"
                name="jobAppliedFor"
                required
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className={selectedJob ? 'has-value' : ''}
              >
                <option value="" disabled hidden></option>
                {jobs && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <option key={job._id} value={job._id}>
                      {job.title} ({job.department})
                    </option>
                  ))
                ) : null}
                <option value="General Application">General Application (All Departments)</option>
              </select>
              <label htmlFor="careerJobAppliedFor">Position Applied For *</label>
              <span className="ff__bar" aria-hidden="true"></span>
            </div>

            {/* Resume Upload Dropzone */}
            <div className="career-upload-group">
              <label className="career-upload-label">Resume / Curriculum Vitae *</label>
              <div
                className={`career-upload-box ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  id="careerResume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  required
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />

                {selectedFile ? (
                  <div className="career-file-info">
                    <div className="career-file-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <div className="career-file-details">
                      <span className="career-file-name">{selectedFile.name}</span>
                      <span className="career-file-size">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <button
                      type="button"
                      className="career-file-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      title="Remove file"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="career-upload-prompt">
                    <svg
                      className="career-upload-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      width="32"
                      height="32"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p className="career-upload-text">
                      <strong>Click to upload</strong> or drag and drop your resume
                    </p>
                    <p className="career-upload-hint">PDF, DOC, or DOCX (Max 10MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Honeypot for bots (hidden) */}
            <input
              type="text"
              name="_hp"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'submitting'}
              className="btn btn--gold career-submit-btn"
              whileHover={{ scale: status === 'submitting' ? 1 : 1.02, y: status === 'submitting' ? 0 : -2 }}
              whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
            >
              {status === 'submitting' ? (
                <>
                  <span className="career-spinner" aria-hidden="true"></span>
                  Submitting Application...
                </>
              ) : (
                <>
                  Apply Now
                  <svg className="ct-form__arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 10h12M11 5l5 5-5 5" />
                  </svg>
                </>
              )}
            </motion.button>

            <p className="ct-form__note">
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 110 1.5A.75.75 0 018 4zm1 8H7v-5h2v5z" />
              </svg>
              Your data is processed securely in accordance with our strict privacy and confidentiality standards.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
