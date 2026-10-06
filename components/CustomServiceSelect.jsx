'use client';

import React, { useState, useRef, useEffect } from 'react';

export const SERVICE_CATEGORIES = [
  {
    category: 'BPO and Customer Operations',
    options: [
      { value: 'Customer Services and Support', label: 'Customer Services and Support' },
      { value: 'Back Office Operations', label: 'Back Office Operations' },
      { value: 'Sales and Revenue Operations', label: 'Sales and Revenue Operations' },
      { value: 'Performance Management Consultancy', label: 'Performance Management Consultancy' },
      { value: 'Recruitment and Hiring Solutions', label: 'Recruitment and Hiring Solutions' },
      { value: 'KYC / Operations', label: 'KYC / Operations' },
      { value: '24/7 Floor Support', label: '24/7 Floor Support' },
    ],
  },
  {
    category: 'Software Development and IT Solutions',
    options: [
      { value: 'SaaS and IT Digital Solutions', label: 'SaaS and IT Digital Solutions' },
      { value: 'Digital Marketing and Growth', label: 'Digital Marketing and Growth' },
      { value: 'Web / SaaS Development', label: 'Web / SaaS Development' },
      { value: 'Custom Applications and APIs', label: 'Custom Applications and APIs' },
      { value: 'Cloud Infrastructure and Integrations', label: 'Cloud and Integrations' },
    ],
  },
  {
    category: 'Bookkeeping and Accounting',
    options: [
      { value: 'Bookkeeping and Accountancy', label: 'Bookkeeping and Accountancy' },
      { value: 'Payroll and Compensation Management', label: 'Payroll and Compensation Management' },
      { value: 'Financial Account Reconciliation', label: 'Account Reconciliation' },
      { value: 'Statutory Tax Support (GST and TDS)', label: 'Tax Support (GST and TDS)' },
      { value: 'Executive Financial Reporting', label: 'Executive Financial Reporting' },
    ],
  },
  {
    category: 'Enterprise and Global Delivery',
    options: [
      { value: 'Global Delivery Partner Inquiry', label: 'Global Delivery Partner Inquiry' },
      { value: 'Other Enterprise Inquiries', label: 'Other Enterprise Inquiries' },
    ],
  },
];

const normalizeStr = (s) =>
  (s || '')
    .toLowerCase()
    .replace(/^(consultancy|bpo)\s*—\s*/i, '')
    .replace(/&amp;/g, 'and')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]/g, '');

export default function CustomServiceSelect({
  value,
  onChange,
  name = 'service',
  id = 'fService',
  label = 'Service Interested In *',
  variant = 'floating', // 'floating' | 'box'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (serviceVal) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: serviceVal,
        },
      });
    }
    setIsOpen(false);
  };

  // Find matching option label
  const normVal = normalizeStr(value);
  let matchedLabel = null;
  for (const group of SERVICE_CATEGORIES) {
    for (const opt of group.options) {
      if (opt.value === value || normalizeStr(opt.value) === normVal) {
        matchedLabel = opt.label;
        break;
      }
    }
    if (matchedLabel) break;
  }

  const displayLabel =
    matchedLabel ||
    (value
      ? value
          .replace(/^(Consultancy|BPO)\s*—\s*/i, '')
          .replace(/&amp;/g, 'and')
          .replace(/&/g, 'and')
      : 'Select Service');

  if (variant === 'box') {
    return (
      <div
        className={`svc-custom-select-wrap ${isOpen ? 'is-open' : ''}`}
        ref={containerRef}
      >
        {label && <label htmlFor={id} className="svc-custom-label">{label}</label>}
        <button
          id={id}
          type="button"
          className={`svc-custom-trigger ${isOpen ? 'is-open' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="svc-custom-val">{displayLabel}</span>
          <svg
            className={`svc-custom-chevron ${isOpen ? 'is-open' : ''}`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <input type="hidden" name={name} value={value} />

        {isOpen && (
          <div className="custom-select-menu custom-select-menu--box" role="listbox">
            {SERVICE_CATEGORIES.map((cat, catIdx) => (
              <div
                key={cat.category}
                className={`custom-select-group ${catIdx > 0 ? 'has-divider' : ''}`}
              >
                <div className="custom-select-group__title">{cat.category}</div>
                <div className="custom-select-group__options">
                  {cat.options.map((opt) => {
                    const isSelected =
                      opt.value === value || normalizeStr(opt.value) === normVal;
                    return (
                      <div
                        key={opt.value}
                        role="option"
                        aria-selected={isSelected}
                        className={`custom-select-option ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => handleSelect(opt.value)}
                      >
                        <span className="custom-select-option__text">{opt.label}</span>
                        {isSelected && (
                          <svg
                            className="custom-select-check"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default: 'floating' variant for MotionContact
  return (
    <div
      className={`ff ff--custom-select ${isOpen ? 'is-open' : ''}`}
      ref={containerRef}
    >
      <label htmlFor={id} className="ff__custom-label">
        {label}
      </label>
      <button
        id={id}
        type="button"
        className="ff__custom-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="ff__custom-val">{displayLabel}</span>
        <svg
          className={`ff__custom-chevron ${isOpen ? 'is-open' : ''}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <span
        className={`ff__bar ${isOpen ? 'ff__bar--active' : ''}`}
        aria-hidden="true"
        style={isOpen ? { width: '100%' } : undefined}
      ></span>
      <input type="hidden" name={name} value={value} />

      {isOpen && (
        <div className="custom-select-menu custom-select-menu--floating" role="listbox">
          {SERVICE_CATEGORIES.map((cat, catIdx) => (
            <div
              key={cat.category}
              className={`custom-select-group ${catIdx > 0 ? 'has-divider' : ''}`}
            >
              <div className="custom-select-group__title">{cat.category}</div>
              <div className="custom-select-group__options">
                {cat.options.map((opt) => {
                  const isSelected =
                    opt.value === value || normalizeStr(opt.value) === normVal;
                  return (
                    <div
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      className={`custom-select-option ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSelect(opt.value)}
                    >
                      <span className="custom-select-option__text">{opt.label}</span>
                      {isSelected && (
                        <svg
                          className="custom-select-check"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
