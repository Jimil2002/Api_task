import { Box, ListItem, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import './App.css';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import * as moment from 'moment'
import CircularProgress from '@mui/material/CircularProgress';
import InfiniteScroll from "react-infinite-scroll-component";
import TableBody from '@mui/material/TableBody';

function App() {
  const [arr, setArr] = useState([])
  const [spin, setSpin] = useState(true)
  const [num, setNum] = useState(0);




  useEffect(() => {
    // const interval = setInterval(() => {

    //    fetchData() 

    //    console.log(num,"hh");
    // }, 5000);

    // return () => clearInterval(interval); 
    // let a = 1
    // fetchData(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${0}`);
    // const interval = setInterval(()=>{
    //   fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${a}`)
    //   a++
    // },5000)
    // fetchData()
    //     return () => clearInterval(interval); 

    const intervalId = setInterval(() => {
      setArr([])
      fetchData()

    }, 10000);

    return () => clearInterval(intervalId)
  }, [])
    ;

  const refresh = (setArr) => { };

  let i = num;


  const fetchData = async () => {
    if (i < 50) {

      const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${i}`);
      const newData = await response.json();
      setArr([...arr, newData])
      setSpin(false)
      setNum(num + 1)

    }
    i++;

    console.log(i, "i");
    console.log(num, "num");
    console.log(arr, "rr");

  };




  return (
    <Box >
      {spin ?
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box> :
        <InfiniteScroll
          style={{ overflow: 'hidden !important' }}
          dataLength={arr.length} //This is important field to render the next data
          next={() => {
            fetchData();

          }}
          hasMore={true}
          loader={
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '98.9vw', alignItems: 'center' }}>
              <CircularProgress />
            </Box>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={refresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}># 8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}># 8593; Release to refresh</h3>
          }
        >
          <TableContainer >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell >Author</TableCell>
                  <TableCell >Date</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {arr.map((val) => {
                  return (
                    <>
                      {val.hits.map((vl, index) => {
                        let Da = moment(new Date(vl.created_at)).format("DD/MM/YYYY")
                        return (
                          <TableRow

                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >

                            <TableCell >{index}</TableCell>
                            <TableCell >{vl.title}</TableCell>
                            <TableCell >{vl.author}</TableCell>
                            <TableCell>{Da}</TableCell>
                          </TableRow>
                        )
                      })
                      }
                    </>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </InfiniteScroll>
      }
    </Box >
  );
}

export default App;
