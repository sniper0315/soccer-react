import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import FolderSharedIcon from '@mui/icons-material/FolderSharedOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import EditIcon from '@mui/icons-material/Edit';

import GameService from '../../../services/game.service';

const AcademyControl = ({ representative }) => {
    const [academyList, setAcademyList] = useState([]);
    const [academyName, setAcademyName] = useState('');
    const [academyCountry, setAcademyCountry] = useState('');
    const [addOpen, setAddOpen] = useState(false);
    const [editMode, setEditMode] = useState('Add');
    const [alertOpen, setAlertOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [academies, setAcademies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [refreshDialog, setRefreshDialog] = useState(false);
    const [editAcademyId, setEditAcademyId] = useState(-1);

    const loadAllAcademiesByRepresentative = () => {
        if (representative === null) return;

        setLoading(true);
        GameService.getAcademiesForRepresentative(representative.id).then((res) => {
            setAcademyList(res);
            setLoading(false);
        });
    };

    const handleDeleteAcademyFromRepresentative = (item) => {
        GameService.deleteAcademy(item.id).then((res) => {
            loadAllAcademiesByRepresentative();
        });
    };

    const handleAddNewAcademy = () => {
        if (academyName === '' || academyCountry === '') return;

        if (editMode === 'Add') {
            const filtered = academies.filter((item) => item.name === academyName && item.Country === academyCountry);

            if (filtered.length === 0) {
                GameService.addAcademy(academyName, academyCountry).then((res) => {
                    setAlertOpen(true);
                });
            }
        } else {
            GameService.editAcademy(editAcademyId, academyName, academyCountry).then((res) => {
                setRefreshDialog(!refreshDialog);
                setAddOpen(false);
            });
        }
    };

    const handleAddAcademyToRepresentative = (item) => {
        const filtered = academyList.filter((data) => data.name === item.name && data.Country === item.Country);

        if (filtered.length === 0) {
            GameService.addAcademyToRepresentative(representative.id, item.id).then((res) => {
                loadAllAcademiesByRepresentative();
            });
        }
    };

    const getSearchedList = () => {
        return academies.filter((item) => item.name.includes(searchText) || item.Country.includes(searchText));
    };

    const getBackgroundColor = (index) => {
        return selectedIndex === index ? '#3C3C3C' : 'none';
    };

    const handleDeleteAcademy = (item) => {
        GameService.deleteAcademy(item.id).then((res) => {
            setRefreshDialog(!refreshDialog);
        });
    };

    useEffect(() => {
        GameService.getAllAcademies().then((res) => {
            setAcademies(res);
        });
    }, [refreshDialog]);

    useEffect(() => {
        loadAllAcademiesByRepresentative();
    }, [representative, refreshDialog]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <IconButton onClick={() => setAddOpen(true)}>
                    <AddIcon />
                </IconButton>
                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '1rem', color: 'white' }}>Academy</Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', border: '1px solid #E8E8E8', borderRadius: '8px', width: '320px', height: '75vh', padding: '16px 12px' }}>
                <div style={{ width: '100%', textAlign: 'right' }}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            if (representative) setDialogOpen(true);
                        }}
                    >
                        ADD
                    </Button>
                </div>
                {loading ? (
                    <div style={{ width: '100%', height: '80%', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '55vh', overflowY: 'auto' }}>
                        {academyList.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    border: '1px solid white',
                                    borderRadius: '8px',
                                    padding: '4px 8px',
                                    cursor: 'pointer',
                                    background: getBackgroundColor(index)
                                }}
                                onClick={() => setSelectedIndex(index)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FolderSharedIcon />
                                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.7rem', color: 'white' }}>{item.name}</Typography>
                                </div>
                                {selectedIndex === index && (
                                    <IconButton onClick={() => handleDeleteAcademyFromRepresentative(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <Snackbar open={alertOpen} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={2000} onClose={() => setAlertOpen(false)}>
                    <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
                        Successfully added
                    </Alert>
                </Snackbar>
                <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
                    <DialogTitle style={{ textAlign: 'right' }}>
                        <IconButton onClick={() => setAddOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
                        <TextField
                            value={academyName}
                            label="Academy Name"
                            variant="outlined"
                            autoFocus
                            onChange={(e) => setAcademyName(e.target.value)}
                            sx={{ borderRadius: '10px', height: '48px', width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                        />
                        <TextField
                            value={academyCountry}
                            label="Academy Country"
                            variant="outlined"
                            onChange={(e) => setAcademyCountry(e.target.value)}
                            sx={{ borderRadius: '10px', height: '48px', width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={() => setAddOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={() => handleAddNewAcademy()}>
                            {editMode === 'Add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle style={{ textAlign: 'right' }}>
                    <IconButton onClick={() => setDialogOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers style={{ width: '450px', display: 'flex', flexDirection: 'column', gap: '20px', height: '65vh' }}>
                    <TextField
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search"
                        label=""
                        inputProps={{ 'aria-label': 'Without label' }}
                        variant="outlined"
                        autoFocus
                        sx={{
                            width: '100%',
                            fontSize: '0.8rem',
                            '& legend': { display: 'none' },
                            '& fieldset': { top: 0 },
                            '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                            '& .MuiOutlinedInput-input': { padding: 0, height: '36px' }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        {getSearchedList().map((item, index) => (
                            <div
                                key={index}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', borderBottom: '1px solid #E8E8E8', cursor: 'pointer' }}
                            >
                                <div style={{ flex: 7, display: 'flex', alignItems: 'center' }} onClick={() => handleAddAcademyToRepresentative(item)}>
                                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.7rem', color: 'white', flex: 4 }}>{item.name}</Typography>
                                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.7rem', color: 'white', flex: 3 }}>{item.Country}</Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <IconButton
                                        onClick={() => {
                                            setEditMode('Edit');
                                            setEditAcademyId(item.id);
                                            setAcademyName(item.name);
                                            setAcademyCountry(item.Country);
                                            setAddOpen(true);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteAcademy(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AcademyControl;
