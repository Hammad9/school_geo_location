import React, { useState, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  Amenities,
  AmenitiesDescription,
  AmenitiesWrapper,
  CleanAll,
  FilterCardWrapper,
} from "./location.styled";

const FilterCard = ({
  schoolData,
  finalFilterData,
  handleFormSubmit,
  setFinalFilterData,
}: {
  setFinalFilterData: any;
  schoolData: any;
  finalFilterData: {
    length: number;
  };
  handleFormSubmit: any;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const divisionsDataFilter = schoolData?.filter(
    (object: any, index: number, self: any) =>
      index === self.findIndex((t: any) => t.division === object.division)
  );
  const divisionsData = divisionsDataFilter
    .map((data: any) => data?.division)
    .sort();

  const stateDataFilter = schoolData?.filter(
    (object: any, index: number, self: any) =>
      index === self.findIndex((t: any) => t.state === object.state)
  );
  const stateData = stateDataFilter?.map((data: any) => data?.state).sort();

  useEffect(() => {
    const filterData = () => {
      let filteredData = schoolData;
      if (stateFilter) {
        filteredData = filteredData.filter(
          (schoolsData: any) => schoolsData?.state === stateFilter
        );
      }
      if (divisionFilter) {
        filteredData = filteredData.filter(
          (schoolsData: any) => schoolsData?.division === divisionFilter
        );
      }
      if (searchTriggered && searchTerm) {
        filteredData = filteredData.filter((schoolsData: any) =>
          schoolsData?.nameOfCollege
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }
      setFinalFilterData(filteredData);
    };

    filterData();
  }, [
    searchTerm,
    stateFilter,
    divisionFilter,
    schoolData,
    searchTriggered,
    setFinalFilterData,
  ]);
  const handleSearchIconClick = () => {
    setSearchTriggered(true);
    handleFormSubmit();
  };
  const handleClearFilters = () => {
    setSearchTerm("");
    setStateFilter("");
    setDivisionFilter("");
    setSearchTriggered(false);
    handleFormSubmit();
  };
  return (
    <FilterCardWrapper>
      <Amenities>Schools</Amenities>
      <AmenitiesDescription>
        Number of Schools {finalFilterData?.length}
      </AmenitiesDescription>

      <form onSubmit={(e) => e.preventDefault()}>
        <AmenitiesWrapper>
          {/* State */}
          <div style={{ marginBottom: "20px" }}>
            <Autocomplete
              value={stateFilter}
              onChange={(event, newValue) => {
                setStateFilter(newValue || "");
                setDivisionFilter("");
              }}
              options={stateData || []}
              getOptionLabel={(option) => option || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#1B1B1B",
                    color: "#b0b0b0",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#3d3d3d",
                      },
                      "&:hover fieldset": {
                        borderColor: "#737373",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#737373",
                      },
                      "& input": {
                        color: "#b0b0b0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#b0b0b0",
                    },
                  }}
                />
              )}
              sx={{
                width: "100%",
                "& .MuiAutocomplete-popupIndicator": {
                  color: "#b0b0b0",
                },
                "& .MuiAutocomplete-clearIndicator": {
                  color: "#b0b0b0",
                },
                "& .MuiAutocomplete-listbox": {
                  backgroundColor: "#1B1B1B",
                  color: "#b0b0b0",
                },
              }}
            />
          </div>

          {/* Division */}
          <div style={{ marginBottom: "20px" }}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <InputLabel
                sx={{
                  color: "#b0b0b0",
                  "&.Mui-focused": {
                    color: "#b0b0b0",
                  },
                }}
              >
                Division
              </InputLabel>
              <Select
                value={divisionFilter}
                onChange={(e) => setDivisionFilter(String(e.target.value))}
                label="Division"
                sx={{
                  backgroundColor: "#1B1B1B",
                  color: "#b0b0b0",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#3d3d3d",
                    },
                    "&:hover fieldset": {
                      borderColor: "#737373",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#737373",
                    },
                  },
                  "& .MuiSelect-icon": {
                    color: "#b0b0b0",
                  },
                  "& .MuiMenuItem-root": {
                    backgroundColor: "#1B1B1B",
                    color: "#b0b0b0",
                    "&:hover": {
                      backgroundColor: "#737373",
                    },
                  },
                }}
              >
                {divisionsData.map((option:any) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Search */}
          <TextField
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    sx={{
                      color: "#737373 !important",
                      cursor: "pointer",
                    }}
                    onClick={handleSearchIconClick}
                  />
                </InputAdornment>
              ),
              style: {
                color: "#b0b0b0",
                backgroundColor: "#1B1B1B",
              },
            }}
            sx={{
              backgroundColor: "#1B1B1B",
              color: "#b0b0b0",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#3d3d3d",
                },
                "&:hover fieldset": {
                  borderColor: "#737373",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#737373",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#b0b0b0",
              },
            }}
          />
        </AmenitiesWrapper>

        <CleanAll onClick={handleClearFilters}>Clear Filter</CleanAll>
      </form>
    </FilterCardWrapper>
  );
};
export default FilterCard;
