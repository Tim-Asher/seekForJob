import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Range, getTrackBackground } from "react-range";

const JobFilters = ({
  filters,
  onFilterChange,
  locations,
  experienceLevels,
  jobTypes,
  key,
}) => {
  const [selectedLocations, setSelectedLocations] = useState(filters.locations);
  const [selectedExperiences, setSelectedExperiences] = useState(
    filters.experiences
  );
  const [selectedJobTypes, setSelectedJobTypes] = useState(filters.jobTypes);
  const [salaryRange, setSalaryRange] = useState(filters.salaryRange);

  const handleSliderChange = (values) => {
    setSalaryRange(values);
  };

  const handleMinSalaryChange = (event) => {
    const minSalary = Math.max(0, Number(event.target.value));
    setSalaryRange([minSalary, Math.max(minSalary, salaryRange[1])]);
  };

  const handleMaxSalaryChange = (event) => {
    const maxSalary = Math.max(Number(event.target.value), salaryRange[0]);
    setSalaryRange([salaryRange[0], maxSalary]);
  };

  // Update the selected filters when they change
  useEffect(() => {
    onFilterChange({
      locations: selectedLocations.map((loc) => loc.value),
      experiences: selectedExperiences.map((exp) => exp.value),
      jobTypes: selectedJobTypes.map((type) => type.value),
      salaryRange,
    });
  }, [
    selectedLocations,
    selectedExperiences,
    selectedJobTypes,
    salaryRange,
    onFilterChange,
  ]);

  return (
    <div className="bg-white rounded-3xl p-5 flex flex-col items-center">
      <div className="flex flex-col lg:flex-row lg:justify-between w-full max-w-4xl space-y-4 lg:space-y-0 text-center">
        <div className="flex flex-col lg:mr-4 text-center">
          <span className="text-gray-600 text-sm mb-1">מיקום משרה</span>
          <Select
            options={locations}
            isMulti
            value={selectedLocations}
            onChange={setSelectedLocations}
            placeholder="איפה תרצו לעבוד?"
            className="w-48 text-sm"
            styles={{ container: (base) => ({ ...base, border: "none" }) }}
          />
        </div>
        <div className="flex flex-col lg:mr-4 text-center">
          <span className="text-gray-600 text-sm mb-1">רמת נסיון</span>
          <Select
            options={experienceLevels}
            isMulti
            value={selectedExperiences}
            onChange={setSelectedExperiences}
            placeholder="בחרו רמת ניסיון"
            className="w-48 text-sm"
            styles={{ container: (base) => ({ ...base, border: "none" }) }}
          />
        </div>
        <div className="flex flex-col lg:mr-4 text-center">
          <span className="text-gray-600 text-sm mb-1">סוג משרה</span>
          <Select
            options={jobTypes}
            isMulti
            value={selectedJobTypes}
            onChange={setSelectedJobTypes}
            placeholder="בחרו סוג היקף משרה"
            className="w-48 text-sm"
            styles={{ container: (base) => ({ ...base, border: "none" }) }}
          />
        </div>
        <div className="flex flex-col lg:mr-4 text-center">
          <span className="text-gray-600 text-sm mb-1">טווח שכר</span>
          <Range
            key={key}
            values={salaryRange}
            step={500}
            min={0}
            max={50000}
            onChange={handleSliderChange}
            renderTrack={({ props, children }) => {
              const { key, ...restProps } = props; // Destructure to separate key
              return (
                <div
                  {...restProps} // Spread the remaining props
                  className="w-48 h-2 bg-gray-300 rounded"
                  style={{
                    background: getTrackBackground({
                      values: salaryRange,
                      colors: ["#ccc", "#007bff", "#ccc"],
                      min: 0,
                      max: 50000,
                    }),
                  }}
                >
                  {children}
                </div>
              );
            }}
            renderThumb={({ props }) => {
              const { key, ...restProps } = props; // Destructure to separate key
              return (
                <div
                  {...restProps}
                  className="h-4 w-4 bg-orange-400 rounded-full shadow"
                />
              );
            }}
          />
          <div className="flex justify-between mt-4">
            <input
              type="number"
              value={salaryRange[0]}
              min="0"
              max={salaryRange[1]}
              onChange={handleMinSalaryChange}
              className="w-20 border rounded text-center"
            />
            <input
              type="number"
              value={salaryRange[1]}
              min={salaryRange[0]}
              max="50000"
              onChange={handleMaxSalaryChange}
              className="w-20 border rounded text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
