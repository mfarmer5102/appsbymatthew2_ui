import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {useEffect, useState} from "react";
import {getApplications} from "../../services/applications.service";
import {getSkills} from "../../services/skills.service";
import {Box} from "@mui/material";
import {Chip} from "@material-ui/core";
import {getSupportStatuses} from "../../services/supportStatus.service";

const generateMenuProps = () => {
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
    return MenuProps;
}

const MultipleSelectCheckmarks = ({filteredStatuses, setFilteredStatuses}) => {
    const [supportStatusOptions, setSupportStatusOptions] = useState([]);

    useEffect(async() => {
        try {
            const apps = await getSupportStatuses();
            setSupportStatusOptions(apps);
        } catch (e) {
            // AppContext.handleError('Unable to load skills.');
        }
    }, []);

    const handleChange = (event) => {
        const { target: { value }} = event;
        setFilteredStatuses(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

    };

    return (
        <div>
            <FormControl fullWidth={true}>
                <InputLabel id="demo-multiple-checkbox-label">Support Status</InputLabel>
                <Select
                    // labelId="demo-multiple-checkbox-label"
                    // id="demo-multiple-checkbox"
                    // multiple
                    value={filteredStatuses}
                    onChange={handleChange}
                    input={<OutlinedInput label="Support Status" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={generateMenuProps()}
                >
                    {supportStatusOptions?.map((item) => (
                        <MenuItem key={item.label} value={item.code}>
                            <Checkbox checked={filteredStatuses.indexOf(item.code) > -1} />
                            <ListItemText primary={item.label} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default MultipleSelectCheckmarks;