import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useQuery } from "@apollo/client";
import { IBusiness } from "@/features/business/model/business";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface MultipleSelectProps {
  query: any;
  label: string;
  value: string[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
}

export default function MultipleSelect({
  query,
  label,
  value,
  handleChange,
}: MultipleSelectProps) {
  const theme = useTheme();
  const { loading, error, data } = useQuery(query);
  const [selectedItem, setSelectedItem] = React.useState<string | string[]>([]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    handleChange(event);
    setSelectedItem(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">
          {Array.isArray(selectedItem) ? selectedItem.join(", ") : label}
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={value}
          onChange={handleSelectChange}
          MenuProps={MenuProps}
          renderValue={(selected) => (
            <div>
              {selected.map((name) => (
                <div key={name} style={getStyles(name, value, theme)}>
                  {name}
                </div>
              ))}
            </div>
          )}
        >
          {data.findUserBusiness.map((item: IBusiness) => (
            <MenuItem
              key={item._id}
              value={item.name}
              style={getStyles(item.name, value, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
