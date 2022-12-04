import { Button, IconButton, Typography } from '@mui/material';
import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import FolderSharedIcon from '@mui/icons-material/FolderSharedOutlined';

const AcademyControl = ({ list }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', border: '1px solid #E8E8E8', borderRadius: '8px', width: '400px', height: '60vh', padding: '16px 12px' }}>
            <div style={{ width: '100%', textAlign: 'right' }}>
                <Button variant="outlined">ADD</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '55vh', overflowY: 'auto' }}>
                {list.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid white', borderRadius: '8px', padding: '4px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FolderSharedIcon />
                            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.7rem', color: 'white' }}>{item.first_name}</Typography>
                        </div>
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AcademyControl;
