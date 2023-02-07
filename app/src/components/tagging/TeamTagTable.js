import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import GameService from '../../services/game.service';
import TCellTimeEdit from './TCellTimeEdit';

import CircularProgress from '@mui/material/CircularProgress';
import DeleteConfirmDialog from '../../common/DeleteConfirmDialog';
import TCellSelectEdit from './TCellSelectEdit';

import trashImg from '../../assets/icons/bx-trash.png';
import ReactPaginate from 'react-paginate';

const PERIOD = [
    { id: 1, name: '1st Half' },
    { id: 2, name: '2nd Half' },
    { id: 3, name: 'Overtime' }
];

export default function TeamTagTable({ rows, updateTagList, handleRowClick, selectedId, onPlay, setTeamTagClicked, setTeamTagId, teamTagClicked, setStartTime, ...params }) {
    
    const [loading, setLoading] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const itemsPerPage = 13;
    const [itemOffset, setItemOffset] = React.useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // const currentItems = rows.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(rows.length / itemsPerPage);
    console.log("-----------------------------------------------")
    console.log(rows.length / itemsPerPage)
    console.log(pageCount)

    const handleDeleteClose = (result) => {
        setDeleteOpen(false);
        if (!result) return;
        deleteTag(selectedIndex);
    };

    const deleteTag = (id) => {
        setLoading(true);
        GameService.deleteTeamTag(id)
            .then((res) => {
                updateTagList();
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };


    const update = (v) => {
        setLoading(true);
        GameService.updateTeamTag(v)
            .then((res) => {
                updateTagList();
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    
    React.useEffect(() => {
        if (rows.length <= 0) {
            setTeamTagId(null)
            setTeamTagClicked(false)
        }
    }, [rows])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % rows.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <Box {...params}>
            <DeleteConfirmDialog open={deleteOpen} handleDeleteClose={handleDeleteClose} />
            <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden', p: 0.5 }}>
                <h5 style={{ textAlign: 'center' }} >Team Tag</h5>
                 <div style={{ height: '85%', overflow: 'auto'}}> 
                    <table style={{minWidth:"400px", width:'100%'}}>
                        <thead>
                            <tr style={{backgroundColor:'#121212', height:'30px'}}>
                                <TableCell align="center">Period</TableCell>
                                <TableCell align="center">Offensive Team</TableCell>
                                <TableCell align="center">Defensive Team</TableCell>
                                <TableCell align="center">Start Time</TableCell>
                                <TableCell align="center">End Time</TableCell>
                                <TableCell></TableCell>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    {rows.slice(itemOffset, endOffset).map((row) => {
                                        return (
                                            <tr hover="true" style={{background: row.id === selectedId ? 'rgba(144, 202, 249, 0.16)' :'transparent'}} className="tableline" role="checkbox" tabIndex={-1} key={row.id} selected={row.id === selectedId} onClick={() => {
                                                setTeamTagId(row.id)
                                                setStartTime(row.start_time)
                                                setTeamTagClicked(!teamTagClicked)
                                            }} >
                                                <TCellSelectEdit
                                                    rows={PERIOD}
                                                    value={PERIOD.find((p) => p.id === row.period)}
                                                    update={(v) => {
                                                        update({ ...row, period: v });
                                                    }}
                                                />
                                                <td align="center" onClick={() => handleRowClick(row)}>
                                                    {row.offensive_team_name}
                                                </td>
                                                <td align="center" onClick={() => handleRowClick(row)}>
                                                    {row.defensive_team_name}
                                                </td>                                                
                                                <TCellTimeEdit value={row.start_time} update={(v) => update({ ...row, start_time: v })} end={row.end_time} />
                                                <TCellTimeEdit value={row.end_time} update={(v) => update({ ...row, end_time: v })} start={row.start_time} />
                                                <td style={{width:'50px'}} className="trashcell">
                                                         <img src={trashImg} style={{ filter: 'invert(1)', display:'block'}} width="90%" onClick={() => {
                                                            setSelectedIndex(row.id);
                                                            setDeleteOpen(true);
                                                        }} />
                                                 </td>
                                            </tr>

                                        );
                                    })}                                    
                                </>
                            )}
                        </tbody>
                    </table>
                    <div className='parent-container'>
                        
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"                                        
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"                                       
                            renderOnZeroPageCount={null}
                        />
                    </div>
                 </div> 
            </Paper>
        </Box>
    );
}
