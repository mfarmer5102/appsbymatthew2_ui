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

const MultipleSelectCheckmarks = ({filteredSkills, setFilteredSkills}) => {
    const [associatedSkillsOptions, setAssociatedSkillsOptions] = useState([]);

    useEffect(async() => {
        try {
            const apps = await getSkills();
            setAssociatedSkillsOptions(apps);
        } catch (e) {
            // AppContext.handleError('Unable to load skills.');
        }
    }, []);

    const handleChange = (event) => {
        const { target: { value }} = event;
        setFilteredSkills(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

    };

    return (
        <div>
            <FormControl fullWidth={true}>
                <InputLabel id="demo-multiple-checkbox-label">Associated Skills</InputLabel>
                <Select
                    // labelId="demo-multiple-checkbox-label"
                    // id="demo-multiple-checkbox"
                    multiple
                    value={filteredSkills}
                    onChange={handleChange}
                    input={<OutlinedInput label="Associated Skills" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={generateMenuProps()}
                >
                    {associatedSkillsOptions.map((item) => (
                        <MenuItem key={item.name} value={item.code}>
                            <Checkbox checked={filteredSkills.indexOf(item.code) > -1} />
                            <ListItemText primary={item.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default MultipleSelectCheckmarks;